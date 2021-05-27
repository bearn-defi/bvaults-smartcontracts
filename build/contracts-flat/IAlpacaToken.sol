pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface IAlpacaToken {
    function canUnlockAmount(address _account) external view returns (uint256);
    function unlock() external;
}