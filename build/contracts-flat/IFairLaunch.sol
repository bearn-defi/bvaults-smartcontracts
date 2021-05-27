pragma solidity 0.6.12;


// SPDX-License-Identifier: MIT
interface IFairLaunch {

    function pendingAlpaca(uint256 _pid, address _user) external view returns (uint256);

    function deposit(address _for, uint256 _pid, uint256 _amount) external;

    function withdraw(address _for, uint256 _pid, uint256 _amount) external;

    function withdrawAll(address _for, uint256 _pid) external;

    function harvest(uint256 _pid) external;
}