import React from "react";
import { AnimatePresence } from "framer-motion";
import { useWishlistOperations } from "@/hooks/useWishlistOperations";
import WishlistHeader from "@/components/wishlist/WishlistHeader";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";
import WishlistItemCard from "@/components/wishlist/WishlistItemCard";

export default function WishlistPage({ isSheet = false }) {
  const { wishlist, removeFromWishlist, addToCart, navigate } = useWishlistOperations();

  const WishlistContent = (
    <div className={`space-y-6 ${wishlist.length === 0 ? "py-20" : ""}`}>
      {wishlist.length === 0 ? (
        <EmptyWishlist isSheet={isSheet} />
      ) : (
        <div className={`grid grid-cols-1 ${isSheet ? "" : "md:grid-cols-2 lg:grid-cols-3"} gap-6 pb-10`}>
          <AnimatePresence mode="popLayout">
            {wishlist.map((item, idx) => (
              <WishlistItemCard 
                key={item._id}
                item={item}
                idx={idx}
                isSheet={isSheet}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
                navigate={navigate}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );

  if (isSheet) {
    return <div className="p-4 lg:p-6">{WishlistContent}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-20 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <WishlistHeader count={wishlist.length} />
        {WishlistContent}
      </div>
    </div>
  );
}


