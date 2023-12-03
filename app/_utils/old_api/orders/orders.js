import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { SeriesCollection } from "../series/series";
import bigInt from "big-integer";

export const OrdersCollection = new Mongo.Collection("orders");

// map paintings that have both started and not fininshed into array
// make sure run of painting is not in future && run has not already been purchased

// function () {
//   const series = this.siblingField("series");
//   console.log(`schema input series.value: ${series.value}`); // returns correct value
//   const current_run = SeriesCollection.findOne(
//     { series: series.value },
//     { fields: { current_run: 1, _id: 0 } }
//   );
//   console.log(`schema input current_run: ${current_run.current_run}`); // returns undefined
//   return current_run.current_run;
// }

// const allowedSeriesObjectArray = SeriesCollection.find(
//   { current_run: { $gte: 1 }, finished_series: false },
//   { fields: { name: 1, _id: 0 } }
// ).fetch();
// const allowedSeriesValues = () => {
//   allowedSeriesObjectArray.map(Object.values);
// };

// allowedValues: allowedSeriesValues(),

const OrdersSchema = new SimpleSchema({
  data: { type: Object },
  "data.series": {
    type: String,
    max: 100,
  },
  "data.run": { type: Number, min: 1, max: 1000000 },
  "data.name": { type: String, max: 100 },
  "data.address": { type: String, max: 200 },
  "data.district": { type: String, optional: true, max: 100 },
  "data.city_town": { type: String, max: 100 },
  "data.reigon": { type: String, optional: true, max: 100 },
  "data.postcode": { type: String, optional: true, max: 20 },
  "data.country": { type: String, max: 3 },
  createdAt: { type: Date },
  userId: { type: String },
  ref: { type: String, optional: true },
  priceWithRef: { type: String, optional: true },
  qrLink: { type: String, optional: true },
});

OrdersCollection.attachSchema(OrdersSchema);

function zeroPad(n, w) {
  while (n.toString().length < w) n = "0" + n;
  return n;
}

function toNumbers(s) {
  var nums = "";
  for (var i = 0; i < s.length; i++) {
    nums += zeroPad(s.charCodeAt(i), 3);
  }
  return nums;
}

OrdersCollection.before.insert(function (userId, doc) {
  console.log("orderinsert");
  // OrdersCollection.remove({ userId });
  const idSlice = doc._id.slice(0, 6);
  doc.ref = toNumbers(idSlice);
  console.log("series: " + doc.data.series);
  const painting = SeriesCollection.findOne({ name: doc.data.series });
  const priceWithRef = bigInt(painting.price).plus(doc.ref).toString();
  doc.priceWithRef = priceWithRef;
  doc.qrLink =
    "nano:nano_3ufjina1pxupts415gjh3xppx5x8ue8f534f9mnuw9958jes6smbf3xgfxag?amount=" +
    priceWithRef;
});
