import Bull from "bull";
import insertTx from "../processes/tx.process";

const txQueue = new Bull("tx", 
  'redis://127.0.0.1:6379'
);

txQueue.process(insertTx)

const addTx = (data) => {
  console.log(`job added ${data}`);
  txQueue.add(data, {});
};

export {addTx};
