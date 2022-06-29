const { ethers } = require('hardhat');
require('dotenv').config({ path: '../.env' })

const ACCOUNT_1 = process.env.ETHERS_EVM_ADDRESS_FROM_KEY;
const ACCOUNT_2 = process.env.ETHERS_2_EVM_ADDRESS_FROM_KEY;

console.log('ACCOUNT_1', ACCOUNT_1)
console.log('ACCOUNT_2', ACCOUNT_2)

async function main() {
    // console.log('testSolidityFeaturesAbi', testSolidityFeaturesAbi)

    const [signer] = await ethers.getSigners();

    // const balance = await ethers.provider.getBalance(process.env.ETHERS_EVM_ADDRESS_FROM_KEY);

    // console.log('balance', balance)

    const balance = await ethers.provider.getBalance(signer.address);

    console.log('signer balance', balance);

    const tx = await signer.sendTransaction({
        from: `0x${ACCOUNT_1}`,
        to: `0x${ACCOUNT_2}`,
        value: '1'
    });

    console.log('tx', tx)
}

main();
