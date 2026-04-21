import React from "react";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const CartSummary = ({ subtotal, shipping, total, isSheet, navigate }) => {
  return (
    <aside className={`${isSheet ? "" : "lg:sticky lg:top-32"} space-y-6`}>
      <div className={`bg-white ${isSheet ? "rounded-3xl" : "rounded-[2.5rem]"} border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden`}>
        <div className={`${isSheet ? "p-6" : "p-10"} space-y-6 lg:space-y-8`}>
          <h3 className="text-lg lg:text-xl font-semibold tracking-tight uppercase">Summary</h3>

          <div className="space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-400 font-semibold tracking-widest uppercase text-[10px]">Subtotal</span>
              <span className="text-slate-900 font-semibold">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-400 font-semibold tracking-widest uppercase text-[10px]">Shipping</span>
              <span className={shipping === 0 ? "text-green-500 font-semibold uppercase text-[10px] tracking-widest" : "text-slate-900 font-semibold"}>
                {shipping === 0 ? "Complimentary" : `₹${shipping}`}
              </span>
            </div>
            <Separator className="bg-slate-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Total</span>
              <span className={`${isSheet ? "text-2xl" : "text-3xl"} font-semibold text-primary tracking-tighter`}>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4">
            <Button
              size={isSheet ? "lg" : "xl"}
              onClick={() => navigate("/checkout")}
              className="w-full rounded-2xl h-14 font-semibold lg:text-lg bg-primary shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
            >
              Checkout <ArrowRight size={20} />
            </Button>
            {!isSheet && (
              <Button
                variant="ghost"
                onClick={() => navigate("/shop")}
                className="w-full h-14 rounded-2xl font-semibold text-slate-400 hover:text-slate-900 transition-colors"
              >
                Continue Shopping
              </Button>
            )}
          </div>
        </div>

        {!isSheet && (
          <div className="bg-slate-50 border-t border-slate-100 p-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 grayscale opacity-50">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-semibold uppercase tracking-widest">Secure Pay</span>
            </div>
            <div className="flex items-center gap-3 grayscale opacity-50">
              <Truck size={18} />
              <span className="text-[10px] font-semibold uppercase tracking-widest">Tracked</span>
            </div>
          </div>
        )}
      </div>

      {!isSheet && (
        <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10 flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
            <Truck size={24} />
          </div>
          <p className="text-xs font-semibold text-primary leading-relaxed">
            {subtotal > 5000
              ? "You've unlocked COMPLIMENTARY shipping for this order!"
              : `Add ₹${(5000 - subtotal).toLocaleString()} more to unlock COMPLIMENTARY shipping.`}
          </p>
        </div>
      )}
    </aside>
  );
};

export default CartSummary;


