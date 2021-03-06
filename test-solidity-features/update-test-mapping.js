// console.clear();
require("dotenv").config();
const {
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
} = require("@hashgraph/sdk");
const { getOperatorConfig } = require('../utils/operator');

const CONTRACT_ID = '0.0.34921232';
const CONTRACT_ADDRESS = '0x000000000000000000000000000000000214db10';


const TEST_STR="Key2";
const TEST_NUM = Math.floor(Math.random() * 1000000);

const { client } = getOperatorConfig();

async function main() {
  // Query the contract to check changes in state variable
  const contractQueryTx = new ContractCallQuery()
    .setContractId(CONTRACT_ID)
    .setGas(100000)
    .setFunction(
      "getTestMapping",
      new ContractFunctionParameters().addString(TEST_STR)
    );
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getUint256(0);

  console.log(
    `Fetched value for ${TEST_STR}: ${contractQueryResult}\n`
  );

  console.log(
    `Updating value for ${TEST_STR} to: ${TEST_NUM}\n`
  );

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

  // Query the contract to check changes in state variable
  const contractQueryTx1 = new ContractCallQuery()
    .setContractId(CONTRACT_ID)
    .setGas(100000)
    .setFunction(
      "getTestMapping",
      new ContractFunctionParameters().addString(TEST_STR)
    );
  const contractQuerySubmit1 = await contractQueryTx1.execute(client);
  const contractQueryResult1 = contractQuerySubmit1.getUint256(0);
  console.log(
    `Fetched value for ${TEST_STR}: ${contractQueryResult1}\n`
  );
}
main();
