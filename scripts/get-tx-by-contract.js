#!/usr/bin/node
const { getApi } = require('../utils/mirror-node');

async function main() {
    const contractId = process.argv[2];

    if (!contractId) {
        throw new Error('Invoke with: get-tx-by-contract <0.0.contractId>')
    }

    console.log('getting transactions for contractId', contractId);

    const api = getApi();
    const res = await api.get(`contracts/${contractId}/results?limit=100`)
    

    console.log('tx', res.data);

    console.log('done')

    return contractId;
}

main();