import React from "react";
import { ShieldCheck, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderSummarySidebar = ({ 
  cart, subtotal, shippingCost, total, 
  loading, handlePlaceOrder 
}) => {
  return (
    <aside className="lg:sticky lg:top-32 space-y-6">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-10 space-y-8">
          <h3 className="text-xl font-semibold tracking-tight uppercase">Order Summary</h3>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
            {cart.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden border border-slate-100 shrink-0">
                  <img src={item.image?.url || item.image || item.product?.images?.[0]?.url} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate uppercase tracking-tight">{item.title || item.product?.title}</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Quantity: {item.qty} {item.size ? `• Size: ${item.size}` : ""}</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-semibold tracking-widest uppercase text-[10px]">Subtotal</span>
              <span className="text-slate-900 font-semibold">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 font-semibold tracking-widest uppercase text-[10px]">Shipping</span>
              <span className={shippingCost === 0 ? "text-green-500 font-semibold uppercase text-[10px] tracking-widest" : "text-slate-900 font-semibold"}>
                {shippingCost === 0 ? "Complimentary" : `₹${shippingCost}`}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Total</span>
              <span className="text-3xl font-semibold text-primary tracking-tighter">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <Button
            size="xl"
            disabled={loading}
            onClick={handlePlaceOrder}
            className="w-full rounded-2xl h-14 font-semibold text-lg bg-primary shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Finalize Order"}
          </Button>
        </div>

        <div className="bg-slate-50 p-8 flex flex-col items-center gap-3 text-center border-t border-slate-100">
          <div className="flex items-center gap-2 text-green-600 font-semibold uppercase tracking-widest text-[9px]">
            <ShieldCheck size={14} />
            Anti-Fraud Protection Enabled
          </div>
          <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest leading-relaxed">
            By placing this order, you agree to our <br />
            <span className="text-slate-900 underline underline-offset-2">Terms of Service</span> & <span className="text-slate-900 underline underline-offset-2">Refund Policy</span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
          <Package size={24} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 leading-tight mb-1">Estimated Arrival</p>
          <p className="text-sm font-semibold text-slate-900 leading-none">
            {new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummarySidebar;


