const { TransferTransaction, ScheduleCreateTransaction, AccountCreateTransaction, AccountBalanceQuery, Hbar, PublicKey } = require("@hashgraph/sdk");
const { getOperatorConfig } = require('../utils/operator');

const { client, operatorId, operatorPublicKey, operatorPrivateKey } = getOperatorConfig();

const RECIPIENT_ACCOUNT_ID = '0.0.46806274'

async function main() {
    console.log('sending funds');

    console.log('\n***************************\n');

    console.log('operatorId.toString()', operatorId.toString());
    console.log('operatorPublicKey', operatorPublicKey.toString());
    console.log('operatorPrivateKey', operatorPrivateKey.toString());

    const transaction = new TransferTransaction()
     .addHbarTransfer(operatorId, Hbar.fromTinybars(-100000))
     .addHbarTransfer(RECIPIENT_ACCOUNT_ID, Hbar.fromTinybars(100000));

     const scheduleTransaction = await new ScheduleCreateTransaction()
     .setScheduledTransaction(transaction)
     .execute(client);

    //Get the receipt of the transaction
    const receipt = await scheduleTransaction.getReceipt(client);
        
    //Get the schedule ID
    const scheduleId = receipt.scheduleId;
    console.log("The schedule ID is " +scheduleId);

    //Get the scheduled transaction ID
    const scheduledTxId = receipt.scheduledTransactionId;
    console.log("The scheduled transaction ID is " +scheduledTxId)
}

main();
