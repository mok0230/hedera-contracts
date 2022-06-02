// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./ISolidityFeatures.sol";

contract InternalCallContract {
  ISolidityFeatures solidityFeatures = ISolidityFeatures(0x000000000000000000000000000000000214db10);

  event TestEvent(uint num, string str);
  mapping (string => uint) public testMapping;
  
  constructor (string memory _testKey, uint _testVal) {
    testMapping[_testKey] = _testVal;
  }

  function updateTestMapping(string memory _testKey, uint _testVal) public {
    testMapping[_testKey] = _testVal;
    solidityFeatures.updateTestMapping(_testKey, _testVal);
  }

  function getTestMapping(string memory _testKey) public view returns (uint) {
    return testMapping[_testKey];
  }

  function testEvent(uint _num, string memory _str) public {
    solidityFeatures.testEvent(_num, _str);
    emit TestEvent(_num, _str);
  }
}