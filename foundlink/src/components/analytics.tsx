"use client";

import { useState, useEffect } from "react";
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
  LabelList,
  Legend,
} from "recharts";

type DashboardData = {
  cards: {
    totalLost: number;
    totalFound: number;
    pendingPosts: number;
    approvedPosts: number;
    rejectedPosts: number;
  };
  statusData: {
    name: string;
    value: number;
  }[];
  monthlyData: {
    month: string;
    lost: number;
    found: number;
  }[];
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function getDashboardData() {
      const res = await fetch("/api/adminDash");
      const data: DashboardData = await res.json();
      setDashboardData(data);
    }

    getDashboardData();
  }, []);

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-white">
        <p className="text-emerald-300">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-white">
      <h1 className="mb-7 text-3xl font-black text-emerald-400">
        Analytics Dashboard
      </h1>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-5">
        <DashboardCard title="Total Lost Items" value={dashboardData.cards.totalLost} />
        <DashboardCard title="Total Found Items" value={dashboardData.cards.totalFound} />
        <DashboardCard title="Pending Posts" value={dashboardData.cards.pendingPosts} />
        <DashboardCard title="Approved Posts" value={dashboardData.cards.approvedPosts} />
        <DashboardCard title="Rejected Posts" value={dashboardData.cards.rejectedPosts} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/80 p-5 shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-emerald-300">
            Lost vs Found Items
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.monthlyData}>
              <XAxis dataKey="month" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  borderRadius: "12px",
                  color: "#ffffff",
                }}
              />
              <Legend />

              <Bar dataKey="lost" fill="#fb7185">
                <LabelList dataKey="lost" position="top" fill="#e2e8f0" />
              </Bar>

              <Bar dataKey="found" fill="#34d399">
                <LabelList dataKey="found" position="top" fill="#e2e8f0" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/80 p-5 shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-emerald-300">
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
                {dashboardData.statusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={["#fbbf24", "#34d399", "#fb7185"][index]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  borderRadius: "12px",
                  color: "#ffffff",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: number;
};

function DashboardCard({ title, value }: CardProps) {
  return (
    <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/80 p-5 shadow-xl transition hover:-translate-y-1 hover:border-emerald-400/50">
      <p className="text-sm font-semibold text-slate-400">{title}</p>
      <h2 className="mt-2 text-3xl font-black text-emerald-400">{value}</h2>
    </div>
  );
}