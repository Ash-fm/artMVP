import { TransactionsCollection } from "/imports/api/transactions/transactions";
import { PaymentsCollection } from "/imports/api/payments/payments";
import { OrdersCollection } from "/imports/api/orders/orders";

const insertTx = async (job) => {
  TransactionsCollection.insert(job.data);

  if (
    job.data.linkAsAccount ===
    "nano_3ufjina1pxupts415gjh3xppx5x8ue8f534f9mnuw9958jes6smbf3xgfxag"
  ) {
    console.log(`recieving account ${job.data.linkAsAccount}`);

    console.log(`recieving amount ${job.data.amount}`);
    let receivingAmount = job.data.amount.toString();
    console.log(receivingAmount)

    const matchingOrder = OrdersCollection.findOne({
      priceWithRef: receivingAmount,
    });

    if (!matchingOrder) {
      console.log("No Matching Order");
      // return payment to sender
      return;
    }
    console.log(`Matching order ${matchingOrder.data.address}`);
    const alreadyPurchased = PaymentsCollection.findOne({
      "paidBy.data.series": matchingOrder.data.series,
      "paidBy.data.run": matchingOrder.data.run,
    });

    if (!alreadyPurchased) {
      console.log(`NOT already purchased ${alreadyPurchased}`);
      PaymentsCollection.insert({ ...job.data, paidBy: matchingOrder });
      // TransactionsCollection.update({ ...job.data, payment: true });
      return;
    } else {
      console.log(`Already purchased ${alreadyPurchased}`);
      PaymentsCollection.insert({
        ...job.data,
        paidBy: matchingOrder,
        alreadyPurchased: true,
      });
    }
  }
};

export default insertTx;

// SeriesCollection.update(
//   { _id: series._id },
//   {
//     $set: { on_pause: false, current_start_tx: job.data.txNumber },
//     $inc: { current_run: 1 },
//   }
// );
