import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroControls = ({ 
  currentSlide, totalSlides, 
  prevSlide, nextSlide, 
  goToSlide 
}) => {
  return (
    <>
      {/* Sidebar Indicators (Desktop) */}
      <div className="hidden lg:flex flex-col items-end justify-end h-full gap-8">
        <div className="flex flex-col gap-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`group flex items-center gap-3 transition-all duration-500 ${
                i === currentSlide ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <span className="text-[10px] font-semibold text-white uppercase tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className={`h-[2px] transition-all duration-700 ${
                  i === currentSlide ? "w-16 bg-primary" : "w-8 bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-semibold text-white tracking-tighter">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-white/30 font-semibold">/</span>
            <span className="text-sm font-semibold text-white/30">
              {String(totalSlides).padStart(2, "0")}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="hidden sm:flex flex-1 mx-8 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              key={currentSlide}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="h-full bg-primary rounded-full"
            />
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroControls;


