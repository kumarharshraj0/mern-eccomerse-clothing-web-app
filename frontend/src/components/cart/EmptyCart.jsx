import React from "react";
import { MoveRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyCart = ({ isSheet, navigate }) => (
  <div className={`${isSheet ? "h-full" : "min-h-[70vh]"} flex flex-col items-center justify-center p-6 text-center space-y-6`}>
    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
      <ShoppingBag size={isSheet ? 32 : 48} />
    </div>
    <div className="space-y-2">
      <h2 className={`${isSheet ? "text-xl" : "text-3xl"} font-semibold tracking-tighter text-slate-900`}>YOUR CART IS EMPTY</h2>
      <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">Looks like you haven't added any premium pieces to your collection yet.</p>
    </div>
    <Button
      size={isSheet ? "sm" : "lg"}
      onClick={() => navigate("/shop")}
      className="rounded-2xl px-10 font-semibold shadow-xl shadow-primary/20 active:scale-95 transition-all gap-2"
    >
      Explore Collection
      <MoveRight size={18} />
    </Button>
  </div>
);

export default EmptyCart;


