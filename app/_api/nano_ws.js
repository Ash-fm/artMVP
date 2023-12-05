

import ReconnectingWebSocket from 'reconnecting-websocket';

const WS_URL = "wss://rainstorm.city/websocket";

const ws = new ReconnectingWebSocket(WS_URL, [], {
  WebSocket: WebSocket,
  connectionTimeout: 1000,
  maxRetries: 100000,
  maxReconnectionDelay: 2000,
});

ws.addEventListener("open", () => {
  console.log("nano socket open");
  const subscription = {
    action: "subscribe",
    topic: "confirmation",
  };
  ws.send(JSON.stringify(subscription));
});

ws.addEventListener("message", (event) => {
  try {
    let transaction = JSON.parse(event.data);
    // Check if the message is about a transaction confirmation and is a send subtype.
    if (transaction.topic === "confirmation" && transaction.message.block.subtype === "send") {
      console.log("Confirmed send transaction detected.");
      // Use the txid as a random seed.
      const txid = transaction.message.hash;
      addBlockToCubicDisarray(txid);
    }
  } catch (error) {
    console.error('Error handling transaction:', error);
  }
});

ws.addEventListener("close", () => {
  console.log("nano socket closed");
});

ws.addEventListener("error", (error) => {
  console.error("WebSocket error:", error);
});

function addBlockToCubicDisarray(seed) {
  // Replace with your actual logic for adding a block to the cubic disarray.
  // The following line is a placeholder for demonstration purposes.
  console.log(`Adding block to Cubic Disarray with seed: ${seed}`);
}

export default ws;