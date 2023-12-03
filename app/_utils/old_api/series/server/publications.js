import { Meteor } from 'meteor/meteor';
import { SeriesCollection } from '../series';

Meteor.publish('series', function publishSeries() {
  return SeriesCollection.find({});
});