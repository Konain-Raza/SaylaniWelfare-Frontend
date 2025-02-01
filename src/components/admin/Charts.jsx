import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import useStore from "../../Store/store";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const ChartsDashboard = () => {
  const { beneficiaryStats, userStats } = useStore();

  const beneficiaryChartData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        label: "Beneficiary Status",
        data: [
          beneficiaryStats.completed,
          beneficiaryStats.pending,
          beneficiaryStats.progress,
        ],
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl">
      <div className="w-full max-h-80 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          Beneficiary Status
        </h2>
        <div className="h-64 w-full flex items-center justify-center">
          <Doughnut data={beneficiaryChartData} />
        </div>
      </div>

      <div className="w-full max-h-80 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          User Roles Distribution
        </h2>
        <div className="h-64">
          <Bar data={userChartData} />
        </div>
      </div>
    </div>
  );
};

export default ChartsDashboard;
