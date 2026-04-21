import React from "react";
import { motion } from "framer-motion";
import { stats } from "@/constants/aboutData";

const AboutStats = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                <s.icon size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-semibold tracking-tighter text-slate-900">{s.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;


