import React, { useEffect, useState } from 'react';
import './LanderPage.scss'
import Hello1 from './Hello1';
import { Mail, Linkedin, Instagram } from 'lucide-react';

const LanderPage = () => {
  
  
  return (
    <div className='main block text-6xl text-white w-full h-screen overflow-hidden'>
      <Hello1 
      isvisible={true}/>
      <footer className="bg-gray-900 text-white w-full h-5/6 flex items-center overflow-hidden">
        <div className="w-full  mx-auto px-4 py-2 flex flex-row items-center justify-around">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img 
              src="/Intellexa_Logo_black_bg-removebg-preview.png" 
              alt="Intellexa Logo" 
              className="w-[180px]"
            />
            <div>
              <h3 className="text-base font-semibold">Aadukalam</h3>
              <p className="text-xs text-gray-400">The DSA Battlefield</p>
            </div>
          </div>

          {/* College and Motto */}
          <div className="text-center hidden md:block">
          <p className="text-sm text-gray-300">Team Intellexa </p>
          <p className="text-xs italic text-gray-400 mb-5">"Innovate • Impact • Inspire"</p>
            <p className="text-xs text-gray-300">Rajalakshmi Engineering College - Chennai</p>
          </div>
          
          {/* Social Links */}
          <div className='block '>
            <div className='flex justify-center items-center mb-4'>
              <p>Reach us on </p>
            </div>
            <div className="flex items-center space-x-4 justify-center">
                    <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                      <Linkedin size={16} />
                    </a>
                    <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                      <Mail size={16} />
                    </a>
                    <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                      <Instagram size={16} />
                    </a>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default LanderPage;