import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const ProductGrid = ({ 
  products, 
  loading, 
  pagination, 
  setPage, 
  handleNavigate, 
  handleAddToCart, 
  isInWishlist, 
  removeFromWishlist, 
  addToWishlist,
  clearFilters 
}) => {
  return (
    <main className="space-y-8">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
        <AnimatePresence mode="popLayout">
          {products.length > 0 ? (
            products.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onNavigate={handleNavigate}
                  onAddToCart={() => handleAddToCart(product._id)}
                  onToggleWishlist={() =>
                    isInWishlist(product._id)
                      ? removeFromWishlist(product._id)
                      : addToWishlist(product._id)
                  }
                  isWishlisted={isInWishlist(product._id)}
                />
              </motion.div>
            ))
          ) : (
            !loading && (
              <div className="col-span-full py-32 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-semibold">No items found</h3>
                <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">Try adjusting your filters or search term to find what you're looking for.</p>
                <Button variant="link" onClick={clearFilters} className="font-semibold">Clear all filters</Button>
              </div>
            )
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center pt-12">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] w-full bg-slate-200/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {!loading && pagination?.hasNextPage && (
          <Button
            onClick={() => setPage((p) => p + 1)}
            size="xl"
            className="rounded-full px-16 py-8 font-semibold text-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-none shadow-2xl shadow-slate-200/50 hover:shadow-primary/20 hover:-translate-y-1 active:scale-95 transition-all duration-300 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transition-transform duration-1000 translate-x-[-100%] group-hover:translate-x-[100%]" />
            <span className="relative flex items-center gap-3">
              Discover More
            </span>
          </Button>
        )}
      </div>
    </main>
  );
};

export default ProductGrid;


