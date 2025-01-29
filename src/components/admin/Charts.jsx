import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import useStore from "../../Store/store";

// Register only the components needed
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartsDashboard = () => {
  const {beneficiaryStats, userStats} = useStore();
  console.log(beneficiaryStats)
  const beneficiaryChartData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        label: "Beneficiary Status",
        data: [beneficiaryStats.completed, beneficiaryStats.pending, beneficiaryStats.progress],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
        hoverBackgroundColor: ["#45A049", "#FFB300", "#1976D2"],
      },
    ],
  };

  const userChartData = {
    labels: ["Admin", "Receptionist", "Staff"],
    datasets: [
      {
        label: "User Roles",
        data: [userStats.admin, userStats.receptionist, userStats.staff],
        backgroundColor: ["#2196F3", "#3F51B5", "#9C27B0"],
        hoverBackgroundColor: ["#1976D2", "#303F9F", "#7B1FA2"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
<div className="grid grid-cols-2 gap-8">
  <div className="w-full max-h-80 bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
      Beneficiary Status
    </h2>
    <div className="h-64 w-ful flex items-center justify-center">
      <Doughnut data={beneficiaryChartData} options={chartOptions} />
    </div>
  </div>

  <div className="w-full max-h-80 bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
      User Roles Distribution
    </h2>
    <div className="h-64">
      <Bar data={userChartData} options={barChartOptions} />
    </div>
  </div>
</div>

  );
};

export default ChartsDashboard;
