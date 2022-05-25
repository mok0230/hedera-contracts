const { getOperatorConfig } = require('./../utils/operator');
const {
  TokenInfoQuery
} = require("@hashgraph/sdk");

const TOKEN_ID='0.0.34912742'
const TOKEN_EVM_ADDRESS='0x000000000000000000000000000000000214b9e6'

const { operatorId, operatorPublicKey, operatorPrivateKey, client } = getOperatorConfig();

console.log('operatorConfig \noperatorId %s\noperatorPublicKey %s\noperatorPrivateKey %s\nclient %s', operatorId, operatorPublicKey, operatorPrivateKey, client);

async function main() {
  const query = new TokenInfoQuery().setTokenId(TOKEN_ID);

  // Sign with the client operator private key, submit the query to the network and get the token supply
  const response = await query.execute(client);

  console.log('response', response);

  console.log('response.totalSupply'+ response.totalSupply);
}

main();
