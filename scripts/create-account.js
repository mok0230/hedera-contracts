const { PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar } = require("@hashgraph/sdk");
const { getOperatorConfig } = require('../utils/operator');

const { client, operatorId, operatorPublicKey, operatorPrivateKey } = getOperatorConfig();

async function main() {
    console.log('creating new account');

    console.log('\n***************************\n');

    console.log('operatorId.toString()', operatorId.toString());
    console.log('operatorPublicKey', operatorPublicKey.toString());
    console.log('operatorPrivateKey', operatorPrivateKey.toString());

    const newAccountPrivateKey = await PrivateKey.generateED25519(); 
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    const newAccount = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(1000))
        .execute(client);

    const receipt = await newAccount.getReceipt(client);
    const newAccountId = receipt.accountId;

    console.log('\n***************************\n');

    console.log('newAccountId', newAccountId.toString());
    console.log('newAccountPrivateKey', newAccountPrivateKey.toString());
    console.log('newAccountPublicKey', newAccountPublicKey.toString());

    console.log('\n***************************\n');

    // Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(client);

    console.log('accountBalance (in tinybar)', accountBalance.hbars.toTinybars().toString());
}

main();
