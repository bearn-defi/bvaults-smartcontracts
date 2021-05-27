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
import "./interfaces/IPancakeRouter02.sol";
import "./interfaces/ITreasury.sol";

contract BvaultsStrategy is Ownable, ReentrancyGuard, Pausable {
    // Maximises yields in pancakeswap

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    bool public isCAKEStaking; // only for staking CAKE using pancakeswap's native CAKE staking contract.
    bool public isAutoComp; // this vault is purely for staking. eg. WBNB-BDO staking vault.

    address public farmContractAddress; // address of farm, eg, PCS, Thugs etc.
    uint256 public pid; // pid of pool in farmContractAddress
    address public wantAddress;
    address public token0Address;
    address public token1Address;
    address public earnedAddress;
    address public uniRouterAddress = address(0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F); // PancakeSwap: Router

    address public constant wbnbAddress = address(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c);
    address public constant busdAddress = address(0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56);

    address public operator;
    address public strategist;
    address public timelock = address(0x92a082Ad5A942140bCC791081F775900d0A514D9); // 24h timelock
    bool public notPublic = false; // allow public to call earn() function

    uint256 public lastEarnBlock = 0;
    uint256 public wantLockedTotal = 0;
    uint256 public sharesTotal = 0;

    uint256 public controllerFee = 0;
    uint256 public constant controllerFeeMax = 10000; // 100 = 1%
    uint256 public constant controllerFeeUL = 300;

    uint256 public constant buyBackRateMax = 10000; // 100 = 1%
    uint256 public constant buyBackRateUL = 800; // 8%

    uint256 public buyBackRate1 = 590; // 5.9%
    address public buyBackToken1 = address(0x81859801b01764D4f0Fa5E64729f5a6C3b91435b); // BFI
    address public buyBackAddress1 = address(0x000000000000000000000000000000000000dEaD); // to burn

    uint256 public buyBackRate2 = 100; // 1%
    address public buyBackToken2 = address(0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454); // BDO
    address public buyBackAddress2 = address(0x000000000000000000000000000000000000dEaD); // to burn

    uint256 public entranceFeeFactor = 10000; // 0% entrance fee (goes to pool + prevents front-running)
    uint256 public constant entranceFeeFactorMax = 10000; // 100 = 1%
    uint256 public constant entranceFeeFactorLL = 9950; // 0.5% is the max entrance fee settable. LL = lowerlimit

    address[] public earnedToBuyBackToken1Path;
    address[] public earnedToBuyBackToken2Path;
    address[] public earnedToBusdPath;

    address[] public earnedToToken0Path;
    address[] public earnedToToken1Path;
    address[] public token0ToEarnedPath;
    address[] public token1ToEarnedPath;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Farm(uint256 amount);
    event Compound(address token0Address, uint256 token0Amt, address token1Address, uint256 token1Amt);
    event Earned(address earnedAddress, uint256 earnedAmt);
    event BuyBack(address earnedAddress, address buyBackToken, uint earnedAmt, uint256 buyBackAmt, address receiver);
    event DistributeFee(address earnedAddress, uint256 fee, address receiver);
    event ConvertDustToEarned(address tokenAddress, address earnedAddress, uint256 tokenAmt);
    event InCaseTokensGetStuck(address tokenAddress, uint256 tokenAmt, address receiver);
    event ExecuteTransaction(address indexed target, uint256 value, string signature, bytes data);

    // _controller:  BvaultsBank
    // _buyBackToken1Info[]: buyBackToken1, buyBackAddress1, buyBackToken1MidRouteAddress
    // _buyBackToken2Info[]: buyBackToken2, buyBackAddress2, buyBackToken2MidRouteAddress
    // _token0Info[]: token0Address, token0MidRouteAddress
    // _token1Info[]: token1Address, token1MidRouteAddress
    constructor(
        address _controller,
        bool _isCAKEStaking,
        bool _isAutoComp,
        address _farmContractAddress,
        uint256 _pid,
        address _wantAddress,
        address _earnedAddress,
        address _uniRouterAddress,
        address[] memory _buyBackToken1Info,
        address[] memory _buyBackToken2Info,
        address[] memory _token0Info,
        address[] memory _token1Info
    ) public {
        operator = msg.sender;
        strategist = msg.sender; // to call earn if public not allowed

        isCAKEStaking = _isCAKEStaking;
        isAutoComp = _isAutoComp;
        wantAddress = _wantAddress;

        if (_uniRouterAddress != address(0)) uniRouterAddress = _uniRouterAddress;
        buyBackToken1 = _buyBackToken1Info[0];
        buyBackAddress1 = _buyBackToken1Info[1];
        buyBackToken2 = _buyBackToken2Info[0];
        buyBackAddress2 = _buyBackToken2Info[1];

        if (isAutoComp) {
            if (!isCAKEStaking) {
                token0Address = _token0Info[0];
                token1Address = _token1Info[0];
            }

            farmContractAddress = _farmContractAddress;
            pid = _pid;
            earnedAddress = _earnedAddress;

            uniRouterAddress = _uniRouterAddress;

            if (_buyBackToken1Info[2] == address(0)) _buyBackToken1Info[2] = wbnbAddress;
            earnedToBuyBackToken1Path = [earnedAddress, _buyBackToken1Info[2], buyBackToken1];
            if (_buyBackToken1Info[2] == earnedAddress) {
                earnedToBuyBackToken1Path = [_buyBackToken1Info[2], buyBackToken1];
            }

            if (_buyBackToken2Info[2] == address(0)) _buyBackToken2Info[2] = wbnbAddress;
            earnedToBuyBackToken2Path = [earnedAddress, _buyBackToken2Info[2], buyBackToken2];
            if (_buyBackToken2Info[2] == earnedAddress) {
                earnedToBuyBackToken2Path = [_buyBackToken2Info[2], buyBackToken2];
            }

            earnedToBusdPath = [earnedAddress, busdAddress];

            if (_token0Info[1] == address(0)) _token0Info[1] = wbnbAddress;
            earnedToToken0Path = [earnedAddress, _token0Info[1], token0Address];
            if (_token0Info[1] == token0Address) {
                earnedToToken0Path = [earnedAddress, _token0Info[1]];
            }

            if (_token1Info[1] == address(0)) _token1Info[1] = wbnbAddress;
            earnedToToken1Path = [earnedAddress, _token1Info[1], token1Address];
            if (_token1Info[1] == token1Address) {
                earnedToToken1Path = [earnedAddress, _token1Info[1]];
            }

            token0ToEarnedPath = [token0Address, _token0Info[1], earnedAddress];
            if (_token0Info[1] == token0Address) {
                token0ToEarnedPath = [_token0Info[1], earnedAddress];
            }

            token1ToEarnedPath = [token1Address, _token1Info[1], earnedAddress];
            if (_token1Info[1] == token1Address) {
                token1ToEarnedPath = [_token1Info[1], earnedAddress];
            }
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

    // Receives new deposits from user
    function deposit(address, uint256 _wantAmt) public onlyOwner whenNotPaused returns (uint256) {
        IERC20(wantAddress).safeTransferFrom(address(msg.sender), address(this), _wantAmt);

        uint256 sharesAdded = _wantAmt;
        if (wantLockedTotal > 0) {
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

        if (isCAKEStaking) {
            IPancakeswapFarm(farmContractAddress).enterStaking(wantAmt); // Just for CAKE staking, we dont use deposit()
            lastEarnBlock = block.number;
        } else {
            IPancakeswapFarm(farmContractAddress).deposit(pid, wantAmt);
        }

        emit Farm(wantAmt);
    }

    function withdraw(address, uint256 _wantAmt) public onlyOwner nonReentrant returns (uint256) {
        require(_wantAmt > 0, "BvaultsStrategy: !_wantAmt");

        if (isAutoComp) {
            if (isCAKEStaking) {
                IPancakeswapFarm(farmContractAddress).leaveStaking(_wantAmt); // Just for CAKE staking, we dont use withdraw()
            } else {
                IPancakeswapFarm(farmContractAddress).withdraw(pid, _wantAmt);
            }
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
        if (isCAKEStaking) {
            IPancakeswapFarm(farmContractAddress).leaveStaking(0); // Just for CAKE staking, we dont use withdraw()
        } else {
            IPancakeswapFarm(farmContractAddress).withdraw(pid, 0);
        }

        // Converts farm tokens into want tokens
        uint256 earnedAmt = IERC20(earnedAddress).balanceOf(address(this));

        emit Earned(earnedAddress, earnedAmt);

        uint256 _distributeFee = distributeFees(earnedAmt);
        uint256 _buyBackAmt1 = buyBack1(earnedAmt);
        uint256 _buyBackAmt2 = buyBack2(earnedAmt);

        earnedAmt = earnedAmt.sub(_distributeFee).sub(_buyBackAmt1).sub(_buyBackAmt2);

        if (isCAKEStaking) {
            lastEarnBlock = block.number;
            _farm();
            return;
        }

        IERC20(earnedAddress).safeIncreaseAllowance(uniRouterAddress, earnedAmt);

        if (earnedAddress != token0Address) {
            // Swap half earned to token0
            IPancakeRouter02(uniRouterAddress).swapExactTokensForTokensSupportingFeeOnTransferTokens(earnedAmt.div(2), 0, earnedToToken0Path, address(this), now + 60);
        }

        if (earnedAddress != token1Address) {
            // Swap half earned to token1
            IPancakeRouter02(uniRouterAddress).swapExactTokensForTokensSupportingFeeOnTransferTokens(earnedAmt.div(2), 0, earnedToToken1Path, address(this), now + 60);
        }

        // Get want tokens, ie. add liquidity
        uint256 token0Amt = IERC20(token0Address).balanceOf(address(this));
        uint256 token1Amt = IERC20(token1Address).balanceOf(address(this));
        if (token0Amt > 0 && token1Amt > 0) {
            IERC20(token0Address).safeIncreaseAllowance(uniRouterAddress, token0Amt);
            IERC20(token1Address).safeIncreaseAllowance(uniRouterAddress, token1Amt);
            IPancakeRouter02(uniRouterAddress).addLiquidity(token0Address, token1Address, token0Amt, token1Amt, 0, 0, address(this), now + 60);
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

        uint256 _pathLength = earnedToBuyBackToken1Path.length;
        uint256 _before = IERC20(buyBackToken1).balanceOf(buyBackAddress1);
        if (earnedToBuyBackToken1Path[0] != earnedToBuyBackToken1Path[_pathLength - 1]){
            IERC20(earnedAddress).safeIncreaseAllowance(uniRouterAddress, _buyBackAmt);
            IPancakeRouter02(uniRouterAddress).swapExactTokensForTokensSupportingFeeOnTransferTokens(_buyBackAmt, 0, earnedToBuyBackToken1Path, buyBackAddress1, now + 60);
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

        uint256 _pathLength = earnedToBuyBackToken2Path.length;
        uint256 _before = IERC20(buyBackToken2).balanceOf(buyBackAddress2);
        if (earnedToBuyBackToken2Path[0] != earnedToBuyBackToken2Path[_pathLength - 1]){
            IERC20(earnedAddress).safeIncreaseAllowance(uniRouterAddress, _buyBackAmt);
            IPancakeRouter02(uniRouterAddress).swapExactTokensForTokensSupportingFeeOnTransferTokens(_buyBackAmt, 0, earnedToBuyBackToken2Path, buyBackAddress2, now + 60);
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
        require(!isCAKEStaking, "isCAKEStaking");

        // Converts dust tokens into earned tokens, which will be reinvested on the next earn().

        // Converts token0 dust (if any) to earned tokens
        uint256 token0Amt = IERC20(token0Address).balanceOf(address(this));
        if (token0Address != earnedAddress && token0Amt > 0) {
            IERC20(token0Address).safeIncreaseAllowance(uniRouterAddress, token0Amt);

            // Swap all dust tokens to earned tokens
            IPancakeRouter02(uniRouterAddress).swapExactTokensForTokensSupportingFeeOnTransferTokens(token0Amt, 0, token0ToEarnedPath, address(this), now + 60);
            emit ConvertDustToEarned(token0Address, earnedAddress, token0Amt);
        }

        // Converts token1 dust (if any) to earned tokens
        uint256 token1Amt = IERC20(token1Address).balanceOf(address(this));
        if (token1Address != earnedAddress && token1Amt > 0) {
            IERC20(token1Address).safeIncreaseAllowance(uniRouterAddress, token1Amt);

            // Swap all dust tokens to earned tokens
            IPancakeRouter02(uniRouterAddress).swapExactTokensForTokensSupportingFeeOnTransferTokens(token1Amt, 0, token1ToEarnedPath, address(this), now + 60);
            emit ConvertDustToEarned(token1Address, earnedAddress, token1Amt);
        }
    }

    function uniExchangeRate(uint256 _tokenAmount, address[] memory _path) public view returns (uint256) {
        uint256[] memory amounts = IPancakeRouter02(uniRouterAddress).getAmountsOut(_tokenAmount, _path);
        return amounts[amounts.length - 1];
    }

    function pendingHarvest() public view returns (uint256) {
        uint256 _earnedBal = IERC20(earnedAddress).balanceOf(address(this));
        return IPancakeswapFarm(farmContractAddress).pendingShare(pid, address(this)).add(_earnedBal);
    }

    function pendingHarvestDollarValue() public view returns (uint256) {
        uint256 _pending = pendingHarvest();
        return (_pending == 0) ? 0 : uniExchangeRate(_pending, earnedToBusdPath);
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

    function setEarnedToBuyBackToken1Path(address[] memory _path) external onlyOperator {
        earnedToBuyBackToken1Path = _path;
    }

    function setEarnedToBuyBackToken2Path(address[] memory _path) external onlyOperator {
        earnedToBuyBackToken2Path = _path;
    }

    function setEarnedToBusdPath(address[] memory _path) external onlyOperator {
        earnedToBusdPath = _path;
    }

    function setEarnedToToken0Path(address[] memory _path) external onlyOperator {
        earnedToToken0Path = _path;
    }

    function setEarnedToToken1Path(address[] memory _path) external onlyOperator {
        earnedToToken1Path = _path;
    }

    function setToken0ToEarnedPath(address[] memory _path) external onlyOperator {
        token0ToEarnedPath = _path;
    }

    function setToken1ToEarnedPath(address[] memory _path) external onlyOperator {
        token1ToEarnedPath = _path;
    }

    function inCaseTokensGetStuck(address _token, uint256 _amount, address _to) external onlyOperator {
        require(_token != earnedAddress, "!safe");
        require(_token != wantAddress, "!safe");
        IERC20(_token).safeTransfer(_to, _amount);
        emit InCaseTokensGetStuck(_token, _amount, _to);
    }

    /* ========== EMERGENCY ========== */

    function setTimelock(address _timelock) external onlyTimelock {
        timelock = _timelock;
    }

    /**
     * @dev This is from Timelock contract.
     */
    function executeTransaction(address target, uint256 value, string memory signature, bytes memory data) external onlyTimelock returns (bytes memory) {
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
