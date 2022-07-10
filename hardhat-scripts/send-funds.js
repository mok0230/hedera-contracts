const { ethers } = require('hardhat');
require('dotenv').config({ path: '../.env' })

const TO_ADDRESS = process.env.ETHERS_2_EVM_ADDRESS_FROM_KEY;

async function main() {
    const signer = new ethers.Wallet(process.env.ETHERS_PRIVATE_KEY, ethers.provider);

    const value = ethers.utils.hexlify(ethers.utils.parseEther('0.06'));

    console.log(`\nsending ${ethers.utils.formatEther(value)} HBAR from ${signer.address} (${process.env.ETHERS_ACCOUNT_ID}) to ${TO_ADDRESS} (${process.env.ETHERS_2_ACCOUNT_ID})\n`);

    const partialTxParams = {
        to: `0x${TO_ADDRESS}`,
        value
    }

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
