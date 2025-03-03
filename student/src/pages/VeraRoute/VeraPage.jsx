import React, { useEffect, useState } from 'react';

const LanderPage = () => {
  const [noiseOpacity, setNoiseOpacity] = useState(0.2);
  
  // Add some subtle animation to the noise for a more dynamic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setNoiseOpacity(prev => 0.18 + Math.random() * 0.04);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-black overflow-hidden">
      {/* Noise overlay - using CSS to create the grainy effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Main text with chromatic aberration effect */}
      <div className="relative">
        {/* Red layer (slightly offset) */}
        <div 
          className="absolute text-4xl font-bold tracking-widest text-red-500"
          style={{ 
            transform: 'translate(-1px, 0px)',
            opacity: 0.8
          }}
        >
          HELLO WORLD!
        </div>
        
        {/* Blue layer (slightly offset) */}
        <div 
          className="absolute text-4xl font-bold tracking-widest text-blue-500"
          style={{ 
            transform: 'translate(1px, 0px)',
            opacity: 0.8
          }}
        >
          HELLO WORLD!
        </div>
        
        {/* Main white text */}
        <div className="relative text-4xl font-bold tracking-widest text-white">
          HELLO WORLD!
        </div>
      </div>
    </div>
  );
};

export default LanderPage;