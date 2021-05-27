pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface ITreasury {
    function notifyExternalReward(uint256 _amount) external;
}