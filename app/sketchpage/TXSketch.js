
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Sketch = dynamic(() => import('react-p5').then((mod) => {
  // Importing the sound library only after react-p5 is loaded
  require('p5/lib/addons/p5.sound');
  // Returning react-p5 default export
  return mod.default;
}), {
  ssr: false, // Disable SSR for this dynamic import
});

function TransactionSketch(props) {
  const { transactions, current_run } = props;
  let run = 0;
  if (run !== current_run) {
    console.log("run !== props.current_run");
    run = current_run;
    resetVariables();
  }
}

  const resetVariables = () => {
    txNumber = 0;
    randSum = 0.02;
    xPos = 1;
    yPos = 1;
    if (p5Instance) {
      p5Instance.background(233, 226, 208);
    }
  };

  let sqrSize = 0;
  let padding = 2 * sqrSize;
  let randSum = 0.02;
  let txNumber = 0;
  let xPos = 1;
  let yPos = 1;
  let seedNo = 0;

  const sketch = (p) => {
    let p5Instance = null;

    p.setup = () => {
      const sketchWidth = window.innerWidth;
      const sketchHeight = window.innerHeight;
      p.createCanvas(sketchWidth, sketchHeight);
      sqrSize = sketchWidth / (12 + 4);
      padding = 2 * sqrSize;
      p.background(233, 226, 208);
      p.noFill();
      p.rectMode(p.CENTER);

      p5Instance = p;
    };

    p.myCustomRedrawAccordingToNewPropsHandler = () => {
      if (transactions) {
        for (txNumber; txNumber < transactions.length; txNumber++) {
          seedNo = parseInt(transactions[txNumber].txid.slice(0, 5), 16);
          // ... Rest of your rendering logic
        }
      }
    };

    p.draw = () => {};
  };

  return <Sketch setup={sketch.setup} draw={sketch.draw} />;

export default TransactionSketch;
