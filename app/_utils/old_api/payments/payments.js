import { Mongo } from "meteor/mongo";
//import { OrdersCollection } from "../orders/orders";

export const PaymentsCollection = new Mongo.Collection("payments");

// PaymentsCollection.after.insert(function (userId, doc) {

//   const matchingOrder = OrdersCollection.findOne({
//     priceWithRef: doc.amount,
//   });

//   PaymentsCollection.update(
//     { _id: doc._id },
//     { $set: { paidBy: matchingOrder } }
//   );
// });
