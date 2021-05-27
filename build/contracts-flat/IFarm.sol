pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface IFarm {
    function userInfo(uint256 _pid, address _user) external view returns (uint256 amount, uint256 rewardDebt, uint256 bonusDebt, uint256 fundedBy);
}