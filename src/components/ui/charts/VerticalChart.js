import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import styles from "./Bar.module.css"
const VerticalChart = ({ dataInput,size }) => {
  const data = {
    datasets: [
      {
        label: "Janitor",
        data: dataInput.value.janitor,
        backgroundColor: ["#475BE8"],
        borderRadius: 4,
      },
      {
        label: "Collector",
        data: dataInput.value.collector,
        backgroundColor: ["#CFC8FF"],
        borderRadius: 4,
      },
    ],
    labels: dataInput.month,
  };
  return (
    <div
     className={styles.bar}
    >
      <Bar data={data} />
    </div>
  );
};

export default VerticalChart;
