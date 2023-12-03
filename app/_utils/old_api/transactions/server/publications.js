import { Meteor } from 'meteor/meteor';
import { TransactionsCollection } from '../transactions';

Meteor.publish('transactions', function publishTransactions() {
  return TransactionsCollection.find({});
});