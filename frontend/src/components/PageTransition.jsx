import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
    const { pathname } = useLocation();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1] // Custom ease-out expo
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
