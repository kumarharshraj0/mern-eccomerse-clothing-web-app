import React from 'react';
import { motion } from 'framer-motion';

const AnnouncementBar = () => {
  const messages = [
    "Free Shipping on orders over ₹5,000",
    'Limited Edition "Supernova" Drop Coming Soon',
    "20% Off your first purchase with code: SWIFT20",
  ];

  // Duplicate messages for seamless infinite scroll
  const allMessages = [...messages, ...messages];

  return (
    <div className="bg-foreground text-background py-2.5 overflow-hidden relative">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12 text-[10px] font-semibold uppercase tracking-[0.3em] items-center"
      >
        {allMessages.map((msg, i) => (
          <React.Fragment key={i}>
            <span>{msg}</span>
            <span className="text-primary">●</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;


