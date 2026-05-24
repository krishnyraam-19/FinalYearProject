"use client";
import { useState,useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// const monthlyData = [
//   { month: "Jan", lost: 12, found: 8 },
//   { month: "Feb", lost: 18, found: 10 },
//   { month: "Mar", lost: 9, found: 15 },
//   { month: "Apr", lost: 22, found: 14 },
//   { month: "May", lost: 16, found: 20 },
// ];

const statusData = [
  { name: "Pending", value: 25 },
  { name: "Approved", value: 60 },
  { name: "Rejected", value: 15 },
];

export default function DashboardPage() {

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function getDashboardData() {
      const res = await fetch("/api/adminDash");
      const data = await res.json();

      setDashboardData(data);
    }

    getDashboardData();
  }, []);

  if (!dashboardData) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

  <DashboardCard
    title="Total Lost Items"
    value={dashboardData.cards.totalLost}
  />

  <DashboardCard
    title="Total Found Items"
    value={dashboardData.cards.totalFound}
  />

  <DashboardCard
    title="Pending Posts"
    value={dashboardData.cards.pendingPosts}
  />

  <DashboardCard
    title="Approved Posts"
    value={dashboardData.cards.approvedPosts}
  />

</div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Lost vs Found Items
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="lost" fill="#ef4444" />
              <Bar dataKey="found" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Post Status Summary
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={["#f59e0b", "#22c55e", "#ef4444"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string;
};

function DashboardCard({ title, value }: CardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}