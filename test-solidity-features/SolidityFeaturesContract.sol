// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
 

contract SolidityFeaturesContract {
  event TestEvent(uint num, string str);
  mapping (string => uint) public testMapping;
  bool public testBool;

  constructor (string memory _testKey, uint _testVal) {
    testMapping[_testKey] = _testVal;
  }

  function updateTestMapping(string memory _testKey, uint _testVal) public {
    testMapping[_testKey] = _testVal;
  }

  function getTestMapping(string memory _testKey) public view returns (uint) {
    return testMapping[_testKey];
  }

  function updateTestBool(bool _testBool) public {
    testBool = _testBool;
  }

  function getTestBool() public view returns (bool) {
    return testBool;
  }

  function testRevert() pure public {
    require(false, "Call has been reverted!");
  }

  function testEvent(uint _num, string memory _str) public {
    emit TestEvent(_num, _str);
  }
}