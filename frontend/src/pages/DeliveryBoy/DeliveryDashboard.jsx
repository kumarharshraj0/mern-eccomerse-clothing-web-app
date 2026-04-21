import React, { useEffect, useState } from "react";
import { useDelivery } from "@/context/DeliveryBoyContext";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Truck,
  PackageCheck,
  Clock,
  Activity,
  Zap,
  ChevronRight,
  Target,
  BarChart3
} from "lucide-react";
import DeliveryBoySidebar from "@/components/DeliveryBoySidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const COLORS = ["#6366f1", "#e2e8f0"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1">{label || "Metrics"}</p>
        <p className="text-sm font-semibold text-white">
          {payload[0].name}: <span className="text-primary ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const DeliveryDashboard = () => {
  const { fetchStats } = useDelivery();
  const [stats, setStats] = useState(null);
  const [range, setRange] = useState("monthly");

  useEffect(() => {
    const loadStats = async () => {
      const res = await fetchStats();
      if (res?.stats) {
        setStats(res.stats);
      }
    };
    loadStats();
  }, [fetchStats]);

  if (!stats) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center animate-pulse">
        <div className="w-12 h-12 bg-slate-200 rounded-2xl mb-4" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">Synchronizing Delivery Analytics...</p>
      </div>
    </div>
  );

  const selected = stats[range];
  const pieData = [
    { name: "Completed", value: selected?.completed || 0 },
    { name: "Pending", value: (selected?.total || 0) - (selected?.completed || 0) },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <div className="fixed inset-y-0 z-50">
        <DeliveryBoySidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-0 md:ml-64 p-8 md:p-12 space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Activity size={24} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Delivery Status: Active</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">Performance Overview</h1>
            <p className="text-slate-500 font-medium font-serif text-lg">Fleet performance metrics & fulfillment velocity</p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-white border border-slate-200 rounded-2xl px-6 h-14 text-[10px] font-semibold uppercase tracking-widest focus:ring-4 focus:ring-primary/5 transition-all outline-none shadow-sm cursor-pointer"
            >
              <option value="today">Daily Pulse</option>
              <option value="weekly">Weekly Pulse</option>
              <option value="monthly">Monthly Cycle</option>
            </select>
          </div>
        </header>

        {/* Stats Pulse */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Assigned Duties", val: selected?.total || 0, icon: Target, color: "text-slate-900", bg: "bg-white" },
            { label: "Finalized", val: selected?.completed || 0, icon: PackageCheck, color: "text-emerald-600", bg: "bg-white" },
            { label: "In Pipeline", val: (selected?.total || 0) - (selected?.completed || 0), icon: Clock, color: "text-indigo-600", bg: "bg-white" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${s.bg} p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <s.icon size={20} />
                </div>
                <Badge variant="outline" className="text-[8px] font-semibold uppercase tracking-widest border-slate-200">Real-time</Badge>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h4 className={`text-4xl font-semibold tracking-tighter ${s.color}`}>{s.val}</h4>
            </motion.div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-12">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Duty Distribution</h3>
              <BarChart3 size={16} className="text-slate-200" />
            </div>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} cornerRadius={8} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
              {pieData.map((d, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-primary mb-6">
                <Zap size={20} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Fleet Prime Directives</span>
              </div>
              <h3 className="text-2xl font-semibold text-white uppercase tracking-tighter mb-4">Execute with Precision</h3>
              <p className="text-slate-400 font-medium font-serif text-lg leading-relaxed">
                Your performance in the current cycle is exceeding baseline parameters. Maintain delivery velocity for bonus eligibility.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                <span>Completion Rate</span>
                <span>{selected?.total > 0 ? ((selected.completed / selected.total) * 100).toFixed(1) : 0}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selected?.total > 0 ? (selected.completed / selected.total) * 100 : 0}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                />
              </div>
              <Button variant="ghost" className="w-full h-14 rounded-2xl text-white font-semibold uppercase tracking-widest text-[10px] border border-white/10 hover:bg-white/5 gap-2 group mt-4">
                View Detailed Logs <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;






