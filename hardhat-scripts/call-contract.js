const { computeAliasFromPubKey } = require('@hethers/transactions');
const { Wallet } = require('ethers');
const { ethers } = require('hardhat');
const testSolidityFeaturesAbi = require('../test-solidity-features/SolidityFeaturesContract_sol_SolidityFeaturesContract.json')
const { sleep } = require('../utils/execution');
require('dotenv').config({ path: '../.env' })

const TEST_SOLIDITY_FEATURES = '0x000000000000000000000000000000000214db10';
const NUM = 3;
const KEY = 'foo';

async function main() {
    const signer = new Wallet(process.env.ETHERS_PRIVATE_KEY, ethers.provider);

    console.log(`\nCalling Test Solidity Features contract ${TEST_SOLIDITY_FEATURES} with ${signer.address} (${process.env.ETHERS_ACCOUNT_ID})\n`)

    const contract = new ethers.Contract(TEST_SOLIDITY_FEATURES, testSolidityFeaturesAbi, signer);

    const currentNum = await contract.getTestMapping(KEY);

    console.log('currentNum', currentNum.toString());
    
    const partialTxParams = await contract.populateTransaction.updateTestMapping(KEY, NUM);

    console.log('partialTxParams', partialTxParams);

    const fullTxParams = await signer.populateTransaction(partialTxParams);

    console.log('fullTxParams', fullTxParams);

    const signedTx = await signer.signTransaction(fullTxParams);

    console.log('signedTx', signedTx);

    const tx = await ethers.provider.send('eth_sendRawTransaction', [signedTx]);

    console.log('sent tx (does not match HashScan)', tx);

    console.log('done');
}

main();
