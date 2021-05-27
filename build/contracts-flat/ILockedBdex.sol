pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface ILockedBdex {
    function canUnlockAmount(address _account) external view returns (uint256);
    function claimUnlocked() external;
    function unlockAll() external;
}