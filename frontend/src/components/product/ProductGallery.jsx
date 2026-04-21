import React from "react";
import { Link } from "react-router-dom";
import { Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const ProductGallery = ({ product, mainImage, setMainImage, inStock, user }) => {
  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200 group"
      >
        {user?.role === 'admin' && (
          <Link
            to="/admin/products"
            state={{ editId: product._id }}
            className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10 p-2 rounded-full bg-primary text-white shadow-xl shadow-primary/20 transition-transform hover:scale-110 active:scale-95"
          >
            <Edit2 size={14} />
          </Link>
        )}
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-8 left-8">
          <Badge className="bg-primary/90 backdrop-blur-md text-white px-6 py-2 rounded-2xl text-xs font-semibold uppercase tracking-widest border-0 shadow-xl">
            {inStock ? "In Stock" : "Coming Soon"}
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        {product.images?.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img.url)}
            className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${mainImage === img.url ? "border-primary shadow-lg ring-4 ring-primary/5" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            <img src={img.url} className="w-full h-full object-cover" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;


