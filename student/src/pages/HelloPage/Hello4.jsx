import React, { useEffect, useRef, useState } from 'react';

const MovingStarsBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set initial dimensions
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      
      // Update canvas size
      canvas.width = width;
      canvas.height = height;
    };
    
    updateDimensions();
    
    // Create stars
    const starCount = 150;
    const stars = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    
    // Animation function
    let animationFrameId;
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update stars
      stars.forEach(star => {
        // Get the current scroll position
        const scrollY = window.scrollY;
        
        // Adjust the y position based on scroll, creating a parallax effect
        const parallaxY = (star.y + scrollY * 0.2) % canvas.height;
        
        // Draw star
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.arc(star.x, parallaxY, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move star from left to right
        star.x += star.speed;
        
        // Reset star position when it goes off-screen
        if (star.x > canvas.width) {
          star.x = 0;
          star.y = Math.random() * canvas.height;
        }
      });
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    cons
    // Handle window resize
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="overflow-x-hidden h-[820vh] text-[#000015] bg-[#c168fd] relative">
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-screen bg-black"
      />
      
      {/* Example content */}
      <div className="relative z-10">
        <div className="h-[100vh]">
          <HelloPage isvisible={scrollY <= 100} />
        </div>
        <div className="flex w-full h-[100vh] text-xl">
          <SecondPart isvisible={scrollY} />
        </div>
      </div>
    </div>
  );
};

export default MovingStarsBackground;