import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight, Heart, Package, ShoppingCart, ChevronRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function WishlistPage({ isSheet = false }) {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  const WishlistContent = (
    <div className={`space-y-6 ${safeWishlist.length === 0 ? "py-20" : ""}`}>
      {safeWishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex flex-col items-center justify-center text-center space-y-6 ${isSheet ? "p-6" : "py-32 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20"}`}
        >
          <div className={`${isSheet ? "w-16 h-16" : "w-24 h-24"} bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 relative`}>
            <Heart size={isSheet ? 32 : 48} />
          </div>
          <div className="space-y-2">
            <h2 className={`${isSheet ? "text-lg" : "text-2xl"} font-black tracking-tighter uppercase`}>ARCHIVE VACANT</h2>
            <p className="text-slate-400 text-xs font-medium font-serif italic max-w-xs mx-auto">Explore our catalog to initialize your wishlist.</p>
          </div>
          <Button size={isSheet ? "sm" : "xl"} onClick={() => navigate("/shop")} className="rounded-2xl font-black uppercase tracking-widest text-[10px] gap-2 bg-slate-900 text-white shadow-xl">
            Start Exploration <ArrowRight size={14} />
          </Button>
        </motion.div>
      ) : (
        <div className={`grid grid-cols-1 ${isSheet ? "" : "md:grid-cols-2 lg:grid-cols-3"} gap-6 pb-10`}>
          <AnimatePresence mode="popLayout">
            {safeWishlist.map((item, idx) => {
              const product = item.product || item;
              const imageUrl = product?.images?.[0]?.url || product?.image?.url || product?.image || "/placeholder.png";

              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full`}
                >
                  {/* Image Area */}
                  <div className={`${isSheet ? "aspect-square" : "aspect-[4/5]"} relative overflow-hidden bg-slate-50`}>
                    <img
                      src={imageUrl}
                      alt={product?.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => removeFromWishlist(product._id)}
                        className="w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-red-500 shadow-lg hover:bg-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className={`${isSheet ? "p-5" : "p-8 lg:p-10"} space-y-4 flex-1 flex flex-col`}>
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className={`${isSheet ? "text-base" : "text-xl"} font-black uppercase tracking-tight line-clamp-2 leading-none`}>{product?.title}</h3>
                        <p className={`${isSheet ? "text-base" : "text-xl"} font-black text-primary tracking-tighter italic font-serif`}>₹{product?.price.toLocaleString()}</p>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{product?.category || "Tier One Asset"}</p>
                    </div>

                    <div className="pt-2 mt-auto space-y-2">
                      <Button
                        onClick={() => addToCart(product._id, 1)}
                        className="w-full h-12 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-[9px] gap-2 active:scale-95 transition-all"
                      >
                        <ShoppingCart size={14} /> Acquire
                      </Button>
                      {!isSheet && (
                        <Button
                          variant="ghost"
                          onClick={() => navigate(`/products/${product._id}`)}
                          className="w-full h-12 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
                        >
                          Details <ChevronRight size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Heart size={20} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curated Selections</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">The<br /><span className="text-primary italic font-serif lowercase">wishlist.</span></h1>
            <p className="text-slate-500 font-medium font-serif italic text-lg pt-2">Your private archive of premium interests</p>
          </div>
          <div className="flex bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
            <div className="px-8 py-2">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Saved Assets</p>
              <p className="text-2xl font-black text-slate-900">{safeWishlist.length}</p>
            </div>
          </div>
        </header>
        {WishlistContent}
      </div>
    </div>
  );
}
