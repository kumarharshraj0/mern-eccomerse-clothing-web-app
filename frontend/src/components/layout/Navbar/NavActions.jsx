import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, ShoppingBag } from "lucide-react";
import WishlistPage from "@/pages/Wishlist";
import CartPage from "@/pages/Cart";

const NavActions = ({ user, safeWishlist, safeCart }) => {
  return (
    <div className="flex items-center gap-6">
      {/* Wishlist */}
      {user && (
        <Sheet>
          <SheetTrigger asChild>
            <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group">
              <Heart size={20} className="group-hover:fill-current" />
              {safeWishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[8px] font-semibold flex items-center justify-center rounded-full">
                  {safeWishlist.length}
                </span>
              )}
            </button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg p-0 overflow-y-auto">
            <WishlistPage isSheet={true} />
          </SheetContent>
        </Sheet>
      )}

      {/* Cart */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
            <ShoppingBag size={20} />
            {safeCart.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 text-white text-[8px] font-semibold flex items-center justify-center rounded-full">
                {safeCart.length}
              </span>
            )}
          </button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg p-0 overflow-y-auto">
          <CartPage isSheet={true} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavActions;


