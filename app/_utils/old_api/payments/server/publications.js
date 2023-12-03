import { Meteor } from 'meteor/meteor';
import { PaymentsCollection } from '../payments';

Meteor.publish('payments', function publishPayments() {
  return PaymentsCollection.find({"paidBy.userId": this.userId});
});