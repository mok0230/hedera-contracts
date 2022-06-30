#!/usr/bin/node
const { getApi } = require('../utils/mirror-node');

async function main() {
    const accountId = process.argv[2];

    if (!accountId) {
        throw new Error('Invoke with: get-tx-by-account <0.0.accountId>')
    }

    console.log('getting transactions for accountId', accountId);

    const api = getApi();
    const res = await api.get(`transactions?account.id=${accountId}&order=desc&limit=100`)
    

    console.log('tx', res.data.transactions);

    console.log('done')

    return accountId;
}

main();