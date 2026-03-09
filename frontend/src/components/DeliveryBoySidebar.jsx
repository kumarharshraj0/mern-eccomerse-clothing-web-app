import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  Package,
  LogOut,
  ChevronLeft,
  Settings,
  User,
  Zap
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/delivery/dashboard" },
  { label: "Fleet Duties", icon: Package, path: "/delivery/delivery-boy" },
];

export default function DeliveryBoySidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || !user?.roles?.includes("deliveryBoy")) return null;

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-400 border-r border-slate-900 overflow-hidden relative">
      {/* Glossy Overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      {/* Brand Header */}
      <div className="p-8 pb-12 flex items-center gap-4">
        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 shrink-0">
          <Truck size={20} />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-black tracking-tighter text-white leading-none">FLEET <span className="text-primary italic font-serif">Command</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-1">v2.0 LOGISTICS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-hide">
        <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-700 mb-4">Operational Links</p>
        {menuItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={label}
              to={path}
              className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative ${isActive
                ? "text-white bg-slate-900 shadow-sm"
                : "hover:bg-slate-900/50 hover:text-slate-200"
                }`}
            >
              <div className={`transition-colors duration-300 ${isActive ? "text-primary" : "text-slate-600 group-hover:text-slate-400"}`}>
                <Icon size={20} />
              </div>
              <span className="font-bold tracking-tight text-sm">{label}</span>

              {isActive && (
                <motion.div
                  layoutId="delivery-sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-900/50 rounded-3xl p-4 border border-slate-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-300 border border-slate-700 shadow-inner">
              {user?.name?.[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-white truncate uppercase tracking-tight">{user?.name}</p>
              <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest flex items-center gap-1"><Zap size={8} /> Fleet Personnel</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
          >
            <LogOut size={14} />
            Detach Fleet
          </button>
        </div>
      </div>
    </div>
  );
}

