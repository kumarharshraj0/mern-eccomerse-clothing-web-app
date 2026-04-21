import React from "react";
import { Package } from "lucide-react";

const OrderListHeader = ({ totalCount, inProgressCount }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-1">
        <div className="flex items-center gap-3 text-primary mb-2">
          <Package size={20} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Order History</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">My Orders</h1>
        <p className="text-slate-500 font-medium text-lg">Track and manage all your orders</p>
      </div>

      <div className="flex bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
        <div className="px-6 py-2 border-r border-slate-100">
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Total Orders</p>
          <p className="text-xl font-semibold text-slate-900">{totalCount}</p>
        </div>
        <div className="px-6 py-2">
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">In Progress</p>
          <p className="text-xl font-semibold text-primary">{inProgressCount}</p>
        </div>
      </div>
    </header>
  );
};

export default OrderListHeader;


