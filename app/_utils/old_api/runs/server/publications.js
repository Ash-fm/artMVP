import { Meteor } from 'meteor/meteor';
import { RunsCollection } from '../runs';

Meteor.publish('runs', function publishRuns() {
  return RunsCollection.find({});
});