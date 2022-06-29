const {
    PrivateKey,
    Hbar,
    AccountId,
    TransferTransaction,
    ScheduleCreateTransaction
} =require("@hashgraph/sdk");

require("dotenv").config({ path: '../.env' })
const { getOperatorConfig } = require('../utils/operator');

const { client } = getOperatorConfig();
async function main() {
    if (process.env.OPERATOR_ACCOUNT_ID == null || process.env.OPERATOR_PRIVATE_KEY == null) {
        throw new Error(
            "Environment variables OPERATOR_ACCOUNT_ID, and OPERATOR_PRIVATE_KEY are required."
        );
    }

    console.log('"Creating" a new account');

    const privateKey = PrivateKey.generateECDSA();
    const publicKey = privateKey.publicKey;

    const aliasAccountId = publicKey.toAccountId(0, 0);

    console.log(`New account ID: ${aliasAccountId.toString()}`);
    console.log(`Just the aliasKey: ${aliasAccountId.aliasKey.toString()}`);

    console.log('privateKey.toStringRaw()', privateKey.toStringRaw());
    console.log('publicKey.toStringRaw()', publicKey.toStringRaw());

    const operatorAccountId = new AccountId(0, 0, 34343207);
        
    console.log("Transferring some Hbar to the new account");
    const transaction = new TransferTransaction()
        .addHbarTransfer(operatorAccountId, new Hbar(1).negated())
        .addHbarTransfer(aliasAccountId, new Hbar(1))

    const scheduleTransaction = await new ScheduleCreateTransaction()
        .setScheduledTransaction(transaction)
        .execute(client);

    const receipt = await scheduleTransaction.getReceipt(client);

    console.log('receipt', receipt)

    console.log('done')
}

main();
