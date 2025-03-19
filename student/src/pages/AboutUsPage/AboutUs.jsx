import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../index.css';
import Typewriter from "./frf";
import { Mail, Linkedin, Instagram, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from "sonner";
import AboutUsNav from "../../components/AboutUsPageComponents/AboutUsNav";
import CommonFooter from "../../components/Common/CommonFooter";
import ImageCarousel from "./Carosel";
function AboutUs() {
  const [thank , setThank] = useState(0);
  const nav = useNavigate();
  useEffect(()=>{
    if(thank>5){
      toast.success("Just like this hidden message.. Thanks to",{
        className:""
      })
      setThank(0);
    }
  },[thank])
  useEffect(() => {
    const font = new FontFace("Liberty", "url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/907368/liberty.otf')");
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  }, []);

  return (
    <div className="main block md:h-[180vh] sm:h-[180vh] xs:h-[180vh] lg:h-[100vh] w-screen bg-[#242424] relative">
      <Toaster
   position="top-right"
   toastOptions={{
     style: {
       background: '#121212',
       color: '#ddf3ef',
       border: '1px solid #2b2b2b',
       borderRadius: '4px',
       fontSize: '14px',
       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
     },
     className: 'sonner-terminal-toast',
     success: {
       icon: '✓',
       style: {
         borderLeft: '4px solid #27c93f',
       },
     },
     error: {
       icon: '×',
       style: {
         borderLeft: '4px solid #ff5f56',
       },
     },
     warning: {
       icon: '!',
       style: {
         borderLeft: '4px solid #ffbd2e',
       },
     },
     info: {
       icon: 'i',
       style: {
         borderLeft: '4px solid #36ead2',
       },
     },
     duration: 5000,
   }}
 />
   <div className="w-full h-[10vh]"> 
   
         <AboutUsNav />
         </div>
         <div className="lg:h-[70vh] md:h-[150vh] sm:h-[150vh] xs:h-[150vh] font-[Liberty]">
         <main className="flex  w-full mx-auto px-4  mb-auto h-full">
         <div className = "md:w-5/12 w-full">
        <div className="text-[#36ead2] mt-2 w-full h-1/6 text-2xl md:text-3xl tracking-[-0.1em] flex flex-col sm:flex-row font-[Liberty] sm:space-x-5">
          <div className="space-x-1 mb-0 flex flex-nowrap">
            <span className="inline-block text-shadow">A</span>
            <span className="inline-block text-shadow">B</span>
            <span className="inline-block text-shadow">O</span>
            <span className="inline-block text-shadow">U</span>
            <span className="inline-block text-shadow">T</span>
          </div>
          <div>
          <div className="space-x-1 flex flex-nowrap">
            <span className="inline-block text-shadow"> A</span>
            <motion.span
              className="inline-block text-shadow text-[#28ac9a] cursor-pointer"
              onClick={()=>{setThank(thank+1)}}
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
        <div className = "w-full h-5/6">
          <ImageCarousel />
          </div>
        </div>
        {/* Terminal-styled Developer Note with Typewriter Content */}
        <div className="w-full mx-auto  h-[62vh] mt-4 bg-[#121212] rounded-md border border-[#2b2b2b] text-[#ddf3ef] flex flex-col shadow-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center bg-[#1a1a1a] px-4 py-2 border-b border-[#2b2b2b]">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <p className="text-xs font-['Courier_New'] text-[#36ead2] flex-1 text-center">dev@aadukalam:~/note</p>
          </div>
          
          {/* Terminal Content - This div should be scrollable */}
          <div id="terminal-content" className="flex-1 overflow-y-auto h-full  custom-scrollbar p-6 font-['Courier_New']">
            <div className="flex items-center mb-4">
              <span className="text-[#36ead2] mr-2">$</span>
              <span className="text-[#36ead2] font-medium">cat note_from_developer.txt</span>
            </div>
            
            <div className="pl-4 border-l-2 border-[#209888]">
              {/* Typewriter Content */}
              <Typewriter />
              <p className="text-right text-xs text-[#36ead2] mt-6">- Team Intellexa</p>
            </div>
            
            <div className="flex items-center mt-4 animate-pulse">
              <span className="text-[#36ead2] mr-2">$</span>
              <span className="h-4 w-2 bg-[#36ead2]"></span>
            </div>
          </div>
        </div>
      </main>
      </div>
      <div className="w-full absolute transform bottom-0">
          
          <CommonFooter />
          </div>
          </div>
  );
}
export default AboutUs;
