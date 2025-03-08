import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../../index.css';
import Typewriter from "./frf";
import { Mail, Linkedin, Instagram, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from "sonner";

function AboutUs() {



  const [thank , setThank] = useState(0);

  const nav = useNavigate();



  useEffect(()=>{
    if(thank>5){
      toast.message("This site is made possible by the contributions of Prasanth , Poorvaja etc..",{
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
    <div className="main block h-screen w-screen overflow-hidden bg-[#242424]">
       <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#121212',
            color: '#ffffec',
            border: '1px solid #2b2b2b',
            borderRadius: '4px',
            fontFamily: 'JetBrains Mono, monospace',
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
              borderLeft: '4px solid #61dafb',
            },
          },
          duration: 5000,
        }}
      />
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 bg-[#242424] border-b-2 border-[#313131] text-[#ffffec] px-4 md:px-10">
        <div className="flex space-x-6 md:space-x-10">
          <button className="cursor-pointer basic-1 py-2 hover:text-[#61dafb] transition-colors">Login</button>
          <button className="cursor-pointer basic-1 py-2 hover:text-[#61dafb] transition-colors">Sign Up</button>
        </div>
        <button className="flex items-center space-x-2 cursor-pointer basic-1 py-2 hover:text-[#61dafb] transition-colors">
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex items-center w-full mx-auto px-4 py-8 md:py-12 mb-auto min-h-[calc(100vh-16rem)] overflow-hidden">
        {/* Title Section */}
        <div className="text-[#61dafb] w-full md:w-5/12 text-2xl md:text-3xl tracking-[-0.1em] flex flex-col sm:flex-row font-[Liberty] sm:space-x-5 mb-8 md:mb-12">
          <div className="space-x-1 mb-2 sm:mb-0">
            <span className="inline-block text-shadow">A</span>
            <span className="inline-block text-shadow">B</span>
            <span className="inline-block text-shadow">O</span>
            <span className="inline-block text-shadow">U</span>
            <span className="inline-block text-shadow">T</span>
          </div>
          <div className="space-x-1">
            <span className="inline-block text-shadow"> A</span>
            <motion.span
              className="inline-block text-shadow text-[#3a8bae] cursor-pointer"
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

        {/* Terminal-styled Developer Note with Typewriter Content */}
        <div className="w-full mx-auto mb-12 h-[40vh] bg-[#121212] rounded-md border border-[#2b2b2b] text-[#ffffec] flex flex-col shadow-lg overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center bg-[#1a1a1a] px-4 py-2 border-b border-[#2b2b2b]">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <p className="text-xs font-['Courier_New'] text-[#61dafb] flex-1 text-center">dev@aadukalam:~/note</p>
          </div>
          
          {/* Terminal Content - This div should be scrollable */}
          <div id="terminal-content" className="flex-1 overflow-y-auto h-full  custom-scrollbar p-6 font-['Courier_New']">
            <div className="flex items-center mb-4">
              <span className="text-[#61dafb] mr-2">$</span>
              <span className="text-[#61dafb] font-medium">cat note_from_developer.txt</span>
            </div>
            
            <div className="pl-4 border-l-2 border-[#3a8bae]">
              {/* Typewriter Content */}
              <Typewriter />
              <p className="text-right text-xs text-[#61dafb] mt-6">- Team Intellexa</p>
            </div>
            
            <div className="flex items-center mt-4 animate-pulse">
              <span className="text-[#61dafb] mr-2">$</span>
              <span className="h-4 w-2 bg-[#61dafb]"></span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white w-full py-6 border-t border-[#313131]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 justify-center md:justify-start">
              <div className="w-[120px] md:w-[180px] h-[60px] bg-[#242424] rounded-md flex items-center justify-center">
                  <img src="./Intellexa_Logo_black_bg-removebg-preview.png" className="mt-3 w-[170px]"/>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#ffffec]">Aadukalam</h3>
                <p className="text-xs text-[#61dafb] font-[Courier_New]">The DSA Battlefield</p>
              </div>
            </div>
            
            {/* College and Motto */}
            <div className="text-center order-3 md:order-2">
              <p className="text-sm text-[#ffffec]">Team Intellexa</p>
              <p className="text-xs italic text-[#61dafb] mb-2">"Innovate • Impact • Inspire"</p>
              <p className="text-xs text-gray-200">Rajalakshmi Engineering College - Chennai</p>
            </div>
            
            {/* Social Links */}
            <div className="order-2 md:order-3">
              <div className="flex items-center justify-center">
              <div className="block mx-auto">
                <div className="flex justify-center">
                <p className="mb-3 text-sm text-[#ffffec] mx-auto">Reach us on</p>

                </div>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-300 hover:text-[#61dafb] transition-colors p-2 hover:bg-[#242424] rounded-full">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-[#61dafb] transition-colors p-2 hover:bg-[#242424] rounded-full">
                    <Mail size={20} />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-[#61dafb] transition-colors p-2 hover:bg-[#242424] rounded-full">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
              </div>
              
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-[#636363] text-center text-xs text-gray-200">
            <p>© {new Date().getFullYear()} Aadukalam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;