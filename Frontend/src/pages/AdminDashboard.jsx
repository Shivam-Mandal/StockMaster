// src/pages/SuperAdminDashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import ReactApexChart from "react-apexcharts";

export default function AdminDashboard() {
  const stockConsumptionData = [
    { name: "Jan", stock: 400 },
    { name: "Feb", stock: 300 },
    { name: "Mar", stock: 200 },
    { name: "Apr", stock: 278 },
    { name: "May", stock: 189 },
    { name: "Jun", stock: 239 },
    { name: "Jul", stock: 349 },
  ];

  const userData = [
    { name: "Operators", value: 10 },
    { name: "Admins", value: 4 },
    { name: "Staff", value: 7 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const candlestickSeries = [
    {
      data: [
        {
          x: new Date(2025, 7, 1),
          y: [51.98, 56.29, 51.59, 53.85],
        },
        {
          x: new Date(2025, 7, 2),
          y: [53.66, 54.99, 51.35, 52.95],
        },
        {
          x: new Date(2025, 7, 3),
          y: [52.76, 57.35, 52.15, 55.48],
        },
        {
          x: new Date(2025, 7, 4),
          y: [55.65, 56.37, 54.38, 55.16],
        },
      ],
    },
  ];

  const candlestickOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      toolbar: { show: false },
    },
    title: {
      text: "Stock Prices",
      align: "left",
      style: { fontSize: "18px", fontWeight: 600, color: "#333" },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: { enabled: true },
    },
    grid: { borderColor: "#e5e7eb" },
  };

  return (
    <div className="p-3 min-h-screen font-sans">
      {/* Top title and tab navigation */}
      <div className="mb-6">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">Data Lake</h1> */}
        <div className="flex space-x-6 border-b border-gray-200">
          {["Dashboard", "Auto Mapping", "Data Connections", "Settings"].map(
            (tab, index) => (
              <button
                key={index}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  tab === "Dashboard"
                    ? " text-[#1AB2E6]"
                    : "border-transparent text-gray-500 hover:text-[#1AB2E6] hover:border-[#1AB2E6]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart 1: Stock Consumption */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Stock Consumption Over Time
          </h3>
          <LineChart width={400} height={250} data={stockConsumptionData}>
            <Line
              type="monotone"
              dataKey="stock"
              stroke="#6366f1"
              strokeWidth={3}
            />
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        {/* Chart 2: User Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            User Distribution
          </h3>
          <PieChart width={350} height={250}>
            <Pie
              data={userData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {userData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </div>

        {/* Chart 3: Sales Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Sales Bar Chart
          </h3>
          <BarChart width={400} height={250} data={stockConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#82ca9d" barSize={30} />
          </BarChart>
        </div>

        {/* Chart 4: Revenue Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Revenue Bar Chart
          </h3>
          <BarChart width={400} height={250} data={stockConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#ffc658" barSize={30} />
          </BarChart>
        </div>

        {/* Chart 5: Inventory Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Inventory Pie Chart
          </h3>
          <PieChart width={350} height={250}>
            <Pie
              data={userData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {userData.map((entry, index) => (
                <Cell
                  key={`cell2-${index}`}
                  fill={COLORS[(index + 1) % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </div>

        {/* Chart 6: Candlestick */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Candlestick Chart
          </h3>
          <ReactApexChart
            options={candlestickOptions}
            series={candlestickSeries}
            type="candlestick"
            height={250}
            width={400}
          />
        </div>
      </div>
    </div>
  );
}
