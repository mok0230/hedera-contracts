const baseURL = 'https://testnet.mirrornode.hedera.com/api/v1/';
const axios = require('axios').default.create({ baseURL });
const initTimestamp = `${parseInt(((Date.now() - 1000000) / 1000))}.000000000`;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTxs(since) {
  // TODO: Do we need to track CONTRACTCREATEINSTANCE/CONTRACTUPDATEINSTANCE as well, due to constructors?
  console.log(`Querying since ${since}...`);
  const response = await axios.get(`transactions?transactiontype=CONTRACTCALL&transactiontype=ETHEREUMTRANSACTION&timestamp=gt:${since}&order=asc&limit=100`);
  console.log('light transactions', response.data.transactions)
  console.log('tx length', response.data.transactions.length)
  return response.data.transactions;
}

async function addInfo(txs) {
  return await Promise.all(txs.map(async (tx) => {
    const response = await axios.get(`contracts/results/${tx.transaction_id}`);
    return { ...tx, ...response.data };
  }));
}

async function main() {
  let since = initTimestamp;
  while (true) {
    const txs = await getTxs(since);
    if (txs && txs.length > 0) {
      since = txs[txs.length - 1].consensus_timestamp;
      const txsWithLogs = await addInfo(txs);
      txsWithLogs.forEach((tx, i) => {
        console.log(`TX ${i + 1}`, tx);
      });
      
    } else {
      console.log(`No results`);
    }
    await sleep(10000);
  }
}

main().catch(err => console.error(err.message));