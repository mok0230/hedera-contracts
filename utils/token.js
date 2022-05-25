const { TokenId } = require("@hashgraph/sdk");

const TOKEN_ID='0.0.34913731'

function getTokenConfig() {
  const tokenId = TokenId.fromString(TOKEN_ID);
  return {
    tokenId,
    evmAddress: tokenId.toSolidityAddress()
  }
}

module.exports = { getTokenConfig }