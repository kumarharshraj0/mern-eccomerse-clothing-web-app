import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Target,
  Clock,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import ChartAreaInteractive from "@/components/Admin/ChartAreaInteractive";
import DataTable from "@/components/Admin/DataTable";

export default function Dashboard() {
  const { stats, products, fetchStats, fetchProducts } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchProducts();
  }, [fetchStats, fetchProducts]);

  const statCards = [
    { label: "Total Revenue", value: `₹${stats?.totalSales?.toLocaleString() || 0}`, icon: TrendingUp, color: "primary", trend: "+12.5%", isPositive: true, path: "/admin/orders" },
    { label: "Orders Count", value: stats?.ordersCount || 0, icon: ShoppingBag, color: "orange", trend: "+8.2%", isPositive: true, path: "/admin/orders" },
    { label: "Active Products", value: stats?.productsCount || 0, icon: Package, color: "emerald", trend: "-2.4%", isPositive: false, path: "/admin/products" },
    { label: "Team Strength", value: stats?.deliveryBoyCount || 0, icon: Users, color: "indigo", trend: "+4", isPositive: true, path: "/admin/delivery-boys" },
  ];

  return (
    <div className="space-y-12">
      {/* Dashboard Intelligence Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Strategic Overview</h1>
          <p className="text-slate-500 font-medium font-serif italic text-lg">System-wide intelligence and trajectory</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm">
          <Clock size={14} className="text-primary" />
          Real-time Update: <span className="text-slate-900 ml-1">Live Now</span>
        </div>
      </div>

      {/* 📊 Intelligence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <Link
            key={card.label}
            to={card.path}
            className="block h-full no-underline"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden h-full"
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${card.color}-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`} />

              <div className="flex justify-between items-start mb-6 relative">
                <div className={`w-14 h-14 bg-${card.color}-500/10 rounded-2xl flex items-center justify-center text-${card.color}-600 shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-300`}>
                  <card.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider ${card.isPositive ? "text-emerald-500" : "text-rose-500"}`}>
                  {card.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {card.trend}
                </div>
              </div>

              <div className="space-y-1 relative">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">{card.label}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{card.value}</h3>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between relative">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Analytics Insight</span>
                <ChevronRight size={14} className="text-slate-200 group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 📈 Transactional Trajectory */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                <Target size={20} />
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Fulfillment Velocity</h2>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-slate-100" />
            </div>
          </div>
          <div className="h-[400px]">
            <ChartAreaInteractive data={stats?.ordersByStatus} />
          </div>
        </motion.div>

        {/* 📦 High-Performance Inventory */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600">
              <CreditCard size={20} />
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">Asset Control</h2>
          </div>

          <div className="flex-1 overflow-hidden">
            <DataTable data={products?.slice(0, 5)} />
          </div>

          <Link
            to="/admin/products"
            className="w-full mt-8 py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all text-center block no-underline"
          >
            Enter Full Asset Registry
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

