// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "../interfaces/IStrategy.sol";

contract MockStrategy is IStrategy {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public want;
    uint256 private _wantLockedTotal;
    uint256 private _sharesTotal;

    constructor(address _want) public {
        want = _want;
    }

    // Total want tokens managed by strategy
    function wantLockedTotal() external override view returns (uint256) {
        return _wantLockedTotal;
    }

    // Sum of all shares of users to wantLockedTotal
    function sharesTotal() external override view returns (uint256) {
        return _sharesTotal;
    }

    function wantAddress() external override view returns (address) {
        return want;
    }

    function token0Address() external override view returns (address) {
        revert("No implementation");
    }

    function token1Address() external override view returns (address) {
        revert("No implementation");
    }

    function earnedAddress() external override view returns (address) {
        revert("No implementation");
    }

    function ratio0() external override view returns (uint256) {
        revert("No implementation");
    }

    function ratio1() external override view returns (uint256) {
        revert("No implementation");
    }

    function getPricePerFullShare() public override view returns (uint256) {
        return (_sharesTotal == 0) ? 1e18 : _wantLockedTotal.mul(1e18).div(_sharesTotal);
    }

    function earn() external override {
        uint256 _earned = _wantLockedTotal.div(100);
        IERC20(want).safeTransferFrom(msg.sender, address(this), _earned);
        _wantLockedTotal = _wantLockedTotal.add(_earned);
    }

    function deposit(address, uint256 _wantAmt) external override returns (uint256 _sharedAdded) {
        IERC20(want).safeTransferFrom(msg.sender, address(this), _wantAmt);
        _sharedAdded = _wantAmt.mul(1e18).div(getPricePerFullShare());
        _sharesTotal = _sharesTotal.add(_sharedAdded);
        _wantLockedTotal = _wantLockedTotal.add(_wantAmt);
    }

    function withdraw(address, uint256 _wantAmt) external override returns (uint256 _sharesRemoved) {
        IERC20(want).safeTransfer(msg.sender, _wantAmt);
        _sharesRemoved = _wantAmt.mul(1e18).div(getPricePerFullShare());
        _sharesTotal = _sharesTotal.sub(_sharesRemoved);
        _wantLockedTotal = _wantLockedTotal.sub(_wantAmt);
    }

    function migrateFrom(address _oldStrategy, uint256 _oldWantLockedTotal, uint256 _oldSharesTotal) external override {
        require(_wantLockedTotal == 0 && _sharesTotal == 0, "strategy is not empty");
        require(want == IStrategy(_oldStrategy).wantAddress(), "!wantAddress");
        uint256 _wantAmt = IERC20(want).balanceOf(address(this));
        require(_wantAmt >= _oldWantLockedTotal, "short of wantLockedTotal");
        _sharesTotal = _oldSharesTotal;
        _wantLockedTotal = _wantLockedTotal.add(_wantAmt);
    }

    function inCaseTokensGetStuck(address, uint256, address) external override {
        revert("No implementation");
    }
}
