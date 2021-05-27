pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface IStakePool {
    function stakeToken() external view returns (address);

    function stake(uint256) external;

    function stakeFor(address _account) external;

    function withdraw(uint256) external;

    function getReward(uint8 _pid, address _account) external;

    function getAllRewards(address _account) external;

    function claimReward() external;

    function pendingReward(uint8 _pid, address _account) external view returns (uint256);

    function allowRecoverRewardToken(address _token) external view returns (bool);

    function getRewardPerBlock(uint8 pid) external view returns (uint256);

    function rewardPoolInfoLength() external view returns (uint256);

    function unfrozenStakeTime(address _account) external view returns (uint256);

    function emergencyWithdraw() external;

}