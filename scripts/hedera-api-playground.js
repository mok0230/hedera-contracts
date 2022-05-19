const baseURL = 'https://testnet.mirrornode.hedera.com/api/v1/';
const axios = require('axios').default.create({ baseURL });

const CONTRACT_ID='0.0.34730039'

async function main() {
  // const response = await axios.get(`contracts/${CONTRACT_ID}`);

  const response = await axios.get(`transactions?account.id=${CONTRACT_ID}`)

  console.log('response.data', response.data)
}

main().catch(err => console.error(err.message));