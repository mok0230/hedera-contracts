const { ethers } = require('hardhat');
const testSolidityFeaturesAbi = require('../test-solidity-features/SolidityFeaturesContract_sol_SolidityFeaturesContract.json')
require('dotenv').config({ path: '../.env' })

const TEST_SOLIDITY_FEATURES = '0x000000000000000000000000000000000214db10';

async function main() {
    console.log('testSolidityFeaturesAbi', testSolidityFeaturesAbi)
    const contract = new ethers.Contract(TEST_SOLIDITY_FEATURES, testSolidityFeaturesAbi);

    const [signer] = await ethers.getSigners();

    const tx = await contract.connect(signer).updateTestMapping('Bob', 1);

    console.log('tx', tx)
}

main();
