require("dotenv").config();
const {
  ContractFunctionParameters,
  ContractExecuteTransaction,
} = require("@hashgraph/sdk");
const { getOperatorConfig } = require('../utils/operator');

const CONTRACT_ID = '0.0.38046390';
const CONTRACT_ADDRESS= '0000000000000000000000000000000002448ab6';
const CHILD_CONTRACT_ID = '0.0.34921232';
const CHILD_CONTRACT_ADDRESS = '0x000000000000000000000000000000000214db10';

const { client } = getOperatorConfig();

const TEST_STR="Key2";
const TEST_NUM = Math.floor(Math.random() * 1000000);

async function main() {
  console.log('Invoking testEvent method, which should emit event TestEvent');

  // Call contract function to update the state variable
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(CONTRACT_ID)
    .setGas(100000)
    .setFunction(
      "testEvent",
      new ContractFunctionParameters().addUint256(TEST_NUM).addString(TEST_STR)
    )
  
  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  console.log(
    `Contract function call status: ${contractExecuteRx.status} \n`
  );

  console.log(`Done`);
}
main();
