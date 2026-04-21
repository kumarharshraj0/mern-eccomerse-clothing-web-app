import React from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { values } from "@/constants/aboutData";

const NarrativeSection = () => {
  return (
    <section className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:shadow-primary/5">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=75&w=800&auto=format&fit=crop"
              alt="Elite Architecture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white rounded-[2.5rem] p-10 shadow-2xl hidden lg:block border border-slate-100">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Target size={24} />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Our Vision</p>
              <p className="text-sm font-semibold text-slate-900 leading-snug">Empowering the world through curated excellence and digital innovation.</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold tracking-tighter uppercase">Our Approach</h2>
            <p className="text-slate-600 font-medium leading-relaxed text-lg">
              We combine innovation, collaboration, and attention to detail. We believe in the power of quality and strive to fulfill each customer's needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <v.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold uppercase tracking-tight">{v.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NarrativeSection;


