// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
 
interface ISolidityFeatures {
  function updateTestMapping(string memory _testKey, uint _testVal) external;
  function testEvent(uint _num, string memory _str) external;
}
