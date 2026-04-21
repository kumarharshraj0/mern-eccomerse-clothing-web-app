import React from "react";
import { ShoppingBag, Heart, Plus, Minus, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductActions = ({ 
  product, selectedSize, setSelectedSize, 
  quantity, setQuantity, 
  loading, inStock, handleAddToCart 
}) => {
  return (
    <div className="space-y-8 pt-6 border-t border-slate-100">
      {product.sizes?.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Select size</span>
            <button className="text-xs font-semibold text-primary underline">Size Guide</button>
          </div>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[56px] h-14 rounded-2xl border-2 font-semibold transition-all ${selectedSize === size
                  ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20"
                  : "bg-white border-slate-100 text-slate-900 hover:border-slate-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-colors"
          >
            <Minus size={18} />
          </button>
          <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={!inStock || loading}
          className="w-full sm:flex-1 h-14 rounded-2xl text-lg font-semibold shadow-2xl shadow-primary/20 active:scale-95 transition-all gap-3"
        >
          <ShoppingBag size={20} />
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
        <button className="w-14 h-14 flex items-center justify-center border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors text-slate-400 hover:text-red-500 shrink-0">
          <Heart size={24} />
        </button>
      </div>

      {/* Upsell Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
        {[
          { icon: Truck, title: "Swift Delivery", subtitle: "2-3 business days" },
          { icon: RotateCcw, title: "Easy Returns", subtitle: "30-day policy" },
          { icon: ShieldCheck, title: "Secure Pay", subtitle: "100% genuine" },
        ].map((benefit, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <benefit.icon className="text-primary mt-1" size={20} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-tight text-slate-900">{benefit.title}</p>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">{benefit.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductActions;


