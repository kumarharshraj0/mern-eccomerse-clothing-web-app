import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const OrderDetailsAssets = ({ items }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
    >
      <div className="p-10 lg:p-12 border-b border-slate-50">
        <h3 className="text-xl font-semibold uppercase tracking-tight">Acquired Assets</h3>
      </div>

      <div className="p-10 lg:p-12 space-y-8">
        {items?.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-8 group">
            <div className="w-full sm:w-32 aspect-square rounded-2xl bg-slate-50 overflow-hidden border border-slate-50 transition-all group-hover:shadow-lg">
              <img 
                src={item.image?.url || item.image || item.product?.images?.[0]?.url} 
                alt="" 
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-slate-900 uppercase tracking-tighter leading-none">{item.title || item.product?.title}</h4>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Serial: {item.product?._id || item.product || 'UNIDENTIFIED'}</p>
                </div>
                <p className="text-xl font-semibold text-slate-900">₹{(item.price * item.qty).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="h-8 rounded-lg border-slate-100 text-slate-400 font-semibold px-3">Unit: ₹{item.price.toLocaleString()}</Badge>
                <Badge variant="outline" className="h-8 rounded-lg border-slate-100 text-slate-400 font-semibold px-3">Qty: {item.qty}</Badge>
                {item.size && <Badge variant="outline" className="h-8 rounded-lg border-slate-100 text-slate-400 font-semibold px-3">Size: {item.size}</Badge>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default OrderDetailsAssets;


