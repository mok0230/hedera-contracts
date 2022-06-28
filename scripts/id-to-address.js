#!/usr/bin/node
const { AccountId } = require("@hashgraph/sdk");

// node id-to-address.js <0.0.num>

function main() {
    const id = process.argv[2];
    const [shard, realm, num] = id.split('.').map(numStr => parseInt(numStr, 10));

    console.log('shard, realm, num', shard, realm, num)

    const accountId = new AccountId(shard, realm, num);
    const solidityAddress = accountId.toSolidityAddress();

    console.log('solidityAddress', solidityAddress);
    
    return solidityAddress;
}

main();