const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
require('dotenv').config({ path: '../.env' })

const ACCOUNT_1 = process.env.ETHERS_EVM_ADDRESS_FROM_KEY;
const ACCOUNT_2 = process.env.ETHERS_2_EVM_ADDRESS_FROM_KEY;

console.log('ACCOUNT_1', ACCOUNT_1)
console.log('ACCOUNT_2', ACCOUNT_2)

async function main() {
    // script hangs while getting provider when signer is instantiated with ethers.getSigners
    // const [signer] = await ethers.getSigners();

    // script creates the transaction when signer is instantiated with new Wallet() but 
    // eventually fails with error in while awaiting tx.wait():
    // UnhandledPromiseRejectionWarning: Error: invalid BigNumber value (argument="value", value=null, code=INVALID_ARGUMENT, version=bignumber/5.6.2)
    const signer = new ethers.Wallet(process.env.ETHERS_PRIVATE_KEY, ethers.provider);

    const balance = await ethers.provider.getBalance(signer.address);

    console.log('signer balance', balance);

    const txCount = await ethers.provider.getTransactionCount(signer.address);

    console.log('txCount', txCount);

    const tx = await signer.sendTransaction({
        to: `0x${ACCOUNT_2}`,
        value: BigNumber.from(10000),
    });

    console.log('tx', tx);
    // sample log:
    // {
    //     type: 2,
    //     chainId: 296,
    //     nonce: 38,
    //     maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
    //     maxFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
    //     gasPrice: null,
    //     gasLimit: BigNumber { _hex: '0x5208', _isBigNumber: true },
    //     to: '0xAc058B91eD2618512a5a012CD5766AFCC6B630eE',
    //     value: BigNumber { _hex: '0x2710', _isBigNumber: true },
    //     data: '0x',
    //     accessList: [],
    //     hash: '0x002dbe2f12714960459a15429c0fc0aeb678eb890c7bb633910af461c3bd17c2',
    //     v: 0,
    //     r: '0x7216e198a1b0b4aacc9ab8b1af4d4702f199fff9b1da714c1dc92792690c9918',
    //     s: '0x1fd43a5454c214e27abfd511daa5a55bfd8111e1cd2dd57dd1aa7e45c9d5f7b4',
    //     from: '0x205399A519D341051E86e790AaA0F713340745CA',
    //     confirmations: 0,
    //     wait: [Function]
    //   }

    await tx.wait();

    console.log('done');
}

main();
