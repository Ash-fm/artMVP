import React, { useEffect } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TransactionsCollection } from "/imports/api/transactions/transactions";
import { RunsCollection } from "/imports/api/runs/runs";
import P5Wrapper from "react-p5-wrapper";
import styled from "styled-components";
import sketch from "./art/cubicDisarray";
import { RenderSidePanel } from "./SidePanel";

import { useRecoilValue } from "recoil";

import { artContainerSelector } from "../shared/globalState";

const SketchContainer = styled.div`
  border: 1px solid black;
  overflow: hidden;
  flex-grow: 1;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: stretch;
  height: auto;
  width: 80%;
  max-height: 70vh;
  aspect-ratio: 9/16;
  padding: 1.6rem 0.9rem;
  justify-self: end;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 20px 20px #222;
`;

export default function ArtContainer(props) {
  
  // const { currentName, currentDuration, currentRun } = useRecoilValue(artContainerSelector);
  const txLoading = useSubscribe("transactions");
  const runLoading = useSubscribe("runs");

  const thisRun = useTracker(() => {
    // console.log(currentName); 
    // const findThisRun = 0;
    const findThisRun = RunsCollection.findOne({});
    //   {
    //     series: currentName
    //   },
    //   { sort: { run: -1 } }
    // );
    console.log(findThisRun);
    return findThisRun;
  });

  console.log(thisRun);

  const transactions = useTracker(() => {
    console.log(currentRun);
    const findTransactions =
      currentRun
        ? TransactionsCollection.find(
            {
              txNumber: {
                $gte: thisRun.startTx,
                $lte: thisRun.startTx + currentDuration- 1,
              },
            },
            { sort: { txNumber: 1 } }
          ).fetch()
        : null;
    return findTransactions;
  });

  if (runLoading() || txLoading()) {
    return null;
  }

  return (
    <>
      <LeftContent>
        <SketchContainer id="sketchContainer">
          <P5Wrapper
            key={currentRun}
            sketch={sketch}
            transactions={transactions}
            current_run={currentRun}
          />
        </SketchContainer>
      </LeftContent>
      <RenderSidePanel />
    </>
  );
}

/*
Alt 2. Use a state outside of React, a very simple side-effect for the component, for the sketch to poll on.

Add to CatchingGmae component:

useEffect(() => {
  window.noLoop = false;

  return () => {
    window.noLoop = true;
  };
}, []);
Inside p.draw:

 if (window.noLoop) return p.noLoop();
☝ This works without calculations, but you might want to scope the global within your own namespace or using other state manager.
*/
