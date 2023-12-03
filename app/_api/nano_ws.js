import ReconnectingWebSocket from "reconnecting-websocket";
import { addRun } from "../workers/queues/run.queue";
import { createClient } from '@supabase/supabase-js';

const WS_URL = "wss://rainstorm.city/websocket";

const supabase = createClient(
  'your-supabase-url', // replace with your Supabase URL
  'your-supabase-api-key' // replace with your Supabase API key
);

let txNumber = 1; //find most recent transaction and add 1

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

ws.addEventListener("message", async (event) => {
  try {
    let transaction = JSON.parse(event.data);
    if (transaction.topic) {
      await supabase
        .from('transactions')
        .upsert(
          {
            txid: transaction.message.hash,
            amount: transaction.message.amount,
            type: transaction.message.block.subtype,
            account: transaction.message.account,
            linkAsAccount: transaction.message.block.link_as_account,
            time: transaction.time,
            txNumber: txNumber,
          },
          { onConflict: ['txid'] }
        );

      addRun({ txNumber: txNumber });
      console.log(txNumber);
      txNumber += 1;
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

export default ws;

