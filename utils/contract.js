require("dotenv").config();
const { getOperatorConfig } = require('../utils/operator');
const {
    ContractFunctionParameters,
    ContractCallQuery,
} = require("@hashgraph/sdk");

const { client } = getOperatorConfig();

async function getTestMapping(contractId, str) {
    const contractQueryTx = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(100000)
    .setFunction(
      "getTestMapping",
      new ContractFunctionParameters().addString(str)
    );
  
    const contractQuerySubmit = await contractQueryTx.execute(client);
    const contractQueryResult = contractQuerySubmit.getUint256(0);
    console.log(
      `Fetched value for ${str} in ${contractId}: ${contractQueryResult}\n`
    );
  
    return contractQueryResult;
  }

  module.exports = { getTestMapping };