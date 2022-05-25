const { getOperatorConfig, getAltOperatorConfig } = require('../utils/operator');
const {
  TransferTransaction,
  TokenId
} = require("@hashgraph/sdk");

const TOKEN_ID='0.0.34912742'
const TOKEN_EVM_ADDRESS='0x000000000000000000000000000000000214b9e6'

const { operatorId, operatorPublicKey, operatorPrivateKey, client } = getOperatorConfig();
const { altOperatorId } = getAltOperatorConfig();
const tokenId = TokenId.fromString(TOKEN_ID);

async function main() {
  const transferValue = 10
  console.log(`transferring ${transferValue} tokens from ${operatorId} to ${altOperatorId}`);

  //Create the transfer transaction
  const transaction = await new TransferTransaction()
  .addTokenTransfer(tokenId, operatorId, -1 * transferValue)
  .addTokenTransfer(tokenId, altOperatorId, transferValue)
  .freezeWith(client);

  //Sign with the sender account private key
  const signTx = await transaction.sign(operatorPrivateKey);

  //Sign with the client operator private key and submit to a Hedera network
  const txResponse = await signTx.execute(client);

  //Request the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);

  // console.log('receipt', receipt);

  // Obtain the transaction consensus status
  const transactionStatus = receipt.status;

  console.log("The transaction consensus status " +transactionStatus.toString());
}

main();
