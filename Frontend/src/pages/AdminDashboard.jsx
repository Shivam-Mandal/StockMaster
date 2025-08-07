// src/pages/SuperAdminDashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
import { Users, Package, TrendingUp, ShoppingCart } from "lucide-react";

export default function SuperAdminDashboard() {
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
        { x: new Date(2025, 7, 1), y: [51.98, 56.29, 51.59, 53.85] },
        { x: new Date(2025, 7, 2), y: [53.66, 54.99, 51.35, 52.95] },
        { x: new Date(2025, 7, 3), y: [52.76, 57.35, 52.15, 55.48] },
        { x: new Date(2025, 7, 4), y: [55.65, 56.37, 54.38, 55.16] },
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
    xaxis: { type: "datetime" },
    yaxis: { tooltip: { enabled: true } },
    grid: { borderColor: "#e5e7eb" },
  };

  const kpis = [
    {
      title: "Items in Stock",
      value: 2200,
      icon: <Package className="text-blue-600 h-6 w-6" />,
    },
    {
      title: "Total Users",
      value: 696,
      icon: <Users className="text-green-600 h-6 w-6" />,
    },
    {
      title: "Inventory Turnover",
      value: "$2.65M",
      icon: <TrendingUp className="text-yellow-600 h-6 w-6" />,
    },
    {
      title: "Orders this Week",
      value: 62,
      icon: <ShoppingCart className="text-red-500 h-6 w-6" />,
    },
  ];

  return (
    <div className="p-6 min-h-screen font-sans bg-gray-100">
      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="flex space-x-6 border-b border-gray-300">
          {["Dashboard", "Auto Mapping", "Data Connections", "Settings"].map(
            (tab, index) => (
              <button
                key={index}
                className={`pb-2 text-sm font-semibold border-b-2 transition-colors ${
                  tab === "Dashboard"
                    ? "text-[#1AB2E6] border-[#1AB2E6]"
                    : "border-transparent text-gray-500 hover:text-[#1AB2E6] hover:border-[#1AB2E6]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 flex items-center space-x-4"
          >
            <div className="bg-gray-100 p-3 rounded-full">{kpi.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{kpi.title}</p>
              <h2 className="text-xl font-bold text-gray-800">{kpi.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stock Line Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
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

        {/* User Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
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

        {/* Inventory Area Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Inventory Level
          </h3>
          <AreaChart width={400} height={250} data={stockConsumptionData}>
            <defs>
              <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#e5e7eb" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="stock"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorStock)"
            />
          </AreaChart>
        </div>

        {/* Candlestick Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
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
