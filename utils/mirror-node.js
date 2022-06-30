function getApi() {
    const baseURL = 'https://testnet.mirrornode.hedera.com/api/v1/';
    return require('axios').default.create({ baseURL });
}

module.exports = { getApi };