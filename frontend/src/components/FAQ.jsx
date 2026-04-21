import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be in their original condition and packaging.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-7 business days. Priority shipping is available for 1-2 business day delivery.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has shipped, you will receive a tracking number via email that you can use on our carrier's website.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, UPI, net banking, digital wallets, and cash on delivery for your convenience.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3 text-primary">
            <HelpCircle size={20} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Support</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter uppercase">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-md mx-auto">
            Everything you need to know about shopping with us
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-primary/20 bg-primary/[0.02] shadow-lg shadow-primary/5"
                    : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`text-base font-semibold pr-4 transition-colors ${isOpen ? "text-primary" : "text-slate-900"}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isOpen ? "bg-primary text-white" : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-slate-500 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;


