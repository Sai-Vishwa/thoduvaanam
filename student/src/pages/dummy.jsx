import React, { useEffect, useState } from 'react';

const SnowBackground = ({ children }) => {
  const [snowflakes, setSnowflakes] = useState([]);
  
  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 150 }, () => createSnowflake());
    setSnowflakes(initialSnowflakes);
    
    // Animation loop
    const animationFrame = requestAnimationFrame(animateSnow);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  // Create a new snowflake with random properties
  const createSnowflake = () => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100, // percentage across screen
      y: Math.random() * 100 * -1, // start above the viewport
      size: Math.random() * 0.5 + 0.2, // size between 0.2 and 0.7rem
      opacity: Math.random() * 0.6 + 0.4, // opacity between 0.4 and 1
      speed: Math.random() * 0.5 + 0.5, // speed factor
      wobble: Math.random() * 2 - 1, // wobble factor for horizontal movement
    };
  };
  
  // Animate snow
  const animateSnow = () => {
    setSnowflakes(prevSnowflakes => {
      return prevSnowflakes.map(flake => {
        // Update position
        let newY = flake.y + flake.speed * 0.1;
        let newX = flake.x + Math.sin(newY * 0.02) * flake.wobble * 0.2;
        
        // If snowflake goes off-screen, reset it
        if (newY > 100) {
          return createSnowflake();
        }
        
        return {
          ...flake,
          y: newY,
          x: newX
        };
      });
    });
    
    requestAnimationFrame(animateSnow);
  };
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Fixed position background with snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {snowflakes.map(flake => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${flake.x}%`,
              top: `${flake.y}%`,
              width: `${flake.size}rem`,
              height: `${flake.size}rem`,
              opacity: flake.opacity,
              filter: 'blur(1px)',
              willChange: 'transform',
            }}
          />
        ))}
      </div>
      
      {/* Content layer that sits above the snow */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SnowBackground;