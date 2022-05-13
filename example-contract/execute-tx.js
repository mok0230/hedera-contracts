// console.clear();
require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  FileCreateTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
  Hbar
} = require("@hashgraph/sdk");
const fs = require("fs");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const CONTRACT_ID = '0.0.34730039';
const CONTRACT_ADDRESS = '000000000000000000000000000000000211f037'; // 0x?

async function main() {
  // Query the contract to check changes in state variable
  const contractQueryTx = new ContractCallQuery()
    .setContractId(CONTRACT_ID)
    .setGas(100000)
    .setFunction(
      "getMobileNumber",
      new ContractFunctionParameters().addString("Alice")
    );
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getUint256(0);
  console.log(
    `- Here's the phone number you asked for: ${contractQueryResult} \n`
  );

  // Call contract function to update the state variable
  const contractExecuteTx = new ContractExecuteTransaction()
    .setContractId(CONTRACT_ID)
    .setGas(100000)
    .setFunction(
      "setMobileNumber",
      new ContractFunctionParameters().addString("Bob").addUint256(222222)
    )
  const contractExecuteSubmit = await contractExecuteTx.execute(client);
  const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
  console.log(
    `- Contract function call status: ${contractExecuteRx.status} \n`
  );

  // Query the contract to check changes in state variable
  const contractQueryTx1 = new ContractCallQuery()
    .setContractId(CONTRACT_ID)
    .setGas(100000)
    .setFunction(
      "getMobileNumber",
      new ContractFunctionParameters().addString("Bob")
    );
  const contractQuerySubmit1 = await contractQueryTx1.execute(client);
  const contractQueryResult1 = contractQuerySubmit1.getUint256(0);
  console.log(
    `- Here's the phone number you asked for: ${contractQueryResult1} \n`
  );
}
main();