import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEXT_VARIANTS } from '@/constants/heroSlides';

const HeroSlideHeader = ({ slide, navigate }) => (
  <div className="space-y-12">
    <div className="space-y-6">
      {/* Heading */}
      <motion.h1
        variants={TEXT_VARIANTS}
        initial="enter" animate="center" exit="exit"
        custom={1}
        className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.8] text-white"
      >
        {slide.heading[0]}
      </motion.h1>

      {/* Description Block */}
      <div className="flex items-start gap-4 max-w-lg">
        <motion.div
           variants={TEXT_VARIANTS}
           initial="enter" animate="center" exit="exit"
           custom={2}
           className="mt-2"
        >
          <ArrowUpRight size={24} className="text-white/40" />
        </motion.div>
        <motion.p
          variants={TEXT_VARIANTS}
          initial="enter" animate="center" exit="exit"
          custom={3}
          className="text-white/80 text-sm md:text-base leading-relaxed font-medium"
        >
          {slide.description}
        </motion.p>
      </div>

      {/* CTA Button */}
      <motion.div
        variants={TEXT_VARIANTS}
        initial="enter" animate="center" exit="exit"
        custom={4}
        className="pt-6 flex flex-col items-start gap-4"
      >
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={() => navigate(slide.link)}
            className="h-14 px-10 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            {slide.cta}
          </Button>
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
            <ArrowUpRight size={24} />
          </div>
        </div>
        
        <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40 ml-4">
          {slide.tag}
        </span>
      </motion.div>
    </div>
  </div>
);

export default HeroSlideHeader;



