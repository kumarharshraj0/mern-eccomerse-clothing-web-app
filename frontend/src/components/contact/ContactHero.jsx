import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 text-primary"
        >
          <MessageSquare size={18} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Get in Touch</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl lg:text-9xl font-semibold tracking-tighter uppercase leading-[0.8] mix-blend-multiply"
        >
          Connect<br /><span className="text-primary">With Us</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 font-medium font-serif text-xl max-w-xl mx-auto pt-6"
        >
          We'd love to hear from you. Reach out to our support team for any questions or feedback.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHero;


