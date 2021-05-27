// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

import "./interfaces/IPancakeswapFarm.sol";
import "./interfaces/ILockedBdex.sol";
import "./interfaces/IValueLiquidFormula.sol";
import "./interfaces/IValueLiquidRouter.sol";
import "./interfaces/ITreasury.sol";
import "./interfaces/IStrategy.sol";

contract BvaultsStrategyMigratable is Ownable, ReentrancyGuard, Pausable {
    // Maximises yields in pancakeswap

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    bool public isAutoComp; // this vault is purely for staking. eg. WBNB-BDO staking vault.

    address public farmContractAddress; // address of farm, eg, PCS, Thugs etc.
    uint256 public pid; // pid of pool in farmContractAddress
    address public bdex = address(0x7E0F01918D92b2750bbb18fcebeEDD5B94ebB867);
    address public xbdex = address(0x4CF73a6F72B8093b96264a794064372edb15508e);
    uint256 public startReleaseBlock = 9864000;
    bool public checkForUnlockReward = true;
    address public wantAddress;
    address public token0Address;
    address public token1Address;
    address public earnedAddress;
    uint256 public ratio0 = 5000; // 50%
    uint256 public ratio1 = 5000; // 50%

    address public vswapRouterAddress = address(0xC6747954a9B3A074d8E4168B444d7F397FeE76AA); // vSwap Router
    address public vswapFormula = address(0xCB9f345c32e2216e5F13E1A816059C6435C92038); // vSwap Formula
    mapping(address => mapping(address => address[])) public vswapPaths;

    address public constant wbnbAddress = address(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c);
    address public constant busdAddress = address(0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56);

    address public operator;
    address public strategist;
    address public timelock = address(0x2ad335E18C97d18561dd1a0C1447b1018b81f213); // 6h timelock
    bool public notPublic = false; // allow public to call earn() function

    uint256 public lastEarnBlock = 0;
    uint256 public wantLockedTotal = 0;
    uint256 public sharesTotal = 0;

    uint256 public controllerFee = 0;
    uint256 public constant controllerFeeMax = 10000; // 100 = 1%
    uint256 public constant controllerFeeUL = 300;

    uint256 public constant buyBackRateMax = 10000; // 100 = 1%
    uint256 public constant buyBackRateUL = 800; // 8%

    uint256 public buyBackRate1 = 300; // 3%
    address public buyBackToken1 = address(0x81859801b01764D4f0Fa5E64729f5a6C3b91435b); // BFI
    address public buyBackAddress1 = address(0xaaaf5d9923Be358Ea0b6205Ef2A3B929D460Ac7A); // to BFI Staking Pool

    uint256 public buyBackRate2 = 300; // 2%
    address public buyBackToken2 = address(0xc1dB7603827Cb1a99c50EC1fFf48113259fc6A12); // BDO
    address public buyBackAddress2 = address(0x5D42dc503763dD1e7A1B510b055150Cc5754656B); // to TreasuryProxy (to split the profit)

    uint256 public entranceFeeFactor = 10000; // 0% entrance fee (goes to pool + prevents front-running)
    uint256 public constant entranceFeeFactorMax = 10000; // 100 = 1%
    uint256 public constant entranceFeeFactorLL = 9950; // 0.5% is the max entrance fee settable. LL = lowerlimit

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Farm(uint256 amount);
    event Compound(address token0Address, uint256 token0Amt, address token1Address, uint256 token1Amt);
    event Earned(address earnedAddress, uint256 earnedAmt);
    event BuyBack(address earnedAddress, address buyBackToken, uint256 earnedAmt, uint256 buyBackAmt, address receiver);
    event DistributeFee(address earnedAddress, uint256 fee, address receiver);
    event ConvertDustToEarned(address tokenAddress, address earnedAddress, uint256 tokenAmt);
    event InCaseTokensGetStuck(address tokenAddress, uint256 tokenAmt, address receiver);
    event ExecuteTransaction(address indexed target, uint256 value, string signature, bytes data);

    // _controller:  BvaultsBank
    // _buyBackToken1Info[]: buyBackToken1, buyBackAddress1
    // _buyBackToken2Info[]: buyBackToken2, buyBackAddress2
    constructor(
        address _controller,
        bool _isAutoComp,
        address _farmContractAddress,
        uint256 _pid,
        address _wantAddress,
        address _earnedAddress,
        address _vswapRouterAddress,
        address _vswapFormula,
        address[] memory _buyBackToken1Info,
        address[] memory _buyBackToken2Info,
        address _token0,
        address _token1,
        uint256 _ratio0
    ) public {
        operator = msg.sender;
        strategist = msg.sender;
        // to call earn if public not allowed

        isAutoComp = _isAutoComp;
        wantAddress = _wantAddress;

        if (_vswapRouterAddress != address(0)) vswapRouterAddress = _vswapRouterAddress;
        if (_vswapFormula != address(0)) vswapFormula = _vswapFormula;

        buyBackToken1 = _buyBackToken1Info[0];
        buyBackAddress1 = _buyBackToken1Info[1];
        buyBackToken2 = _buyBackToken2Info[0];
        buyBackAddress2 = _buyBackToken2Info[1];

        if (isAutoComp) {
            token0Address = _token0;
            token1Address = _token1;
            if (_ratio0 != 0) {
                ratio0 = _ratio0;
                ratio1 = uint256(10000).sub(ratio0);
            }

            farmContractAddress = _farmContractAddress;
            pid = _pid;
            earnedAddress = _earnedAddress;
        }

        transferOwnership(_controller);
    }

    modifier onlyOperator() {
        require(operator == msg.sender, "BvaultsStrategy: caller is not the operator");
        _;
    }

    modifier onlyStrategist() {
        require(strategist == msg.sender || operator == msg.sender, "BvaultsStrategy: caller is not the strategist");
        _;
    }

    modifier onlyTimelock() {
        require(timelock == msg.sender, "BvaultsStrategy: caller is not timelock");
        _;
    }

    function isAuthorised(address _account) public view returns (bool) {
        return (_account == operator) || (msg.sender == strategist) || (msg.sender == timelock);
    }

    function getPricePerFullShare() external view returns (uint256) {
        return (sharesTotal == 0) ? 1e18 : wantLockedTotal.mul(1e18).div(sharesTotal);
    }

    // Receives new deposits from user
    function deposit(address, uint256 _wantAmt) public onlyOwner whenNotPaused returns (uint256) {
        IERC20(wantAddress).safeTransferFrom(address(msg.sender), address(this), _wantAmt);

        uint256 sharesAdded = _wantAmt;
        if (wantLockedTotal > 0 && sharesTotal > 0) {
            sharesAdded = _wantAmt.mul(sharesTotal).mul(entranceFeeFactor).div(wantLockedTotal).div(entranceFeeFactorMax);
        }
        sharesTotal = sharesTotal.add(sharesAdded);

        if (isAutoComp) {
            _farm();
        } else {
            wantLockedTotal = wantLockedTotal.add(_wantAmt);
        }

        emit Deposit(_wantAmt);

        return sharesAdded;
    }

    function farm() public nonReentrant {
        _farm();
    }

    function _farm() internal {
        uint256 wantAmt = IERC20(wantAddress).balanceOf(address(this));
        wantLockedTotal = wantLockedTotal.add(wantAmt);
        IERC20(wantAddress).safeIncreaseAllowance(farmContractAddress, wantAmt);

        IPancakeswapFarm(farmContractAddress).deposit(pid, wantAmt);

        emit Farm(wantAmt);
    }

    function withdraw(address, uint256 _wantAmt) public onlyOwner nonReentrant returns (uint256) {
        require(_wantAmt > 0, "BvaultsStrategy: !_wantAmt");

        if (isAutoComp) {
            IPancakeswapFarm(farmContractAddress).withdraw(pid, _wantAmt);
        }

        uint256 wantAmt = IERC20(wantAddress).balanceOf(address(this));
        if (_wantAmt > wantAmt) {
            _wantAmt = wantAmt;
        }

        if (wantLockedTotal < _wantAmt) {
            _wantAmt = wantLockedTotal;
        }

        uint256 sharesRemoved = _wantAmt.mul(sharesTotal).div(wantLockedTotal);
        if (sharesRemoved > sharesTotal) {
            sharesRemoved = sharesTotal;
        }
        sharesTotal = sharesTotal.sub(sharesRemoved);
        wantLockedTotal = wantLockedTotal.sub(_wantAmt);

        IERC20(wantAddress).safeTransfer(address(msg.sender), _wantAmt);

        emit Withdraw(_wantAmt);

        return sharesRemoved;
    }

    // 1. Harvest farm tokens
    // 2. Converts farm tokens into want tokens
    // 3. Deposits want tokens

    function earn() public whenNotPaused {
        require(isAutoComp, "BvaultsStrategy: !isAutoComp");
        require(!notPublic || isAuthorised(msg.sender), "BvaultsStrategy: !authorised");

        // Harvest farm tokens
        IPancakeswapFarm(farmContractAddress).deposit(pid, 0);

        // Check if there is any unlocked amount
        if (checkForUnlockReward) {
            if (block.number > startReleaseBlock) {
                if (IERC20(xbdex).balanceOf(address(this)) > 0) {
                    ILockedBdex(xbdex).unlockAll();
                }
                if (ILockedBdex(xbdex).canUnlockAmount(address(this)) > 0) {
                    ILockedBdex(xbdex).claimUnlocked();
                }
            }
        }

        // Converts farm tokens into want tokens
        uint256 earnedAmt = IERC20(earnedAddress).balanceOf(address(this));

        emit Earned(earnedAddress, earnedAmt);

        uint256 _distributeFee = distributeFees(earnedAmt);
        uint256 _buyBackAmt1 = buyBack1(earnedAmt);
        uint256 _buyBackAmt2 = buyBack2(earnedAmt);

        earnedAmt = earnedAmt.sub(_distributeFee).sub(_buyBackAmt1).sub(_buyBackAmt2);

        IERC20(earnedAddress).safeIncreaseAllowance(vswapRouterAddress, earnedAmt);

        if (earnedAddress != token0Address) {
            // Swap earned to token0 by ratio0
            _vswapSwapToken(earnedAddress, token0Address, earnedAmt.mul(ratio0).div(10000), address(this));
        }

        if (earnedAddress != token1Address) {
            // Swap earned to token1 by ratio1
            _vswapSwapToken(earnedAddress, token1Address, earnedAmt.mul(ratio1).div(10000), address(this));
        }

        // Get want tokens, ie. add liquidity
        uint256 token0Amt = IERC20(token0Address).balanceOf(address(this));
        uint256 token1Amt = IERC20(token1Address).balanceOf(address(this));
        if (token0Amt > 0 && token1Amt > 0) {
            _vswapAddLiquidity(token0Address, token1Address, token0Amt, token1Amt);
            emit Compound(token0Address, token0Amt, token1Address, token1Amt);
        }

        lastEarnBlock = block.number;

        _farm();
    }

    function buyBack1(uint256 _earnedAmt) internal returns (uint256) {
        if (buyBackRate1 <= 0 || buyBackAddress1 == address(0)) {
            return 0;
        }

        uint256 _buyBackAmt = _earnedAmt.mul(buyBackRate1).div(buyBackRateMax);

        uint256 _pathLength = vswapPaths[earnedAddress][buyBackToken1].length;
        uint256 _before = IERC20(buyBackToken1).balanceOf(buyBackAddress1);
        if (_pathLength > 0 && earnedAddress != buyBackToken1) {
            _vswapSwapToken(earnedAddress, buyBackToken1, _buyBackAmt, buyBackAddress1);
        } else {
            IERC20(earnedAddress).safeTransfer(buyBackAddress1, _buyBackAmt);
        }
        uint256 _after = IERC20(buyBackToken1).balanceOf(buyBackAddress1);
        uint256 _newReward = _after.sub(_before);

        emit BuyBack(earnedAddress, buyBackToken1, _buyBackAmt, _newReward, buyBackAddress1);
        return _buyBackAmt;
    }

    function buyBack2(uint256 _earnedAmt) internal returns (uint256) {
        if (buyBackRate2 <= 0 || buyBackAddress2 == address(0)) {
            return 0;
        }

        uint256 _buyBackAmt = _earnedAmt.mul(buyBackRate2).div(buyBackRateMax);

        uint256 _pathLength = vswapPaths[earnedAddress][buyBackToken2].length;
        uint256 _before = IERC20(buyBackToken2).balanceOf(buyBackAddress2);
        if (_pathLength > 0 && earnedAddress != buyBackToken2) {
            _vswapSwapToken(earnedAddress, buyBackToken2, _buyBackAmt, buyBackAddress2);
        } else {
            IERC20(earnedAddress).safeTransfer(buyBackAddress2, _buyBackAmt);
        }
        uint256 _after = IERC20(buyBackToken2).balanceOf(buyBackAddress2);
        uint256 _newReward = _after.sub(_before);
        if (_newReward > 0) {
            ITreasury(buyBackAddress2).notifyExternalReward(_newReward);
            emit BuyBack(earnedAddress, buyBackToken2, _buyBackAmt, _newReward, buyBackAddress2);
        }

        return _buyBackAmt;
    }

    function distributeFees(uint256 _earnedAmt) internal returns (uint256 _fee) {
        if (_earnedAmt > 0) {
            // Performance fee
            if (controllerFee > 0) {
                _fee = _earnedAmt.mul(controllerFee).div(controllerFeeMax);
                IERC20(earnedAddress).safeTransfer(operator, _fee);
                emit DistributeFee(earnedAddress, _fee, operator);
            }
        }
    }

    function convertDustToEarned() public whenNotPaused {
        require(isAutoComp, "!isAutoComp");

        // Converts dust tokens into earned tokens, which will be reinvested on the next earn().

        // Converts token0 dust (if any) to earned tokens
        uint256 _token0Amt = IERC20(token0Address).balanceOf(address(this));
        if (token0Address != earnedAddress && _token0Amt > 0) {
            _vswapSwapToken(token0Address, earnedAddress, _token0Amt, address(this));
        }

        // Converts token1 dust (if any) to earned tokens
        uint256 _token1Amt = IERC20(token1Address).balanceOf(address(this));
        if (token1Address != earnedAddress && _token1Amt > 0) {
            _vswapSwapToken(token1Address, earnedAddress, _token1Amt, address(this));
        }
    }

    function exchangeRate(address _inputToken, address _outputToken, uint256 _tokenAmount) public view returns (uint256) {
        uint256[] memory amounts = IValueLiquidFormula(vswapFormula).getAmountsOut(_inputToken, _outputToken, _tokenAmount, vswapPaths[_inputToken][_outputToken]);
        return amounts[amounts.length - 1];
    }

    function pendingHarvest() public view returns (uint256) {
        uint256 _earnedBal = IERC20(earnedAddress).balanceOf(address(this));
        return IPancakeswapFarm(farmContractAddress).pendingShare(pid, address(this)).add(_earnedBal);
    }

    function pendingHarvestDollarValue() public view returns (uint256) {
        uint256 _pending = pendingHarvest();
        return (_pending == 0) ? 0 : exchangeRate(earnedAddress, busdAddress, _pending);
    }

    function pause() external onlyOperator {
        _pause();
    }

    function unpause() external onlyOperator {
        _unpause();
    }

    function setOperator(address _operator) external onlyOperator {
        operator = _operator;
    }

    function setStrategist(address _strategist) external onlyOperator {
        strategist = _strategist;
    }

    function setEntranceFeeFactor(uint256 _entranceFeeFactor) external onlyOperator {
        require(_entranceFeeFactor > entranceFeeFactorLL, "BvaultsStrategy: !safe - too low");
        require(_entranceFeeFactor <= entranceFeeFactorMax, "BvaultsStrategy: !safe - too high");
        entranceFeeFactor = _entranceFeeFactor;
    }

    function setControllerFee(uint256 _controllerFee) external onlyOperator {
        require(_controllerFee <= controllerFeeUL, "BvaultsStrategy: too high");
        controllerFee = _controllerFee;
    }

    function setBuyBackRate1(uint256 _buyBackRate1) external onlyOperator {
        require(buyBackRate1 <= buyBackRateUL, "BvaultsStrategy: too high");
        buyBackRate1 = _buyBackRate1;
    }

    function setBuyBackRate2(uint256 _buyBackRate2) external onlyOperator {
        require(buyBackRate2 <= buyBackRateUL, "BvaultsStrategy: too high");
        buyBackRate2 = _buyBackRate2;
    }

    function setBuyBackAddress1(address _buyBackAddress1) external onlyOperator {
        require(buyBackAddress1 != address(0), "zero");
        buyBackAddress1 = _buyBackAddress1;
    }

    function setBuyBackAddress2(address _buyBackAddress2) external onlyOperator {
        require(_buyBackAddress2 != address(0), "zero");
        buyBackAddress2 = _buyBackAddress2;
    }

    function setNotPublic(bool _notPublic) external onlyOperator {
        notPublic = _notPublic;
    }

    /* ========== Pancakeswap & ValueLiquidRouter ========== */

    function setMainPaths(
        address[] memory _earnedToBuyBackToken1Path,
        address[] memory _earnedToBuyBackToken2Path,
        address[] memory _earnedToToken0Path,
        address[] memory _earnedToToken1Path,
        address[] memory _earnedToBusdPath,
        address[] memory _token0ToEarnedPath,
        address[] memory _token1ToEarnedPath
    ) external onlyOperator {
        vswapPaths[earnedAddress][buyBackToken1] = _earnedToBuyBackToken1Path;
        vswapPaths[earnedAddress][buyBackToken2] = _earnedToBuyBackToken2Path;
        vswapPaths[earnedAddress][token0Address] = _earnedToToken0Path;
        vswapPaths[earnedAddress][token1Address] = _earnedToToken1Path;
        vswapPaths[earnedAddress][busdAddress] = _earnedToBusdPath;
        vswapPaths[token0Address][earnedAddress] = _token0ToEarnedPath;
        vswapPaths[token1Address][earnedAddress] = _token1ToEarnedPath;
    }

    function setVswapPaths(address _inputToken, address _outputToken, address[] memory _path) external onlyOperator {
        vswapPaths[_inputToken][_outputToken] = _path;
    }

    function _vswapSwapToken(address _inputToken, address _outputToken, uint256 _amount, address to) internal {
        IERC20(_inputToken).safeIncreaseAllowance(vswapRouterAddress, _amount);
        IValueLiquidRouter(vswapRouterAddress).swapExactTokensForTokens(_inputToken, _outputToken, _amount, 1, vswapPaths[_inputToken][_outputToken], to, now.add(1800));
    }

    function _vswapAddLiquidity(address _tokenA, address _tokenB, uint256 _amountADesired, uint256 _amountBDesired) internal {
        IERC20(_tokenA).safeIncreaseAllowance(vswapRouterAddress, _amountADesired);
        IERC20(_tokenB).safeIncreaseAllowance(vswapRouterAddress, _amountBDesired);
        IValueLiquidRouter(vswapRouterAddress).addLiquidity(wantAddress, _tokenA, _tokenB, _amountADesired, _amountBDesired, 0, 0, address(this), now.add(1800));
    }

    function setCheckForUnlockReward(bool _checkForUnlockReward) external onlyOperator {
        checkForUnlockReward = _checkForUnlockReward;
    }

    function setStartReleaseBlock(uint256 _startReleaseBlock) external onlyOperator {
        startReleaseBlock = _startReleaseBlock;
    }

    /* ========== EMERGENCY ========== */

    function migrateFrom(address _oldStrategy, uint256 _oldWantLockedTotal, uint256 _oldSharesTotal) external onlyOwner {
        require(wantLockedTotal == 0 && sharesTotal == 0 && _oldSharesTotal > 0, "strategy is not empty");
        require(wantAddress == IStrategy(_oldStrategy).wantAddress(), "!wantAddress");
        require(token0Address == IStrategy(_oldStrategy).token0Address(), "!token0Address");
        require(token1Address == IStrategy(_oldStrategy).token1Address(), "!token1Address");
        require(IERC20(wantAddress).balanceOf(address(this)) == _oldWantLockedTotal, "short of wantLockedTotal");

        sharesTotal = _oldSharesTotal;
        _farm();
    }

    function inCaseTokensGetStuck(address _token, uint256 _amount, address _to) external onlyOperator {
        require(_token != earnedAddress, "earned");
        require(_token != wantAddress, "want");
        IERC20(_token).safeTransfer(_to, _amount);
        emit InCaseTokensGetStuck(_token, _amount, _to);
    }

    function setTimelock(address _timelock) external onlyTimelock {
        timelock = _timelock;
    }

    /**
     * @dev This is from Timelock contract.
     */
    function executeTransaction(
        address target,
        uint256 value,
        string memory signature,
        bytes memory data
    ) external onlyTimelock returns (bytes memory) {
        bytes memory callData;

        if (bytes(signature).length == 0) {
            callData = data;
        } else {
            callData = abi.encodePacked(bytes4(keccak256(bytes(signature))), data);
        }

        // solium-disable-next-line security/no-call-value
        (bool success, bytes memory returnData) = target.call{value : value}(callData);
        require(success, "BvaultsStrategy::executeTransaction: Transaction execution reverted.");

        emit ExecuteTransaction(target, value, signature, data);

        return returnData;
    }
}
