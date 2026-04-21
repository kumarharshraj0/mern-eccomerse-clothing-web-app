import React from "react";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethodSection from "@/components/checkout/PaymentMethodSection";
import OrderSummarySidebar from "@/components/checkout/OrderSummarySidebar";

export default function Checkout() {
  const ch = useCheckout();

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">Secure Checkout</h1>
            <p className="text-slate-500 font-medium font-serif text-lg">Finalize your acquisition</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            <span className="text-primary flex items-center gap-2"><CheckCircle2 size={14} /> Cart</span>
            <ChevronRight size={12} />
            <span className="text-slate-900 flex items-center gap-2 underline underline-offset-8 decoration-primary decoration-2">Shipping</span>
            <ChevronRight size={12} />
            <span className="flex items-center gap-2">Payment</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-8">
            <ShippingForm shipping={ch.shipping} setShipping={ch.setShipping} />
            <PaymentMethodSection paymentMethod={ch.paymentMethod} setPaymentMethod={ch.setPaymentMethod} />
          </div>
          <OrderSummarySidebar 
            cart={ch.cart} subtotal={ch.subtotal} shippingCost={ch.shippingCost} 
            total={ch.total} loading={ch.loading} handlePlaceOrder={ch.handlePlaceOrder} 
          />
        </div>
      </div>
    </div>
  );
}


