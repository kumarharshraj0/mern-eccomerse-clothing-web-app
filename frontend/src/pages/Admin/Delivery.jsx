import React, { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import {
  Menu,
  Plus,
  UserPlus,
  Mail,
  Lock,
  ShieldCheck,
  Truck,
  MoreVertical,
  ChevronRight,
  User,
  Zap,
  CheckCircle2,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const Delivery = () => {
  const { deliveryBoys, fetchAllDeliveryBoys, createDeliveryBoy } = useAdmin();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchAllDeliveryBoys();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    await createDeliveryBoy(form);
    setSheetOpen(false);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="space-y-12">
      {/* Logistics Command Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Truck size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Module 04: Logistics</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Logistics Command</h1>
          <p className="text-slate-500 font-medium font-serif italic text-lg">Optimizing fulfillment personnel & deployment</p>
        </div>

        <Button
          size="xl"
          onClick={() => setSheetOpen(true)}
          className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest bg-primary shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
        >
          <UserPlus size={20} />
          Authorize Personnel
        </Button>
      </header>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {deliveryBoys.map((db, i) => (
            <motion.div
              key={db._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all p-8 flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={db.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${db.name}`}
                    alt={db.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-emerald-500 border-4 border-white flex items-center justify-center text-white">
                  <ShieldCheck size={14} strokeWidth={3} />
                </div>
              </div>

              <div className="space-y-1 mb-6 w-full min-w-0">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight truncate">{db.name}</h3>
                <div className="flex items-center justify-center gap-1.5 text-slate-400">
                  <Mail size={12} />
                  <p className="text-[10px] font-bold uppercase tracking-widest truncate">{db.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full mb-8">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-50">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Status</p>
                  <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-50">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Impact</p>
                  <div className="flex items-center justify-center gap-1.5 text-indigo-600">
                    <Zap size={10} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Elite</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 font-black uppercase tracking-widest text-[9px] hover:bg-slate-50 hover:text-primary transition-all gap-2">
                Deployment Logs <ChevronRight size={14} />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Authorize Personnel Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="max-w-md w-full border-none shadow-2xl p-0">
          <div className="h-full flex flex-col bg-white">
            <SheetHeader className="p-10 border-b border-slate-50">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Credentialing Module</span>
                <SheetTitle className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                  Authorize Personnel
                </SheetTitle>
              </div>
            </SheetHeader>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-black">01</div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Identity Profile</h4>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                  <Input
                    placeholder="e.g. Commander Shepard"
                    className="h-14 rounded-xl border-slate-100 bg-slate-50 font-bold focus:bg-white transition-all"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Communication Channel (Email)</Label>
                  <Input
                    type="email"
                    placeholder="n7@citadel.com"
                    className="h-14 rounded-xl border-slate-100 bg-slate-50 font-bold focus:bg-white transition-all"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-black">02</div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Security Access</h4>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Protocol (Password)</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-14 rounded-xl border-slate-100 bg-slate-50 font-bold focus:bg-white transition-all"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>
            </form>

            <div className="p-10 border-t border-slate-100 bg-slate-50/50">
              <Button
                size="xl"
                onClick={handleSubmit}
                className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 hover:scale-[1.01] active:scale-95 transition-all"
              >
                Initiate Authorization
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Delivery;

