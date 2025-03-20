import { motion } from "framer-motion"
import { useEffect, useState } from "react";

const TextScramble = ({ text , dt }) => {
  const [scrambledText, setScrambledText] = useState('');
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  

  
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame++;
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (frame > index*4) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      setScrambledText(scrambled);
      
      if (frame < text.length*4) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [text]);

  return <span>{scrambledText}</span>;
};


function Header({data1, data2 ,type , type2 , val}){

    let dt = false

    let d1 = data1
    let d2 = data2

    if(val){
      dt=true
      d1=d1.slice(1,-1)
      d2=d2.slice(1,-1)
    }

    return (
        <div className="flex flex-col items-center justify-center ">
            <motion.h1 
            className={`text-4xl  ${dt?"text-[#2bbda2]":"text-[#ddf3ef] font-bold"}  ${type}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TextScramble text={d1} dt={dt}/>
          </motion.h1>
          <motion.p 
            className={`text-[#ddf3ef] mt-2  p-0 m-0 w-fit ${dt?"":"hover:text-[#2bbdaa] transition-colors basic-1"}  ${type2}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {d2}
          </motion.p>
        </div>
    )
}
export default Header