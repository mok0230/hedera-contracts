const { ethers } = require('hardhat');

require('dotenv').config({ path: '../.env' })

// npx hardhat run hardhat-scripts/send-funds.js --network hedera
async function main() {
    const balance = await ethers.provider.getBalance(process.env.ETHERS_EVM_ADDRESS)
    console.log('balance', balance)
}

main();
