import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

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
      style={{
        width: `${size}px`,
      }}
    >
      <Bar data={data} />
    </div>
  );
};

export default VerticalChart;
