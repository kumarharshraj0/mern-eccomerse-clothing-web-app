import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Menu, Search, Bell, Grid, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 inset-y-0 left-0 w-80 transition-transform duration-500 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="sticky top-0 z-20 h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl bg-slate-50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>

            <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 w-full max-w-md gap-3 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary transition-all">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search analytics, orders, or inventory..."
                className="bg-transparent border-none focus:outline-none text-sm font-medium w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:bg-slate-50">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:bg-slate-50">
              <Grid size={20} />
            </Button>
            <div className="w-px h-6 bg-slate-200 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Master Admin</p>
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active System</p>
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white border-2 border-white shadow-xl shadow-slate-200 ring-1 ring-slate-100 cursor-pointer hover:scale-105 transition-transform">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}