import React, { useEffect, useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1">{label || "Status"}</p>
        <p className="text-sm font-semibold text-white">
          {payload[0].name}: <span className="text-primary ml-2">₹{payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ChartAreaInteractive() {
  const { stats, fetchStats } = useAdmin();
  const [ordersByStatusData, setOrdersByStatusData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [chartType, setChartType] = useState("monthly");

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (stats?.ordersByStatus) {
      setOrdersByStatusData(
        stats.ordersByStatus.map((o) => ({
          name: o._id,
          value: o.count,
        }))
      );
    }

    if (chartType === "monthly" && stats?.monthlySales) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      setSalesData(
        stats.monthlySales.map((m) => ({
          month: monthNames[m._id - 1] || `Month ${m._id}`,
          sales: m.total
        }))
      );
    } else if (chartType === "weekly" && stats?.weeklySales) {
      setSalesData(
        stats.weeklySales.map((w) => ({
          week: `Week ${w._id}`,
          sales: w.total
        }))
      );
    }
  }, [stats, chartType]);

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 min-h-[400px]">
        {/* Trajectory Area Chart */}
        <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Revenue Trajectory</h3>
            <select
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-semibold uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="monthly">Monthly Cycle</option>
              <option value="weekly">Weekly Pulse</option>
            </select>
          </div>

          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey={chartType === "monthly" ? "month" : "week"}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fulfillment Distribution */}
        <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 flex flex-col">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-10">Fulfillment Distribution</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ordersByStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  stroke="none"
                >
                  {ordersByStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={8} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-6">
            {ordersByStatusData.slice(0, 3).map((entry, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[9px] font-semibold uppercase text-slate-400 truncate">{entry.name}</span>
                </div>
                <p className="text-xs font-semibold text-slate-900">{entry.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}





