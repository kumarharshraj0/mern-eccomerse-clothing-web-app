import React from "react";
import { CreditCard, Smartphone, Truck } from "lucide-react";
import { motion } from "framer-motion";

const PaymentMethodSection = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <CreditCard size={24} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tighter text-slate-900 uppercase">Payment Method</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { id: "razorpay", icon: Smartphone, title: "Instant Pay", subtitle: "UPI • Card • NetBanking" },
          { id: "cod", icon: Truck, title: "Payment on Delivery", subtitle: "Cash • QR Scan" }
        ].map((method) => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`flex items-center gap-4 p-6 rounded-[1.5rem] border-2 transition-all text-left ${paymentMethod === method.id
              ? "border-primary bg-primary/5 ring-4 ring-primary/5"
              : "border-slate-100 hover:border-slate-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>
              <method.icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-900 tracking-tight">{method.title}</p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{method.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default PaymentMethodSection;


