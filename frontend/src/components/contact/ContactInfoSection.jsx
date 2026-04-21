import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ContactInfoSection = () => {
  const contactInfo = [
    { icon: Phone, label: "Hotline", value: "+1 (888) PREMIUM", sub: "24/7 Priority Support" },
    { icon: Mail, label: "Electronic", value: "concierge@premium.com", sub: "Avg response: 15 mins" },
    { icon: MapPin, label: "Headquarters", value: "Elite Plaza, Floor 88", sub: "New York, Manhattan" },
  ];

  return (
    <div className="lg:col-span-4 space-y-12">
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold uppercase tracking-widest text-slate-900 leading-none">Contact<br /><span className="text-primary text-4xl">Info</span></h2>

        <div className="space-y-6">
          {contactInfo.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex items-start gap-6 p-6 rounded-[2rem] hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                <item.icon size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{item.label}</p>
                <p className="text-lg font-semibold text-slate-900 leading-none">{item.value}</p>
                <p className="text-xs font-medium text-slate-400 font-serif">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl group">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=75&w=800&auto=format&fit=crop"
          alt="Elite Plaza Manhattan Headquarters"
          className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <MapPin className="text-primary" size={24} />
            </div>
            <Badge className="bg-white text-slate-900 border-0 font-semibold px-4 py-2 uppercase tracking-widest text-[8px]">Manhattan HQ</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;


