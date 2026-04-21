import React from 'react';
import { motion } from 'framer-motion';
import { TEXT_VARIANTS } from '@/constants/heroSlides';

const HeroStats = ({ stats }) => (
  <motion.div
    variants={TEXT_VARIANTS}
    initial="enter" animate="center" exit="exit"
    custom={6}
    className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-md"
  >
    {stats.map((stat) => (
      <div key={stat.label}>
        <p className="text-2xl sm:text-3xl font-semibold tracking-tighter text-white">{stat.value}</p>
        <p className="text-[10px] uppercase font-semibold text-white/40 tracking-widest mt-1">{stat.label}</p>
      </div>
    ))}
  </motion.div>
);

export default HeroStats;


