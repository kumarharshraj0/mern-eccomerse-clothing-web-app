import React from 'react';
import { ShieldCheck, Truck, Recycle, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const props = [
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    desc: "Uncompromising support on every piece in our collection.",
  },
  {
    icon: Recycle,
    title: "Ethical Craft",
    desc: "100% circular textile systems and eco-certified materials.",
  },
  {
    icon: Truck,
    title: "Priority Concierge",
    desc: "Next-day white-glove delivery across all global capitals.",
  },
  {
    icon: Award,
    title: "Zero Carbon",
    desc: "Independently certified climate-positive production.",
  },
];

const ValueProps = () => {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {props.map((prop, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[2.5rem] flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2 hover:bg-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
                <prop.icon size={26} strokeWidth={1.25} />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] mb-4 text-slate-900 leading-tight">
                {prop.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {prop.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;


