import { useState } from "react";
import { motion } from "framer-motion";

const ScrollAnimation = () => {
  const words = ["Hello World.", "Console Text", "Made with Love."];
  const colors = ["tomato", "rebeccapurple", "lightblue"];
  const [index, setIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const handleNext = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
      setLetterCount(0);
      setFadeOut(false);
    }, 1000); // Wait for fade out before switching text
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <motion.div
        key={index}
        className="font-bold text-4xl text-center"
        animate={fadeOut ? { opacity: 0, x: 100 } : { opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <span style={{ color: colors[index] }}>
          {words[index].substring(0, letterCount)}
        </span>
        <motion.span
          className="ml-2"
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.4 }}
        >
          _
        </motion.span>
      </motion.div>
      <button
        onClick={() => {
          if (letterCount < words[index].length) {
            setLetterCount(letterCount + 1);
          } else {
            handleNext();
          }
        }}
        className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
      >
        Next
      </button>
    </div>
  );
};

export default ScrollAnimation;
