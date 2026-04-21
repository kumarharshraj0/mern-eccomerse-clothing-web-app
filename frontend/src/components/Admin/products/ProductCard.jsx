import React from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ p, i, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: i * 0.05 }}
      className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all overflow-hidden flex flex-col"
    >
      <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden">
        <img
          src={p.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end justify-between">
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-xl w-10 h-10 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary transition-all"
              onClick={() => onEdit(p)}
            >
              <Edit size={16} />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="rounded-xl w-10 h-10"
              onClick={() => onDelete(p._id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
          <Badge className="bg-primary text-white font-semibold uppercase tracking-widest text-[9px] px-3 py-1 rounded-full shadow-lg">Live</Badge>
        </div>
      </div>

      <div className="p-8 space-y-4 flex-1 flex flex-col">
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{p.category || "General"}</p>
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest flex items-center gap-1"><Zap size={10} /> {p.brand}</p>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 uppercase tracking-tight truncate">{p.title}</h3>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">Unit Valuation</p>
            <p className="text-xl font-semibold text-slate-900 tracking-tighter">₹{p.price.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">Inventory</p>
            <p className={`text-sm font-semibold uppercase tracking-widest ${p.stock < 10 ? 'text-rose-500' : 'text-slate-900'}`}>{p.stock} Units</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;


