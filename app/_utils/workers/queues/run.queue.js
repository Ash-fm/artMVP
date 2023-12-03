import Bull from "bull";
import updateRuns from "../processes/run.process";

const runQueue = new Bull("run", 
  'redis://127.0.0.1:6379'
);

runQueue.process(updateRuns)

const addRun = (data) => {
    runQueue.add(data, {});
};

export {addRun};

