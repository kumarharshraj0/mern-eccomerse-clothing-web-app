import React from "react";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DeliveryDutiesHeader = ({ count }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-1">
        <div className="flex items-center gap-3 text-primary mb-2">
          <Package size={24} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Operational Module 01</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">Fleet Duties</h1>
        <p className="text-slate-500 font-medium font-serif text-lg">Active fulfillment tasks & secure handovers</p>
      </div>

      <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <Badge variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-slate-500 font-semibold uppercase tracking-widest text-[9px]">
          {count} Duties Pending
        </Badge>
      </div>
    </header>
  );
};

export default DeliveryDutiesHeader;


