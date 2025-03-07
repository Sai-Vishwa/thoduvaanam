
import { motion } from "framer-motion";
import { useEffect } from "react";
import '../../index.css'
import Typewriter from "./frf";
function AboutUs(){

   
    useEffect(() => {
        const font = new FontFace("Liberty", "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/907368/liberty.otf')");
        font.load().then((loadedFont) => {
          document.fonts.add(loadedFont);
        });
      }, []);
      return (
        <div className="main block h-screen w-screen">
          <div className="flex items-center justify-between w-full h-[10vh] bg-[#242424] border-2 border-rounded-xl border-t-0 border-[#313131] text-[#ffffec]">
              <div className="flex space-x-10 ml-10 ">
                  <div className="cursor-pointer basic-1">Login</div>
                  <div className="cursor-pointer basic-1">Sign Up</div>
              </div>
              <div className="mr-10 cursor-pointer basic-1">
                  Back
              </div>
          </div>
          <div className="block">
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
              className="inline-block text-shadow text-[#4c9c62]"
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
          <div>
            <Typewriter />
          </div>
        </div>
      );
}
export default AboutUs;