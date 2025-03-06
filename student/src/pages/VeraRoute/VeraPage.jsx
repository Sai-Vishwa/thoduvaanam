import React, { useEffect, useState } from 'react';
import './LanderPage.scss'
import Hello1 from './Hello1';
import { Mail, Linkedin, Instagram } from 'lucide-react';

const LanderPage = () => {
  
  
  return (
    <div className='main block text-6xl text-white w-full h-screen overflow-hidden'>
      <Hello1 
      isvisible={true}/>
      
    </div>
  );
};

export default LanderPage;