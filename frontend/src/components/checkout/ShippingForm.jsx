import React from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ShippingForm = ({ shipping, setShipping }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <MapPin size={24} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tighter text-slate-900 uppercase">Recipient Details</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
            <Input
              placeholder="e.g. Alexander Pierce"
              value={shipping.fullName}
              onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
              className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Secure Contact</Label>
            <Input
              placeholder="+91 00000 00000"
              value={shipping.phone}
              onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
              className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">Street Address</Label>
          <Input
            placeholder="Grand Avenue, Suite 402"
            value={shipping.street}
            onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
            className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">City</Label>
            <Input
              placeholder="Mumbai"
              value={shipping.city}
              onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
              className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">State</Label>
            <Input
              placeholder="Maharashtra"
              value={shipping.state}
              onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
              className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 ml-1">ZIP / Postal</Label>
            <Input
              placeholder="400001"
              value={shipping.zip}
              onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
              className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShippingForm;


