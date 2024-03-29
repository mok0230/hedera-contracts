require("dotenv").config({ path: `${__dirname}/../.env`});
const {
  AccountId,
  PrivateKey,
  PublicKey,
  Client,
  Hbar
} = require("@hashgraph/sdk");

function getOperatorConfig() {
  const operatorId = AccountId.fromString(process.env.OPERATOR_ACCOUNT_ID);
  const operatorPrivateKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY);

  return {
    operatorId,
    operatorPublicKey: PublicKey.fromString(process.env.OPERATOR_PUBLIC_KEY),
    operatorPrivateKey,
    client: Client.forTestnet().setOperator(operatorId, operatorPrivateKey).setDefaultMaxTransactionFee(new Hbar(10))
  }
}

function getAltOperatorConfig() {
  const altOperatorId = AccountId.fromString(process.env.ALT_OPERATOR_ACCOUNT_ID);
  const altOperatorPrivateKey = PrivateKey.fromString(process.env.ALT_OPERATOR_PRIVATE_KEY);

  return {
    altOperatorId,
    altOperatorPublicKey: altOperatorPrivateKey.publicKey,
    altOperatorPrivateKey,
    altClient: Client.forTestnet().setOperator(altOperatorId, altOperatorPrivateKey).setDefaultMaxTransactionFee(new Hbar(1))
  }
}

module.exports = { getOperatorConfig, getAltOperatorConfig };