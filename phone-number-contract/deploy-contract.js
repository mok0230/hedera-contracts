const {
  FileCreateTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters,
  ContractCallQuery,
  Hbar
} = require("@hashgraph/sdk");
const { getOperatorConfig } = require('./../utils/operator');
const fs = require('fs');

const { operatorPrivateKey, client } = getOperatorConfig();

// Configure accounts and client

async function main() {
  // Import the compiled contract bytecode
  const contractBytecode = fs.readFileSync(
    "LookupContract_sol_LookupContract.bin"
  );
  // Create a file on Hedera and store the bytecode
  const fileCreateTx = new FileCreateTransaction()
    .setContents(contractBytecode)
    .setKeys([operatorPrivateKey])
    .setMaxTransactionFee(new Hbar(0.9))
    .freezeWith(client);
  const fileCreateSign = await fileCreateTx.sign(operatorPrivateKey);
  const fileCreateSubmit = await fileCreateSign.execute(client);
  const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  const bytecodeFileId = fileCreateRx.fileId;
  console.log(`- The bytecode file ID is: ${bytecodeFileId} \n`);

  // Instantiate the smart contract
  const contractInstantiateTx = new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId)
    .setGas(100000)
    .setConstructorParameters(
      new ContractFunctionParameters().addString("Alice").addUint256(111111)
    );
  const contractInstantiateSubmit = await contractInstantiateTx.execute(client);

  console.log('contractInstantiateSubmit', contractInstantiateSubmit);

  const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(
    client
  );
    console.log('contractInstantiateRx', contractInstantiateRx)

  const contractId = contractInstantiateRx.contractId;
  const contractAddress = contractId.toSolidityAddress();
  console.log(`- The smart contract ID is: ${contractId} \n`);
  console.log(`- Smart contract ID in Solidity format: ${contractAddress} \n`);

  // Query the contract to check changes in state variable
  const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(100000)
    .setFunction(
      "getMobileNumber",
      new ContractFunctionParameters().addString("Alice")
    )
  const contractQuerySubmit = await contractQueryTx.execute(client);
  const contractQueryResult = contractQuerySubmit.getUint256(0);
  console.log(
    `- Here's the phone number you asked for: ${contractQueryResult} \n`
  );
}
main();
