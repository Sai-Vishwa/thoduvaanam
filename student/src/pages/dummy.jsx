import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Luminance from "../luminance";

const phrases = [
  "The DSA battle-field",
  "The DSA battle-field"
];

const chars = "!<>-_\/[]{}—=+*^?#________";

const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

const scrambleText = (text, progress) => {
  return text
    .split("")
    .map((char, i) => (progress < 1 && Math.random() < 0.3 ? getRandomChar() : char))
    .join("");
};

const TextScramble = () => {
  const [displayedText, setDisplayedText] = useState(phrases[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.08;
      setDisplayedText(scrambleText(phrases[index], progress));
      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <>
    {/* <motion.div
      className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      
    >
      {displayedText}
    </motion.div> */}
    </>
    
  );
};

export default TextScramble;