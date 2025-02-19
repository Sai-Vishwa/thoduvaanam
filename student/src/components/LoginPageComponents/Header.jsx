import { motion } from "framer-motion"
import { useEffect, useState } from "react";

const TextScramble = ({ text }) => {
  const [scrambledText, setScrambledText] = useState('');
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame++;
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (frame > index * 3) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      setScrambledText(scrambled);
      
      if (frame < text.length * 3) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [text]);

  return <span>{scrambledText}</span>;
};


function Header(){

    return (
        <>
            <motion.h1 
            className="text-4xl font-bold text-[#000015]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TextScramble text="Welcome Back" />
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Please login to continue!
          </motion.p>
        </>
    )
}
export default Header