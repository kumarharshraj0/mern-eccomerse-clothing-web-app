import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate("/shop", { state: { filterType: "category", filterValue: categoryName } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pb-32 bg-background px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        
        {/* 🟢 LEFT CARD: DISCOVER THE UNLIMITLESS */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => handleCategoryClick("Mens")}
          className="group relative bg-[#F2F2F0] rounded-[3rem] overflow-hidden cursor-pointer flex flex-col p-2 min-h-[500px]"
        >
          <div className="flex-1 overflow-hidden rounded-[2.5rem] relative">
            <img
              src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1200&q=80"
              alt="Discover"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="p-10 pt-8 space-y-2">
            <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tighter ">
              Discover the unlimitless
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              -Imagining New Fashion Trends
            </p>
          </div>
        </motion.div>

        {/* ⚪ RIGHT CARD: HOLD ON, NEW PRODUCT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={() => handleCategoryClick("Womens")}
          className="group relative bg-[#F5F5F5] rounded-[3rem] overflow-hidden cursor-pointer flex flex-col p-10 min-h-[500px] justify-between border border-slate-100"
        >
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-semibold text-slate-800 tracking-tighter w-2/3 leading-[1.1]">
              Hold on, new product is coming!
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              -Bringing you a new era of simple clothes.
            </p>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-10">
            {/* Year Sticker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] z-20">
               <div className="bg-white px-6 py-4 rounded-full shadow-lg flex flex-col items-center border border-slate-100 animate-bounce">
                  <span className="text-xl font-semibold text-slate-900 leading-none">2024</span>
               </div>
            </div>

            {/* Floating Image */}
            <div className="relative w-full max-w-[300px] aspect-[4/5] bg-white rounded-[2rem] p-4 shadow-xl shadow-slate-200/50 group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80" 
                 className="w-full h-full object-cover rounded-[1.5rem]" 
                 alt="New Product"
               />
               <div className="absolute bottom-6 left-6 space-y-1">
                 <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">New Arrival</p>
                 <p className="text-sm font-semibold text-slate-900 uppercase tracking-tighter">Cloth</p>
               </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
               <ArrowRight size={24} />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CategoryGrid;



