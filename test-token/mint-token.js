const { getOperatorConfig, getAltOperatorConfig } = require('../utils/operator');
const {
  TokenMintTransaction,
  TokenId
} = require("@hashgraph/sdk");

const TOKEN_ID='0.0.34912742'
const TOKEN_EVM_ADDRESS='0x000000000000000000000000000000000214b9e6'

const { operatorId, operatorPublicKey, operatorPrivateKey, client } = getOperatorConfig();
const { altOperatorId, altClient } = getAltOperatorConfig();
const tokenId = TokenId.fromString(TOKEN_ID);

async function main() {
  const transaction = await new TokenMintTransaction()
  .setTokenId(tokenId)
  .setAmount(1000)
  .freezeWith(altClient);

  //Sign with the supply private key of the token 
  const signTx = await transaction.sign(operatorPrivateKey);

  //Submit the transaction to a Hedera network    
  const txResponse = await signTx.execute(altClient);

  //Request the receipt of the transaction
  const receipt = await txResponse.getReceipt(altClient);

  console.log('receipt', receipt);
  
  //Get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log("The transaction consensus status " +transactionStatus.toString());
}

main();
