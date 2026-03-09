import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      answer: "We accept all major credit cards, PayPal, and various digital wallets for your convenience.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border/60 rounded-xl overflow-hidden bg-card/50 transition-colors hover:border-border"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left font-semibold transition-colors hover:bg-muted/10"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
