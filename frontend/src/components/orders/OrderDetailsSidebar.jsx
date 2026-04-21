import React from "react";
import { MapPin, ShieldCheck, CreditCard, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const OrderDetailsSidebar = ({ order }) => {
  return (
    <aside className="space-y-8">
      {/* Logistics Card */}
      <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
            <MapPin size={24} />
          </div>
          <h3 className="text-lg font-semibold uppercase tracking-tight">Logistics Hub</h3>
        </div>

        <div className="space-y-1 font-semibold text-slate-900 text-sm leading-relaxed">
          <p>{order.shippingAddress?.fullName}</p>
          <p className="text-slate-400 font-medium">{order.shippingAddress?.street}</p>
          <p className="text-slate-400 font-medium">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}</p>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary mt-4 flex items-center gap-2">
            <ShieldCheck size={12} /> Encrypted Contact: {order.shippingAddress?.phone}
          </p>
        </div>
      </section>

      {/* Payment Audit */}
      <section className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
          <CreditCard size={180} />
        </div>
        <div className="relative z-10 space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-[9px] font-semibold text-primary uppercase tracking-[0.3em]">Financial Ledger</p>
            <h3 className="text-2xl font-semibold uppercase tracking-tighter">Secure Payment</h3>
          </div>
          <div className="space-y-4">
            <div className="py-4 px-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Method</span>
              <span className="font-semibold uppercase text-xs">{order.paymentMethod}</span>
            </div>
            <div className="py-4 px-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Ledger Status</span>
              <Badge className={`${order.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-amber-500'} text-white font-semibold uppercase text-[8px] h-6 border-0`}>
                {order.paymentStatus}
              </Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 hover:bg-white hover:text-slate-900 font-semibold uppercase tracking-widest text-[9px] gap-2">
            <ExternalLink size={14} /> View Invoice Receipt
          </Button>
        </div>
      </section>
    </aside>
  );
};

export default OrderDetailsSidebar;


