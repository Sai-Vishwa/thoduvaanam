import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const typewriterRef = useRef(null);

  const images = [
    {
      id: 1,
      name: "Saivishwa",
      dept: "III yr CSE",
      src: "/sai.jpg",
      info: "Hii... Finally this site became a success",
      github: "github.com/user1",
      linkedin: "linkedin.com/in/user1"
    },
    {
      id: 2,
      name: "Prasanth S",
      dept: "III yr CSE",
      src: "/IMG_20250315_204644.jpg",
      info: "  En peru Vella Prasanth. Na oru developer. I eat 100 Harkirat Singh for breakfast.",
      github: "github.com/user1",
      linkedin: "linkedin.com/in/user1"
    },
    {
      id: 3,
      name: "Poorvaja",
      dept: "III yr IT",
      src: "/download__1_-removebg-preview.png",
      info: "  Hi this is Poorvaja ",
      github: "github.com/user2",
      linkedin: "linkedin.com/in/user2"
    },
    {
      id: 4,
      name: "Rakul Prakash",
      dept:"III yr CSE",
      src: "/download__1_-removebg-preview.png",
      info: "  Donec ultrices dolor vel urna feugiat, eget lacinia dui tempor.",
      github: "github.com/user3",
      linkedin: "linkedin.com/in/user3"
    },
    {
      id: 5,
      name: "SRK",
      dept:"II yr CSE",
      src: "/download__1_-removebg-preview.png",
      info: "  Etiam malesuada tellus id felis pulvinar, quis laoreet est tempus.",
      github: "github.com/user4",
      linkedin: "linkedin.com/in/user4"
    },
    {
        id: 6,
        name: "Surweesh",
        dept:"II yr AIML",
        src: "/download__1_-removebg-preview.png",
        info: "  Etiam malesuada tellus id felis pulvinar, quis laoreet est tempus.",
        github: "github.com/user4",
        linkedin: "linkedin.com/in/user4"
      },
      {
        id: 7,
        name: "Aaditya",
        dept:"II yr IT",
        src: "/download__1_-removebg-preview.png",
        info: "  Etiam malesuada tellus id felis pulvinar, quis laoreet est tempus.",
        github: "github.com/user4",
        linkedin: "linkedin.com/in/user4"
      },
      {
        id: 8,
        name: "Jeffrin",
        dept:"III yr AIML",
        src: "/download__1_-removebg-preview.png",
        info: "  Etiam malesuada tellus id felis pulvinar, quis laoreet est tempus.",
        github: "github.com/user4",
        linkedin: "linkedin.com/in/user4"
      },
    // You can add more images here and it will still work properly
  ];

  // Reset and start typewriter effect
  const startTypewriter = () => {
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current);
    }
    
    setTypedText("");
    setIsTyping(true);
    
    let i = 0;
    const text = images[currentIndex].info;
    
    typewriterRef.current = setInterval(() => {
      if (i < text.length) {
        setTypedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typewriterRef.current);
        setIsTyping(false);
      }
    }, 30);
  };

  // Clear typewriter on unmount
  useEffect(() => {
    return () => {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
      }
    };
  }, []);

  // Handle hover state changes
  useEffect(() => {
    if (isHovering) {
      startTypewriter();
    } else {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
        setTypedText("");
      }
    }
  }, [isHovering, currentIndex]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Get index with proper wrapping for prev/next images
  const getIndex = (offset) => {
    return (currentIndex + offset + images.length) % images.length;
  };

  // Determine if an image should be visible (only show 3 images: prev, current, next)
  const shouldShowImage = (index) => {
    const normalizedIndex = (index + images.length) % images.length;
    const prevIndex = getIndex(-1);
    const nextIndex = getIndex(1);
    
    return normalizedIndex === currentIndex || normalizedIndex === prevIndex || normalizedIndex === nextIndex;
  };

  // Get position styles for visible images
  const getImageStyles = (index) => {
    // Normalize index relative to currentIndex
    const normalizedPos = ((index - currentIndex) + images.length) % images.length;
    
    // Adjust for minimum distance around the circle
    let position;
    if (normalizedPos === 0) {
      position = 0; // Center
    } else if (normalizedPos === 1 || normalizedPos === images.length - 1) {
      position = normalizedPos === 1 ? 1 : -1; // Next or Previous
    } else {
      return { display: "none" }; // Hide other images
    }
    
    // Define positions
    const positions = {
        // Center (active)
        0: {
          zIndex: 30,
          left: "50%",
          transform: "translateX(-50%) scale(1)",
          opacity: 1,
          filter: "blur(0px)"
        },
        // Right (next) - move closer to center
        1: {
          zIndex: 20,
          left: "75%",  // Changed from 75% to 60%
          transform: "translateX(-50%) scale(0.85)",
          opacity: 0.8,
          filter: "blur(1px)"
        },
        // Left (previous) - move closer to center
        [-1]: {
          zIndex: 20,
          left: "25%",  // Changed from 25% to 40%
          transform: "translateX(-50%) scale(0.85)",
          opacity: 0.8,
          filter: "blur(1px)"
        }
      };

    return {
      ...positions[position],
      transition: isAnimating ? "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
      display: "block"
    };
  };
  

  return (
    <motion.div className="w-full h-full font-[Courier]"
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:3 , ease:"easeInOut"}}>
        <div className=" w-full h-full relative">

        <div className="w-full absolute ">
        {/* Render all images but only show 3 */}
        {images.map((image, index) => {
          const styles = getImageStyles(index);
          const isCenter = index === currentIndex;
          const isPrev = index === getIndex(-1);
          const isNext = index === getIndex(1);
          
          // Only render if this image should be visible
          if (!shouldShowImage(index)) {
            return null;
          }
          
          return (
            <div 
              key={image.id}
              className="image-container "
              style={styles}
              onClick={() => {
                if (isPrev) prevSlide();
                if (isNext) nextSlide();
              }}
            >
              <div className="relative flex  w-full h-full">
                <img
                  src={image.src}
                  alt={image.name}
                  className={`object-cover bg-[#2bbdaa] w-full h-full shadow-lg rounded-lg `}
                />
                
                {/* Overlay for center image */}
                {isCenter && isHovering && (
                  <div className="bg-black bg-opacity-80 w-full h-full flex flex-col justify-between p-5  absolute top-0 rounded-lg transition-opacity duration-300 fadeIn">
                    <p className="text-[#36ead2] text-center text-sm h-4/6 overflow-hidden">
                      {typedText}
                      {isTyping && <span className="inline-block w-1 h-4 bg-[#ddf3ef] ml-1 animate-ping"></span>}
                    </p>
                    <div className="flex justify-center space-x-2 text-xs">
                      <a href={image.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#ddf3ef]  transition-colors">
                        <svg className="w-4 h-4 mr-1" fill="#36ead2" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <p onClick={()=>{alert("hi")}}>Github</p>
                      </a>
                      <a href={image.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#ddf3ef] hover:text-blue-300  cursor-potransition-colors">
                        <svg className="w-4 h-4 mr-1" fill="#36ead2" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <p>LinkedIn</p>
                      </a>
                    </div>
                  </div>
                )}
                
              </div>
              {isCenter && <div className="text-lg font-semibold text-[#ddf3ef] transition-all duration-500 ease-in-out">
                {images[currentIndex].name}
            </div>}
            {isCenter && <div className="text-xs font-semibold text-[#ddf3ef] transition-all duration-500 ease-in-out">
                {images[currentIndex].dept}
            </div>
            } 
              
            
            </div>
          );
        })}
        

        {/* Center image hover detection */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-30vh h-40vh z-50 pointer-events-auto"
          style={{ width: "30vh", height: "40vh" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
                    
      </div>

 
      

      <div className="absolute bottom-0 w-full mb-6 p-2 rounded-xl z-30  flex items-center justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`indicator w-3 h-3 rounded-full transition-all focus:outline-none
              ${index === currentIndex 
                ? 'bg-[#36ead2] border-1 border-[#36ead2]' 
                : 'bg-[#ddf3ef] hover:bg-gray-400 border-1 border-[#36ead2]'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>      
        </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .image-container {
          position: absolute;
          top: 0;
          height: 40vh;
          width: 30vh;
          cursor: pointer;
          transition-property: transform, opacity, filter, left;
        }
        .fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .indicator {
          transition: all 0.3s ease;
        }
        .indicator-active {
          transform: scale(1.5);
        }
      `}</style>
      
      
    </motion.div>
  );
};

export default ImageCarousel;