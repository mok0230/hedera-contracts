const baseURL = 'https://api.dragonglass.me/hedera/api/';
const axios = require('axios').default.create({ baseURL });
const initTimestamp = Date.now() - 1000000;
// '1651256725.014607839' || `${parseInt((new Date() / 1000))}.000000000`;
// require("dotenv").config({path: '/../.env'});
require("dotenv").config();

console.log('process.env.DRAGON_GLASS_ACCESS_KEY', process.env.DRAGON_GLASS_ACCESS_KEY)

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTxs(since) {
  // TODO: Do we need to track CONTRACTCREATEINSTANCE/CONTRACTUPDATEINSTANCE as well, due to constructors?
  console.log(`Querying since ${since}...`);
  const response = await axios.get(`transactions?transactionTypes=CONTRACT_CALL&consensusStartInEpoch=${since}`, {
    headers: {
      'X-API-KEY': process.env.DRAGON_GLASS_ACCESS_KEY
    }
  });
  console.log('response.data', response.data)
  return response.data.data;
}

async function main() {
  let since = initTimestamp;
  while (true) {
    const txs = await getTxs(since);
    if (txs && txs.length > 0) {
      since = new Date(txs[0].consensusTime).valueOf() + 1;
      console.log('txs', txs);
    } else {
      console.log(`No results`);
    }
    await sleep(10000);
  }
}

main().catch(err => console.error(err.message));