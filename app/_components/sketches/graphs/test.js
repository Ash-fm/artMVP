import React from "react";
import { Bar, Scatter } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { currentTransactionsSelector } from "../../shared/globalState";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LogarithmicScale,
  Tooltip,
  PointElement,
  LineElement
);

const TO_NANO = 1.0 / Math.pow(10, 30);

export default function BarGraph(props) {
  const transactions = useRecoilValue(currentTransactionsSelector);
  console.log(transactions);

  if (!transactions) return null;

  return (
    <div>
      <Scatter
        data={{
          labels: transactions.map((x) => x.txNumber),
          datasets: [
            {
              label: "Transaction Value",
              data: transactions.map((x) => x.amount * TO_NANO),
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={300}
        options={{
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                borderColor: 'black',
                borderWidth: 2,
                display: false,
              },
              title: {
                display: true,
                color: 'black',
                text: 'Internal Tx Number',
              },
              ticks: {
                color: 'black',
              },
            },
            y: {
              grid: {
                borderColor: 'black',
                borderWidth: 2,
                // display: false,
              },
              title: {
                display: true,
                color: 'black',
                text: 'Transaction Value',
              },
              type: "logarithmic",
              ticks: {
                color: 'black',
                min: 0.1,
                max: 1000000,
                callback: function (value, index, values) {
                    if (value === 1000000) return "1M";
                    if (value === 100000) return "100K";
                    if (value === 10000) return "10K";
                    if (value === 1000) return "1K";
                    if (value === 100) return "100";
                    if (value === 10) return "10";
                    if (value === 1) return "1";
                    if (value === 0.1) return "0.1";
                    return null;
                }
              },
            },
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
}