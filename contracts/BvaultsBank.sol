// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./interfaces/IStrategy.sol";

contract BvaultsBank is ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // governance
    address public operator; // should be an at least 6h timelock

    // flags
    bool public initialized = false;

    // Info of each user.
    struct UserInfo {
        uint256 shares; // How many LP tokens the user has provided.
        mapping(uint256 => uint256) rewardDebt; // Reward debt. See explanation below.

        // We do some fancy math here. Basically, any point in time, the amount of BDO
        // entitled to a user but is pending to be distributed is:
        //
        //   amount = user.shares / sharesTotal * wantLockedTotal
        //   pending reward = (amount * pool.accRewardToken1PerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws want tokens to a pool. Here's what happens:
        //   1. The pool's `accRewardToken1PerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.

        uint256 lastStakeTime;
    }

    struct PoolInfo {
        IERC20 want; // Address of the want token.
        uint256 allocPoint; // How many allocation points assigned to this pool. BDO to distribute per block.
        uint256 lastRewardBlock; // Last block number that reward distribution occurs.
        mapping(uint256 => uint256) accRewardPerShare; // Accumulated rewardPool per share, times 1e18.
        address strategy; // Strategy address that will auto compound want tokens
    }

    // Info of each rewardPool funding.
    struct RewardPoolInfo {
        address rewardToken; // Address of rewardPool token contract.
        uint256 rewardPerBlock; // Reward token amount to distribute per block.
        uint256 totalPaidRewards;
    }

    uint256 public startBlock = 4814500; // https://bscscan.com/block/countdown/4814500

    PoolInfo[] public poolInfo; // Info of each pool.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo; // Info of each user that stakes LP tokens.
    RewardPoolInfo[] public rewardPoolInfo;
    uint256 public totalAllocPoint = 0; // Total allocation points. Must be the sum of all allocation points in all pools.
    uint public unstakingFrozenTime = 1 hours;

    address public timelock = address(0x92a082Ad5A942140bCC791081F775900d0A514D9); // 24h timelock

    /* =================== Added variables (need to keep orders for proxy to work) =================== */
    mapping(address => bool) public whitelisted;
    mapping(uint256 => bool) public stopRewardPool;
    mapping(uint256 => bool) public pausePool;

    /* ========== EVENTS ========== */

    event Initialized(address indexed executor, uint256 at);
    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event RewardPaid(uint256 indexed rewardPid, address indexed token, address indexed user, uint256 amount);

    function initialize(
        uint256 _startBlock,
        address _bfi,
        uint256 _bfiRewardRate,
        address _bdo,
        uint256 _bdoRewardRate
    ) public notInitialized {
        require(block.number < _startBlock, "late");
        startBlock = _startBlock;
        timelock = address(0x92a082Ad5A942140bCC791081F775900d0A514D9);
        initialized = true;
        operator = msg.sender;
        addRewardPool(_bfi, _bfiRewardRate);
        addRewardPool(_bdo, _bdoRewardRate);
        emit Initialized(msg.sender, block.number);
    }

    modifier onlyOperator() {
        require(operator == msg.sender, "BvaultsBank: caller is not the operator");
        _;
    }

    modifier onlyTimelock() {
        require(timelock == msg.sender, "BvaultsBank: caller is not timelock");
        _;
    }

    modifier notInitialized() {
        require(!initialized, "BvaultsBank: already initialized");
        _;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    function checkPoolDuplicate(IERC20 _want) internal view {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            require(poolInfo[pid].want != _want, "BvaultsBank: existing pool?");
        }
    }

    function add(
        uint256 _allocPoint,
        IERC20 _want,
        bool _withUpdate,
        address _strategy
    ) public onlyOperator {
        // checkPoolDuplicate(_want);
        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(
            PoolInfo({
                want: _want,
                allocPoint: _allocPoint,
                lastRewardBlock: lastRewardBlock,
                strategy : _strategy
            }));
    }

    // Update the given pool's reward allocation point. Can only be called by the owner.
    function set(uint256 _pid, uint256 _allocPoint) public onlyOperator {
        massUpdatePools();
        totalAllocPoint = totalAllocPoint.sub(poolInfo[_pid].allocPoint).add(_allocPoint);
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    function resetStrategy(uint256 _pid, address _strategy) public onlyOperator {
        PoolInfo storage pool = poolInfo[_pid];
        require(IERC20(pool.want).balanceOf(poolInfo[_pid].strategy) == 0 || pool.accRewardPerShare[_pid] == 0, "strategy not empty");
        poolInfo[_pid].strategy = _strategy;
    }

    function migrateStrategy(uint256 _pid, address _newStrategy) public onlyOperator {
        require(IStrategy(_newStrategy).wantLockedTotal() == 0 && IStrategy(_newStrategy).sharesTotal() == 0, "new strategy not empty");
        PoolInfo storage pool = poolInfo[_pid];
        address _oldStrategy = pool.strategy;
        uint256 _oldSharesTotal = IStrategy(_oldStrategy).sharesTotal();
        uint256 _oldWantAmt = IStrategy(_oldStrategy).wantLockedTotal();
        IStrategy(_oldStrategy).withdraw(address(this), _oldWantAmt);
        pool.want.transfer(_newStrategy, _oldWantAmt);
        IStrategy(_newStrategy).migrateFrom(_oldStrategy, _oldWantAmt, _oldSharesTotal);
        pool.strategy = _newStrategy;
    }

    function rewardPoolLength() external view returns (uint256) {
        return rewardPoolInfo.length;
    }

    function addRewardPool(address _rewardToken, uint256 _rewardPerBlock) public nonReentrant onlyOperator {
        require(rewardPoolInfo.length <= 16, "BvaultsBank: Reward pool length > 16");
        massUpdatePools();
        rewardPoolInfo.push(RewardPoolInfo({
            rewardToken : _rewardToken,
            rewardPerBlock : _rewardPerBlock,
            totalPaidRewards : 0
            }));
    }

    function updateRewardToken(uint256 _rewardPid, address _rewardToken, uint256 _rewardPerBlock) external nonReentrant onlyOperator {
        RewardPoolInfo storage rewardPool = rewardPoolInfo[_rewardPid];
        require(_rewardPid >= 2, "core reward pool"); // BFI & BDO
        require(rewardPool.rewardPerBlock == 0, "old pool still running");
        massUpdatePools();
        rewardPool.rewardToken = _rewardToken;
        rewardPool.rewardPerBlock = _rewardPerBlock;
        rewardPool.totalPaidRewards = 0;
    }

    function updateRewardPerBlock(uint256 _rewardPid, uint256 _rewardPerBlock) external nonReentrant onlyOperator {
        massUpdatePools();
        RewardPoolInfo storage rewardPool = rewardPoolInfo[_rewardPid];
        rewardPool.rewardPerBlock = _rewardPerBlock;
    }

    function setUnstakingFrozenTime(uint256 _unstakingFrozenTime) external nonReentrant onlyOperator {
        require(_unstakingFrozenTime <= 7 days, "BvaultsBank: !safe - dont lock for too long");
        unstakingFrozenTime = _unstakingFrozenTime;
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public pure returns (uint256) {
        return _to.sub(_from);
    }

    // View function to see pending reward on frontend.
    function pendingReward(uint256 _pid, uint256 _rewardPid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 _accRewardPerShare = pool.accRewardPerShare[_rewardPid];
        uint256 sharesTotal = IStrategy(pool.strategy).sharesTotal();
        if (block.number > pool.lastRewardBlock && sharesTotal != 0) {
            uint256 _multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 _rewardPerBlock = rewardPoolInfo[_rewardPid].rewardPerBlock;
            uint256 _reward = _multiplier.mul(_rewardPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
            _accRewardPerShare = _accRewardPerShare.add(_reward.mul(1e18).div(sharesTotal));
        }
        return user.shares.mul(_accRewardPerShare).div(1e18).sub(user.rewardDebt[_rewardPid]);
    }

    // View function to see staked Want tokens on frontend.
    function stakedWantTokens(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];

        uint256 sharesTotal = IStrategy(pool.strategy).sharesTotal();
        uint256 wantLockedTotal = IStrategy(poolInfo[_pid].strategy).wantLockedTotal();
        if (sharesTotal == 0) {
            return 0;
        }
        return user.shares.mul(wantLockedTotal).div(sharesTotal);
    }

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 sharesTotal = IStrategy(pool.strategy).sharesTotal();
        if (sharesTotal == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        if (multiplier <= 0) {
            return;
        }
        uint256 _rewardPoolLength = rewardPoolInfo.length;
        for (uint256 _rewardPid = 0; _rewardPid < _rewardPoolLength; ++_rewardPid) {
            uint256 _rewardPerBlock = rewardPoolInfo[_rewardPid].rewardPerBlock;
            uint256 _reward = multiplier.mul(_rewardPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
            pool.accRewardPerShare[_rewardPid] = pool.accRewardPerShare[_rewardPid].add(_reward.mul(1e18).div(sharesTotal));
            pool.lastRewardBlock = block.number;
        }
    }

    function _getReward(uint256 _pid) internal {
        PoolInfo storage _pool = poolInfo[_pid];
        UserInfo storage _user = userInfo[_pid][msg.sender];
        uint256 _rewardPoolLength = rewardPoolInfo.length;
        for (uint256 _rewardPid = 0; _rewardPid < _rewardPoolLength; ++_rewardPid) {
            if (!stopRewardPool[_rewardPid]) {
                uint256 _pending = _user.shares.mul(_pool.accRewardPerShare[_rewardPid]).div(1e18).sub(_user.rewardDebt[_rewardPid]);
                if (_pending > 0) {
                    RewardPoolInfo storage rewardPool = rewardPoolInfo[_rewardPid];
                    address _rewardToken = rewardPool.rewardToken;
                    safeRewardTransfer(_rewardToken, msg.sender, _pending);
                    rewardPool.totalPaidRewards = rewardPool.totalPaidRewards.add(_pending);
                    emit RewardPaid(_rewardPid, _rewardToken, msg.sender, _pending);
                }
            }
        }
    }

    // Want tokens moved from user -> BDOFarm (BDO allocation) -> Strat (compounding)
    function deposit(uint256 _pid, uint256 _wantAmt) public nonReentrant {
        require(!pausePool[_pid], "paused");
        updatePool(_pid);
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        if (user.shares > 0) {
            _getReward(_pid);
        }
        if (_wantAmt > 0) {
            pool.want.safeTransferFrom(address(msg.sender), address(this), _wantAmt);

            pool.want.safeIncreaseAllowance(pool.strategy, _wantAmt);
            uint256 sharesAdded = IStrategy(poolInfo[_pid].strategy).deposit(msg.sender, _wantAmt);
            user.shares = user.shares.add(sharesAdded);
            user.lastStakeTime = block.timestamp;
        }
        uint256 _rewardPoolLength = rewardPoolInfo.length;
        for (uint256 _rewardPid = 0; _rewardPid < _rewardPoolLength; ++_rewardPid) {
            user.rewardDebt[_rewardPid] = user.shares.mul(pool.accRewardPerShare[_rewardPid]).div(1e18);
        }
        emit Deposit(msg.sender, _pid, _wantAmt);
    }

    function unfrozenStakeTime(uint256 _pid, address _account) public view returns (uint256) {
        return (whitelisted[_account]) ? userInfo[_pid][_account].lastStakeTime : userInfo[_pid][_account].lastStakeTime + unstakingFrozenTime;
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256 _wantAmt) public nonReentrant {
        require(!pausePool[_pid], "paused");
        updatePool(_pid);

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        uint256 wantLockedTotal = IStrategy(poolInfo[_pid].strategy).wantLockedTotal();
        uint256 sharesTotal = IStrategy(poolInfo[_pid].strategy).sharesTotal();

        require(user.shares > 0, "BvaultsBank: user.shares is 0");
        require(sharesTotal > 0, "BvaultsBank: sharesTotal is 0");

        _getReward(_pid);

        // Withdraw want tokens
        uint256 amount = user.shares.mul(wantLockedTotal).div(sharesTotal);
        if (_wantAmt > amount) {
            _wantAmt = amount;
        }
        if (_wantAmt > 0) {
            uint256 sharesRemoved = IStrategy(poolInfo[_pid].strategy).withdraw(msg.sender, _wantAmt);

            if (sharesRemoved > user.shares) {
                user.shares = 0;
            } else {
                user.shares = user.shares.sub(sharesRemoved);
            }

            uint256 wantBal = IERC20(pool.want).balanceOf(address(this));
            if (wantBal < _wantAmt) {
                _wantAmt = wantBal;
            }

            if (_wantAmt > 0) {
                require(whitelisted[msg.sender] || block.timestamp >= unfrozenStakeTime(_pid, msg.sender), "BvaultsBank: frozen");
                pool.want.safeTransfer(address(msg.sender), _wantAmt);
            }
        }
        uint256 _rewardPoolLength = rewardPoolInfo.length;
        for (uint256 _rewardPid = 0; _rewardPid < _rewardPoolLength; ++_rewardPid) {
            user.rewardDebt[_rewardPid] = user.shares.mul(pool.accRewardPerShare[_rewardPid]).div(1e18);
        }
        emit Withdraw(msg.sender, _pid, _wantAmt);
    }

    function withdrawAll(uint256 _pid) external {
        withdraw(_pid, uint256(- 1));
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public nonReentrant {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        uint256 wantLockedTotal = IStrategy(poolInfo[_pid].strategy).wantLockedTotal();
        uint256 sharesTotal = IStrategy(poolInfo[_pid].strategy).sharesTotal();
        uint256 amount = user.shares.mul(wantLockedTotal).div(sharesTotal);

        IStrategy(poolInfo[_pid].strategy).withdraw(msg.sender, amount);

        pool.want.safeTransfer(address(msg.sender), amount);
        emit EmergencyWithdraw(msg.sender, _pid, amount);
        user.shares = 0;
        uint256 _rewardPoolLength = rewardPoolInfo.length;
        for (uint256 _rewardPid = 0; _rewardPid < _rewardPoolLength; ++_rewardPid) {
            user.rewardDebt[_rewardPid] = 0;
        }
    }

    // Safe reward token transfer function, just in case if rounding error causes pool to not have enough
    function safeRewardTransfer(address _rewardToken, address _to, uint256 _amount) internal {
        uint256 _bal = IERC20(_rewardToken).balanceOf(address(this));
        if (_amount > _bal) {
            IERC20(_rewardToken).transfer(_to, _bal);
        } else {
            IERC20(_rewardToken).transfer(_to, _amount);
        }
    }

    function setWhitelisted(address _account, bool _whitelisted) external nonReentrant onlyOperator {
        whitelisted[_account] = _whitelisted;
    }

    function setStopRewardPool(uint256 _pid, bool _stopRewardPool) external nonReentrant onlyOperator {
        stopRewardPool[_pid] = _stopRewardPool;
    }

    function setPausePool(uint256 _pid, bool _pausePool) external nonReentrant onlyOperator {
        pausePool[_pid] = _pausePool;
    }

    /* ========== EMERGENCY ========== */

    function setTimelock(address _timelock) external {
        require(msg.sender == timelock || (timelock == address(0) && msg.sender == operator), "BvaultsBank: !authorised");
        timelock = _timelock;
    }

    function inCaseTokensGetStuck(address _token, uint256 _amount, address _to) external onlyTimelock {
        IERC20(_token).safeTransfer(_to, _amount);
    }

    event ExecuteTransaction(address indexed target, uint256 value, string signature, bytes data);

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
        require(success, "BvaultsBank::executeTransaction: Transaction execution reverted.");

        emit ExecuteTransaction(target, value, signature, data);

        return returnData;
    }
}
