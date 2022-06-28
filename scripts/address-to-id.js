#!/usr/bin/node
const { AccountId } = require("@hashgraph/sdk");

// node address-to-id.js <0xaddress>

function main() {
    const address = process.argv[2];
    
    const accountId = new AccountId.fromSolidityAddress(address);

    console.log('accountId', accountId);

    return accountId;
}

main();