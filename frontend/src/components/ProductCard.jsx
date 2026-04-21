import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, Edit2, ShoppingCart } from "lucide-react";

const ProductCard = React.memo(
  ({ product, onNavigate, onAddToCart, onToggleWishlist, isWishlisted }) => {
    const { user } = useAuth();
    return (
      <div className="group relative bg-card border border-border/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">

        {/* ADMIN EDIT SHORTCUT */}
        {user?.role === 'admin' && (
          <Link
            to="/admin/products"
            state={{ editId: product._id }}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-6 left-6 z-10 p-2 rounded-full bg-primary text-white shadow-xl shadow-primary/20 transition-transform hover:scale-110 active:scale-95"
          >
            <Edit2 size={16} />
          </Link>
        )}

        {/* WISHLIST BUTTON (TOP RIGHT) */}
        <button
          onClick={onToggleWishlist}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${isWishlisted ? "text-red-500 fill-red-500" : "text-foreground/40"
              }`}
          />
        </button>

        {/* IMAGE (CLICKABLE) */}
        <div
          onClick={() => onNavigate(product._id)}
          className="w-full h-48 overflow-hidden rounded-xl bg-muted cursor-pointer mb-4"
        >
          <img
            src={(product.images?.[0]?.url || "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519") + "?auto=format&fit=crop&w=400&q=75"}
            alt={product.title}
            loading="lazy"
            decoding="async"
            width="400"
            height="300"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{product.brand || "ESSENTIALS"}</p>
          <h4
            onClick={() => onNavigate(product._id)}
            className="font-semibold text-base text-foreground line-clamp-1 cursor-pointer group-hover:text-primary transition-colors"
          >
            {product.title}
          </h4>
          <div className="flex items-center justify-between pt-2">
            <p className="text-lg font-semibold text-primary">₹{product.price}</p>
            <Button
              size="icon"
              className="rounded-full h-10 w-10 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              title="Add to Cart"
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;



