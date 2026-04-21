import React from "react";
import { Heart } from "lucide-react";

const WishlistHeader = ({ count }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-1">
        <div className="flex items-center gap-3 text-primary mb-2">
          <Heart size={20} fill="currentColor" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Your Wishlist</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-semibold tracking-tighter uppercase leading-none">Your<br /><span className="text-primary">Wishlist</span></h1>
        <p className="text-slate-500 font-medium text-lg pt-2">Items you've saved for later</p>
      </div>
      <div className="flex bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
        <div className="px-8 py-2">
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Saved Items</p>
          <p className="text-2xl font-semibold text-slate-900">{count}</p>
        </div>
      </div>
    </header>
  );
};

export default WishlistHeader;


