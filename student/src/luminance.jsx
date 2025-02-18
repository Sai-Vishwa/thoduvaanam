import React from 'react';
import { motion } from 'framer-motion';

const Luminance = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-[#333641]">
      <motion.div
        className="text-transparent text-8xl font-[Source Sans Pro, sans-serif] bg-gradient-to-b from-white to-transparent bg-clip-text"
        initial={{
          letterSpacing: 0,
          backgroundSize: '0%',
          scale: 0, // Start with scale 0 for the circle effect
        }}
        animate={{
          letterSpacing: '8px',
          backgroundSize: '300%',
          scale: 1, // End with normal scale
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          delay: 0.2,
        }}
        style={{
          animation: 'glow 2.5s linear infinite 2000ms',
        }}
      >
        LUMINANCE
      </motion.div>
    </div>
  );
};

export default Luminance;
