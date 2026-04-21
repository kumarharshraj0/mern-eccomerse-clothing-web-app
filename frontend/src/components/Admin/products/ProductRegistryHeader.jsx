import React from "react";
import { Search, Plus, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProductRegistryHeader = ({ onSearch, onInitialize }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-1">
        <div className="flex items-center gap-3 text-primary mb-2">
          <Package size={24} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Module 02: Inventory</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tighter text-slate-900 uppercase">Asset Registry</h1>
        <p className="text-slate-500 font-medium font-serif text-lg">Managing high-performance stock levels</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          <Input
            placeholder="Query registry..."
            className="pl-12 h-14 rounded-2xl border-slate-100 bg-white shadow-sm focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button
          size="xl"
          onClick={onInitialize}
          className="h-14 px-8 rounded-2xl font-semibold uppercase tracking-widest bg-primary shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all gap-3"
        >
          <Plus size={20} />
          Initialize Asset
        </Button>
      </div>
    </header>
  );
};

export default ProductRegistryHeader;


