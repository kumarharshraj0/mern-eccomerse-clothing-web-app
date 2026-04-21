import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const BENEFITS = [
  { icon: Truck, title: "Free Global Shipping", desc: "On orders over ₹5,000" },
  { icon: RotateCcw, title: "30-Day Returns", desc: "Easy, hassle-free process" },
  { icon: ShieldCheck, title: "Secure Checkout", desc: "100% encrypted payment" },
  { icon: Headphones, title: "Expert Support", desc: "24/7 dedicated concierge" },
];

const FooterBenefits = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-slate-800">
    {BENEFITS.map((benefit, i) => (
      <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary">
          <benefit.icon size={24} />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-lg">{benefit.title}</h4>
          <p className="text-slate-400 text-sm font-medium">{benefit.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export default FooterBenefits;


