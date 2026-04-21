import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useShopFilters } from "@/hooks/useShopFilters";
import ShopHeader from "@/components/shop/ShopHeader";
import FiltersContent from "@/components/shop/FiltersContent";
import ProductGrid from "@/components/shop/ProductGrid";

export default function ProductsPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const shop = useShopFilters();

  const activeFiltersCount = 
    shop.selectedCategory.length + 
    shop.selectedBrand.length + 
    shop.selectedColor.length;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <ShopHeader 
          {...shop} 
          activeFiltersCount={activeFiltersCount} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start relative">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-32 space-y-2">
            <FiltersContent {...shop} activeFiltersCount={activeFiltersCount} />
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {shop.showMobileFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => shop.setShowMobileFilters(false)}
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-[101] lg:hidden shadow-2xl"
                >
                  <FiltersContent {...shop} activeFiltersCount={activeFiltersCount} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <ProductGrid 
            {...shop}
            handleNavigate={(id) => navigate(`/products/${id}`)}
            handleAddToCart={(id) => addToCart(id, 1)}
            isInWishlist={isInWishlist}
            removeFromWishlist={removeFromWishlist}
            addToWishlist={addToWishlist}
          />
        </div>
      </div>
    </div>
  );
}







