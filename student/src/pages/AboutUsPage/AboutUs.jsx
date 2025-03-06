import { motion } from "framer-motion";
import { useEffect } from "react";
import '../../index.css'

function AboutUs(){
    useEffect(() => {
        const font = new FontFace("Liberty", "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/907368/liberty.otf')");
        font.load().then((loadedFont) => {
          document.fonts.add(loadedFont);
        });
      }, []);
    
      return (
        <div className="main flex items-center justify-center h-screen w-screen">
          <div className="text-[#7dffa0] text-3xl tracking-[-0.1em] flex  w-full font-[Liberty] space-x-5">
            <div className="space-x-1">
            <span className="inline-block text-shadow">A</span>
            <span className="inline-block text-shadow">B</span>
            <span className="inline-block text-shadow">O</span>
            <span className="inline-block text-shadow">U</span>
            <span className="inline-block text-shadow">T</span>
            </div>
            <div className="space-x-1">
            <span className="inline-block text-shadow"> A</span>
            <motion.span
              className="inline-block text-shadow"
              animate={{ rotate: [10, 13, 10], opacity: [1, 1, 0, 1] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              A
            </motion.span>
            <span className="inline-block text-shadow">D</span>
            <span className="inline-block text-shadow">U</span>
            <span className="inline-block text-shadow">K</span>
            <span className="inline-block text-shadow">A</span>
            <span className="inline-block text-shadow">L</span>
            <span className="inline-block text-shadow">A</span>
            <span className="inline-block text-shadow">M</span>
            </div>
           
          </div>
        </div>
      );
}

export default AboutUs;