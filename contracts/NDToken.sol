//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NDToken is ERC20 {

    // string siempre va con memory

    // constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    //     _mint(msg.sender, 100000 * (10 ** 18));
    // }

    // puedo meterlo a mano
    constructor() ERC20("Angel ERC20", "AEI") {
        _mint(msg.sender, 100000 * (10 ** 18)); // tiene 18 decimales
    }
}