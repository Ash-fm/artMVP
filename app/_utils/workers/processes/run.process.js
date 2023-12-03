import { RunsCollection } from "/imports/api/runs/runs";
import { SeriesCollection } from "/imports/api/series/series";

const updateSeriesInsertRun = (job, series) => {
  RunsCollection.insert({
    series: series.name,
    startTx: job.data.txNumber,
    txCount: 1,
    lastTx: job.data.txNumber,
    time: Date.now(),
    run: series.current_run + 1,
    finishedAt: 0,
  });
  SeriesCollection.update(
    { _id: series._id },
    {
      $set: { on_pause: false, current_start_tx: job.data.txNumber },
      $inc: { current_run: 1 },
    }
  );
}; 

const updateRuns = async (job) => { // async job??? 
  const currentSeries = SeriesCollection.find(
    { finished_series: false },
    { sort: { $natural: -1 } }
  ).fetch();

  currentSeries.forEach((series) => {
    if (series.start.txNumber && job.data.txNumber < series.start.txNumber) {
      return;
    }

    if (series.start.time && Date.now() < series.start.time) {
      return;
    }

    const lastRun = RunsCollection.findOne(
      { series: series.name },
      { sort: { $natural: -1 } }
    );

    if (!lastRun) {
      updateSeriesInsertRun(job, series);
      return;
    }

    if (lastRun.finishedAt !== 0) {
      if (Date.now() - lastRun.finishedAt < series.pause_between) {
        return;
      }
      updateSeriesInsertRun(job, series);
      return;
    }

    if (
      lastRun.txCount + 1 === series.duration &&
      series.current_run === series.maximum_runs
    ) {
      RunsCollection.update(
        { _id: lastRun._id },
        {
          $set: { lastTx: job.data.txNumber, finishedAt: Date.now() },
          $inc: { txCount: 1 },
        }
      );
      SeriesCollection.update(
        { _id: series._id },
        {
          $set: { on_pause: true, finished_series: true },
        }
      );
      return;
    }

    if (lastRun.txCount + 1 === series.duration) {
      RunsCollection.update(
        { _id: lastRun._id },
        {
          $set: { lastTx: job.data.txNumber, finishedAt: Date.now() },
          $inc: { txCount: 1 },
        }
      );
      SeriesCollection.update(
        { _id: series._id },
        {
          $set: { on_pause: true },
        }
      );
      return;
    }

    RunsCollection.update(
      { _id: lastRun._id },
      { $set: { lastTx: job.data.txNumber }, $inc: { txCount: 1 } }
    );
  });
};

export default updateRuns;
