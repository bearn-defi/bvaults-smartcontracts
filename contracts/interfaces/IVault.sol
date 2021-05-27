// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IVault {
    /// @dev Add more ERC20 to the bank. Hope to get some good returns.
    function deposit(uint256 amountToken) external payable;

    /// @dev Withdraw ERC20 from the bank by burning the share tokens.
    function withdraw(uint256 share) external payable;

}
