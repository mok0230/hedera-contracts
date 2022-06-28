require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: "0.7.3",
  networks: {
    hedera: {
      url: 'https://testnet.hashio.io/api',
      accounts: [`0x${process.env.ETHERS_PRIVATE_KEY}`],
    }
  },
};
