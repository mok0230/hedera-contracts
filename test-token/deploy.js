require("dotenv").config({ path: '/Users/danmckeon/Dropbox/Mac/Documents/oz/hedera/.env'});
const {
  TokenCreateTransaction,
  Hbar,
  AccountId,
  PrivateKey,
  PublicKey,
  Client
} = require("@hashgraph/sdk");

console.log('process.env', process.env)

async function main() {
  // Configure accounts and client
  const operatorId = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
  const operatorPublicKey = PublicKey.fromString(process.env.OPERATOR_PUBLIC_KEY);
  const operatorPrivateKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY);

  const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey);

  console.log('client', client)

  //Create the transaction and freeze for manual signing
  const transaction = await new TokenCreateTransaction()
      .setTokenName("Test Token")
      .setTokenSymbol("TEST")
      .setTreasuryAccountId(operatorId)
      .setInitialSupply(5000)
      .setAdminKey(operatorPublicKey)
      .setSupplyKey(operatorPublicKey)
      .setPauseKey(operatorPublicKey)
      .setFreezeKey(operatorPublicKey)
      .setWipeKey(operatorPublicKey)
      .setKycKey(operatorPublicKey)
      .setFeeScheduleKey(operatorPublicKey)
      .setMaxTransactionFee(new Hbar(30)) //Change the default max transaction fee
      .freezeWith(client);

  //Sign the transaction with the token adminKey and the token treasury account private key
  const signTx =  await (await transaction.sign(operatorPrivateKey)).sign(operatorPrivateKey);

  //Sign the transaction with the client operator private key and submit to a Hedera network
  const txResponse = await signTx.execute(client);

  //Get the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);

  //Get the token ID from the receipt
  const tokenId = receipt.tokenId;

  console.log("The new token ID is " + tokenId);
}

main();