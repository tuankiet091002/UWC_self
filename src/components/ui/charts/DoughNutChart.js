
import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ dataInput, size}) => {
  const data = {
    datasets: [
      {
        labels: "This will be hide",
        data: dataInput,
        backgroundColor: ["#DDFFBB", "#C7E9B0", "#B3C99C"],
      },
    ],
    labels: [],
   
  };

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
