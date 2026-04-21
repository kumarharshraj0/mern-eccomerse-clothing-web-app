import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 text-primary"
        >
          <Sparkles size={18} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Our Story</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl lg:text-8xl font-semibold tracking-tighter uppercase leading-[0.85]"
        >
          The New<br />
          <span className="text-primary uppercase">Standard</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 font-medium text-xl max-w-2xl mx-auto pt-4 leading-relaxed"
        >
          We are architects of modern commerce, dedicated to bridging the gap between exceptional craftsmanship and discerning individuals worldwide.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;


