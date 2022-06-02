require("dotenv").config();
const {
  ContractFunctionParameters,
  ContractExecuteTransaction,
} = require("@hashgraph/sdk");
const { getTestMapping } = require("../utils/contract");
const { getOperatorConfig } = require('../utils/operator');

const CONTRACT_ID = '0.0.38046390';
const CONTRACT_ADDRESS= '0x0000000000000000000000000000000002448ab6';
const INTERNALLY_CALLED_CONTRACT_ID = '0.0.34921232';
const INTERNALLY_CALLED_CONTRACT_ADDRESS = '0x000000000000000000000000000000000214db10';

const TEST_STR="Key2";
const TEST_NUM = Math.floor(Math.random() * 1000000);

const { client } = getOperatorConfig();

async function main() {
  console.log('initial state');

  await getTestMapping(CONTRACT_ID, TEST_STR);
  await getTestMapping(INTERNALLY_CALLED_CONTRACT_ID, TEST_STR);

  console.log(`Updating value for ${TEST_STR} to: ${TEST_NUM}\n`);

  // Call contract function to update the state variable
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(CONTRACT_ID)
    .setGas(100000)
    .setFunction(
      "updateTestMapping",
      new ContractFunctionParameters().addString(TEST_STR).addUint256(TEST_NUM)
    )
  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  console.log(
    `Contract function call status: ${contractExecuteRx.status} \n`
  );

  console.log('updated state');

  await getTestMapping(CONTRACT_ID, TEST_STR);
  await getTestMapping(INTERNALLY_CALLED_CONTRACT_ID, TEST_STR);
}
main();
