import React, { useEffect } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./art/cubicDisarray";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TransactionsCollection } from "/imports/api/transactions/transactions";
import { RunsCollection } from "/imports/api/runs/runs";

import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import {
  artContainerSelector,
  currentPaintingNumberState,
  currentTransactionsAtom,
} from "../shared/globalState";

export default function SketchWrapper() {
  const { currentName, currentDuration, currentRun } =
    useRecoilValue(artContainerSelector);
  const [transactions, setTransactions] = useRecoilState(
    currentTransactionsAtom
  );

  const paintingNumber = useRecoilValue(currentPaintingNumberState);


  const resetPaintingNumber = useResetRecoilState(currentPaintingNumberState);
  const resetTransactions = useResetRecoilState(currentTransactionsAtom);

  useEffect(() => {
    console.log("sketchwrapper useEffect");
    return () => {
      console.log("sketchwrapper useEffect cleanup");
      resetTransactions();
    };
  }, [currentName]);

  const txLoading = useSubscribe("transactions");
  const runLoading = useSubscribe("runs");

  const transactionsTracker = useTracker(() => {
    console.log("transactions tracker");
    const findThisRun = RunsCollection.findOne(
        {
          series: currentName,
        },
        { sort: { run: -1 } }
      );
    const findTransactions = findThisRun
      ? TransactionsCollection.find(
          {
            txNumber: {
              $gte: findThisRun.startTx,
              $lte: findThisRun.startTx + currentDuration - 1,
            },
          },
          { sort: { txNumber: 1 } }
        ).fetch()
      : null;
      console.log(findTransactions);
    setTransactions(findTransactions);
  },[]);

  console.log(currentRun);

  return (
    <P5Wrapper
      key={currentRun}
      sketch={sketch}
      transactions={transactions}
      current_run={currentRun}
    />
    
  );
}
