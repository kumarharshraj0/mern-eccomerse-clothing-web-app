import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedGrid = () => {
  return (
    <section className="py-24 bg-background px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner 1: Running Shoes */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="relative h-[600px] rounded-[2.5rem] overflow-hidden group cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" 
            alt="Running Collection" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-8 left-8">
            <span className="bg-primary text-primary-foreground text-[10px] font-semibold uppercase px-4 py-2 rounded-full shadow-lg shadow-primary/20">
              20% OFF
            </span>
          </div>
          <div className="absolute bottom-12 left-12 right-12">
            <h2 className="text-4xl font-semibold text-white uppercase tracking-tighter mb-4">Apex Velocity<br/>Running Series</h2>
            <Link to="/shop" className="inline-flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-[0.2em] border-b-2 border-primary pb-1 group/btn">
              Explore Collection <MoveRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
            </Link>
          </div>
        </motion.div>

        {/* Banner 2: Formal Collection */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="relative h-[600px] rounded-[2.5rem] overflow-hidden group cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=1200&q=80" 
            alt="Formal Collection" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-8 left-8">
            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-semibold uppercase px-4 py-2 rounded-full border border-white/20">
              New Arrival
            </span>
          </div>
          <div className="absolute bottom-12 left-12 right-12">
            <h2 className="text-4xl font-semibold text-white uppercase tracking-tighter mb-4">Precision Craft<br/>Formal Line</h2>
            <Link to="/shop" className="inline-flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-[0.2em] border-b-2 border-primary pb-1 group/btn">
              View Categories <MoveRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedGrid;


