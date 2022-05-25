const { getOperatorConfig, getAltOperatorConfig } = require('./../utils/operator');
const { getTokenConfig } = require('./../utils/token');
const {
  TokenMintTransaction
} = require("@hashgraph/sdk");

const { operatorId, operatorPublicKey, operatorPrivateKey, client } = getOperatorConfig();
const { altOperatorId, altClient } = getAltOperatorConfig();
const { tokenId } = getTokenConfig();

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

  console.log("The transaction consensus status " + transactionStatus.toString());
}

main();
