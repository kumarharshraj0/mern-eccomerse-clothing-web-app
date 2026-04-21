import React from "react";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OrderPipelineHeader = () => (
  <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
    <div className="space-y-1">
      <div className="flex items-center gap-3 text-primary mb-2">
        <Activity size={24} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Module 03: Fulfillment</span>
      </div>
      <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">Order Pipeline</h1>
      <p className="text-slate-500 font-medium font-serif text-lg">Tracking commerce velocity in real-time</p>
    </div>

    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
      <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-500 font-semibold uppercase tracking-widest text-[9px]">
        Live Feed Active
      </Badge>
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
    </div>
  </header>
);

export default OrderPipelineHeader;


