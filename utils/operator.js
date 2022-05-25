require("dotenv").config({ path: `${__dirname}/../.env`});
const {
  AccountId,
  PrivateKey,
  PublicKey,
  Client
} = require("@hashgraph/sdk");

console.log('__dirname', `${__dirname}/../.env`);

function getOperatorConfig() {
  const operatorId = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
  const operatorPrivateKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY);

  return {
    operatorId,
    operatorPublicKey: PublicKey.fromString(process.env.OPERATOR_PUBLIC_KEY),
    operatorPrivateKey,
    client: Client.forTestnet().setOperator(operatorId, operatorPrivateKey)
  }
}

module.exports = { getOperatorConfig };