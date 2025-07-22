// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        uint256 initialSupply = 1_000_000 * 10 ** decimals(); // 1 triệu token
        _mint(msg.sender, initialSupply); // Mint cho deployer
    }
}
