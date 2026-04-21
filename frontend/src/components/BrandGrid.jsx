import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const brands = [
  { name: "Zara", domain: "zara.com", style: "tracking-[0.2em] font-semibold" },
  { name: "Nike", domain: "nike.com", style: " tracking-tight font-semibold" },
  { name: "Adidas", domain: "adidas.com", style: "lowercase tracking-tighter font-semibold" },
  { name: "Puma", domain: "puma.com", style: " tracking-widest font-semibold" },
  { name: "H&M", domain: "hm.com", style: "tracking-normal font-semibold" },
  { name: "Gucci", domain: "gucci.com", style: "tracking-[0.5em] font-medium" },
  { name: "Prada", domain: "prada.com", style: "tracking-[0.3em] font-light" },
  { name: "Diesel", domain: "diesel.com", style: "tracking-[0.1em] font-semibold" },
];

const BrandCircle = ({ brand, onClick }) => {
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true }}
      onClick={() => onClick(brand.name)}
      className="flex flex-col items-center cursor-pointer group"
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-white border border-slate-100 shadow-lg shadow-slate-100/50 group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
        {!error ? (
          <img
            src={`https://logo.clearbit.com/${brand.domain}`}
            alt={brand.name}
            onError={() => setError(true)}
            className="w-[60%] h-[60%] object-contain transition-all duration-300"
          />
        ) : (
          <span className={`text-[10px] md:text-xs font-semibold uppercase text-slate-400 group-hover:text-primary transition-colors ${brand.style}`}>
            {brand.name}
          </span>
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
      </div>
    </motion.div>
  );
};

const BrandGrid = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/shop?brand=${brandName}`, { state: { filterType: "brand", filterValue: brandName } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-slate-50/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-3 text-primary/40">
            <span className="w-8 h-[1px] bg-current" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.4em]">Official Partners</span>
            <span className="w-8 h-[1px] bg-current" />
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold uppercase tracking-tighter text-slate-900 border-b-4 border-primary/10 pb-2">
            The Brands
          </h2>
        </div>

        {/* Circular Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-10">
          {brands.map((brand) => (
            <BrandCircle key={brand.name} brand={brand} onClick={handleBrandClick} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default BrandGrid;






