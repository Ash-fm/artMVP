import { check } from "meteor/check";
import { OrdersCollection } from "./orders";
import { SeriesCollection } from "../series/series";
import { RunsCollection } from "../runs/runs";
import { PaymentsCollection } from "../payments/payments";

// map paintings that have both started and not fininshed into array
// make sure run of painting is not in future && run has not already been purchased

Meteor.methods({

  
  "orders.insert"(data) {

    console.log("Insert Started")

    const allowedSeriesObjectArray = SeriesCollection.find(
      { current_run: { $gte: 1 }, finished_series: false },
      { fields: { name: 1, _id: 0 } }
    ).fetch();

    console.log(allowedSeriesObjectArray);
    
    const currentRun = RunsCollection.findOne(
      { series: data.series },
      { sort: { $natural: -1 } }
    );
    
    const alreadyPurchased = PaymentsCollection.findOne({
      "paidBy.data.series": data.series,
      "paidBy.data.run": data.run,
    });


    check(data, {
      series: String,
      run: Number,
      name: String,
      address: String,
      district: Match.Maybe(String),
      city_town: String,
      reigon: Match.Maybe(String),
      postcode: Match.Maybe(String),
      country: String,
    });

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    };

    let isValidSeriesName = allowedSeriesObjectArray.some( obj => obj.name === data.series);

    if (isValidSeriesName == false) {
      throw new Meteor.Error("Series Does Not Exist.");
    };

    if (alreadyPurchased) {
      throw new Meteor.Error("Already Purchased.");
    }

    if (data.run < 1 || data.run > currentRun.run) {
      throw new Meteor.Error("Run doesnt exist yet.");
    }


    OrdersCollection.insert(
      {
        data,
        createdAt: new Date(),
        userId: this.userId,
      },
      (error, result) => {
        if (error) {
        console.log(`error: ${error}`);
        }
      }
    );
  },
});
