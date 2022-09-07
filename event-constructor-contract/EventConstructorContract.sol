// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./interfaces/ISolidityFeatures.sol";

contract EventConstructorContract {
    ISolidityFeatures solidityFeatures = ISolidityFeatures(0x000000000000000000000000000000000214db10);

    constructor(uint _num, string memory _str) {
        solidityFeatures.testEvent(_num, _str);
    }
}