import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsGraph = ({ shipsData, bookingsData }) => {
  const formatChartData = (data, label, color) => {
    return {
      labels: data.map((item) => item.date),
      datasets: [
        {
          label,
          data: data.map((item) => item.count),
          backgroundColor: color.replace("1)", "0.6)"), // Adjust the color transparency
          borderColor: color,
          borderWidth: 1,
          hoverBackgroundColor: color.replace("1)", "0.8)"), // Hover color
          hoverBorderColor: color,
        },
      ],
    };
  };

  const formatDetailedChartData = (data) => {
    return {
      labels: data.map((item) => item.date),
      datasets: [
        {
          label: "Total Bookings",
          data: data.map((item) => item.totalBookings),
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(59, 130, 246, 0.8)",
          hoverBorderColor: "rgba(59, 130, 246, 1)",
        },
        {
          label: "Approved Bookings",
          data: data.map((item) => item.approvedBookings),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "Pending Bookings",
          data: data.map((item) => item.pendingBookings),
          backgroundColor: "rgba(255, 206, 86, 0.6)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 206, 86, 0.8)",
          hoverBorderColor: "rgba(255, 206, 86, 1)",
        },
        {
          label: "Canceled Bookings",
          data: data.map((item) => item.canceledBookings),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
          hoverBorderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Admin Statistics",
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Count",
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  return (
    <div>
      <h4>Ship Creations</h4>
      <Bar
        data={formatChartData(
          shipsData,
          "Number of Ships Created",
          "rgba(59, 130, 246, 1)"
        )}
        options={options}
      />
      <br />
      <br />
      <br />
      <br />
      <h4>Booking Details</h4>
      <Bar data={formatDetailedChartData(bookingsData)} options={options} />
    </div>
  );
};

export default StatsGraph;
