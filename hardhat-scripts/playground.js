const { ethers } = require('hardhat');
require('dotenv').config({ path: '../.env' })

const baseURL = 'https://testnet.mirrornode.hedera.com/api/v1/';
const axios = require('axios').default.create({ baseURL });

// const TX_HASH = '0x9da00844ebec8cc34f32dce4c1b959baf9fd502953217a655540acc124feb00c'

const TX_HASH = "0x3988efabf636ceb81a73e51ccfbf2bd0d4c0dd31400ed54827428673eebe8f1c"

async function main() {
    const signer = new ethers.Wallet(process.env.ETHERS_PRIVATE_KEY, ethers.provider);

    const resJsonRpc = await ethers.provider.getTransactionReceipt(TX_HASH)

    console.log('resJsonRpc', resJsonRpc);

    const resMirrorNode = await axios.get(`contracts/results/${TX_HASH}`);

    console.log('resMirrorNode.data', resMirrorNode.data)

    console.log('done');
}

main();
