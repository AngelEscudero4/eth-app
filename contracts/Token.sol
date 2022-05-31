//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "hardhat/console.sol";

// declaramos nuestro contract. 
// We do an ERC20 so we need name, symbol, and totalSupply.
// Then we do a mapping (key, value) where key is the address and value is the number of tokens the account has

contract Token {
  string public name = "Nader Dabit Token";
  string public symbol = "NDT";
  uint public totalSupply = 1000000;
  address public owner;
  mapping(address => uint) balances;

  // msg.sender is the address of the person that deploy the contract
  constructor() {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  // function to transfer tokens to account "to"
  // we see that emitter has enough tokens
  // substract the balance of the emitter account and add it to the receiver account
  function transfer(address to, uint amount) external {
    require(balances[msg.sender] >= amount, "Not enough tokens");
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  // returns the balance of the address
  function balanceOf(address account) external view returns (uint) {
    return balances[account];
  }
}