const { computeAliasFromPubKey } = require('@hethers/transactions');
const { Wallet } = require('ethers');
const { ethers } = require('hardhat');
const testSolidityFeaturesAbi = require('../test-solidity-features/SolidityFeaturesContract_sol_SolidityFeaturesContract.json')
require('dotenv').config({ path: '../.env' })

const TEST_SOLIDITY_FEATURES = '0x000000000000000000000000000000000214db10';
const NUM = 1;

async function main() {
    // script hangs while getting provider when signer is instantiated with ethers.getSigners
    // const [signer] = await ethers.getSigners();

    // script creates the transaction when signer is instantiated with new Wallet() but 
    // eventually fails with error in while awaiting tx.wait():
    // UnhandledPromiseRejectionWarning: Error: invalid BigNumber value (argument="value", value=null, code=INVALID_ARGUMENT, version=bignumber/5.6.2)
    const signer = new Wallet(process.env.ETHERS_PRIVATE_KEY, ethers.provider);

    const txCount = await ethers.provider.getTransactionCount(signer.address);

    console.log('txCount', txCount);

    const contract = new ethers.Contract(TEST_SOLIDITY_FEATURES, testSolidityFeaturesAbi, signer);

    const currentNum = await contract.getTestMapping('Bob');

    console.log('currentNum', currentNum);
    
    const tx = await contract.updateTestMapping('Bob', NUM);

    console.log('tx', tx);
    // sample log:
    // {
    //     type: 2,
    //     chainId: 296,
    //     nonce: 39,
    //     maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
    //     maxFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
    //     gasPrice: null,
    //     gasLimit: BigNumber { _hex: '0x061a80', _isBigNumber: true },
    //     to: '0x000000000000000000000000000000000214db10',
    //     value: BigNumber { _hex: '0x00', _isBigNumber: true },
    //     data: '0x06e8fac2000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003426f620000000000000000000000000000000000000000000000000000000000',
    //     accessList: [],
    //     hash: '0xc6fea8c1db52a0e0bff4ac7451133dc5eded94e148a8ef97cfe46fcf120e7f63',
    //     v: 1,
    //     r: '0xf758dc7d2ac1d0b137511772e8490aa0f31f7ce97a914a4fc1c1cba4c3ae8287',
    //     s: '0x50ee41409fbca965e66102fc95b42c6efea13214f5a3392ec7ea96f439ebed7a',
    //     from: '0x205399A519D341051E86e790AaA0F713340745CA',
    //     confirmations: 0,
    //     wait: [Function]
    //   }

    await tx.wait();

    const numAfterUpdate = await contract.getTestMapping('Bob');

    console.log('numAfterUpdate', numAfterUpdate);

    console.log('done');
}

main();
