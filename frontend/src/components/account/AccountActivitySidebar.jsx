import React from "react";
import { Package, ChevronRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AccountActivitySidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section 
        className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-colors" 
        onClick={() => navigate("/my-orders")}
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Package size={32} />
          </div>
          <div>
            <h3 className="text-xl font-semibold uppercase tracking-tight">Orders</h3>
            <p className="text-xs font-medium text-slate-400">Manage your past orders</p>
          </div>
        </div>
        <ChevronRight size={24} className="text-slate-200" />
      </section>

      <section className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 grayscale opacity-20 rotate-12">
          <ShieldCheck size={120} />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-[0.3em]">Security Tier</p>
            <h3 className="text-2xl font-semibold uppercase tracking-tighter">Secure Account</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed font-medium">Your account is protected with industry-standard encryption and protocols.</p>
          <Button className="h-14 px-8 rounded-2xl bg-white text-slate-900 font-semibold uppercase tracking-widest text-[9px] hover:scale-105 transition-transform active:scale-95 shadow-2xl">
            View Privacy Policy
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AccountActivitySidebar;


