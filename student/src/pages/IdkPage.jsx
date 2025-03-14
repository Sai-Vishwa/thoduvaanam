import React, { useState, useEffect, useRef } from "react";

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [slideDirection, setSlideDirection] = useState(""); // "left" or "right"
  const timerRef = useRef(null);
  const typewriterRef = useRef(null);

  const images = [
    {
      id: 1,
      name: "Image 1",
      src: "/jiji2.png",
      info: "  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod tortor ac magna efficitur.",
      github: "github.com/user1",
      linkedin: "linkedin.com/in/user1"
    },
    {
      id: 2,
      name: "Image 2",
      src: "/jiji-removebg-preview.png",
      info: "  Praesent scelerisque magna in diam finibus, vel posuere nisi dignissim.",
      github: "github.com/user2",
      linkedin: "linkedin.com/in/user2"
    },
    {
      id: 3,
      name: "Image 3",
      src: "/___o____-removebg-preview.png",
      info: "  Donec ultrices dolor vel urna feugiat, eget lacinia dui tempor.",
      github: "github.com/user3",
      linkedin: "linkedin.com/in/user3"
    },
    {
      id: 4,
      name: "Image 4",
      src: "/download__1_-removebg-preview.png",
      info: "  Etiam malesuada tellus id felis pulvinar, quis laoreet est tempus.",
      github: "github.com/user4",
      linkedin: "linkedin.com/in/user4"
    },
    
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

  // Auto-rotation with proper cleanup
//   useEffect(() => {
//     timerRef.current = setTimeout(() => {
//       setSlideDirection("left");
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 8000);
    
//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
//     };
//   }, [currentIndex, images.length]);

  const nextSlide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setSlideDirection("left");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setSlideDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getImageIndex = (index) => {
    return (index + images.length) % images.length;
  };

  // Generate slide animation classes based on direction
  const getSlideAnimationClass = (position) => {
    if (slideDirection === "") return "";
    
    if (position === "left") {
      return slideDirection === "left" 
        ? "animate-slide-out-left" 
        : "animate-slide-in-left";
    } else if (position === "center") {
      return slideDirection === "left" 
        ? "animate-slide-left" 
        : "animate-slide-right";
    } else if (position === "right") {
      return slideDirection === "left" 
        ? "animate-slide-in-right" 
        : "animate-slide-out-right";
    }
    return "";
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <style jsx>{`
        @keyframes slideLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes slideRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        .animate-slide-left {
          animation: slideLeft 0.5s ease-in-out;
        }
        .animate-slide-right {
          animation: slideRight 0.5s ease-in-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-in-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-in-out;
        }
        .animate-slide-out-left {
          animation: slideOutLeft 0.5s ease-in-out;
        }
        .animate-slide-out-right {
          animation: slideOutRight 0.5s ease-in-out;
        }
      `}</style>
      <div className="block space-y-5"> 
        <div className="flex items-center justify-center -space-x-[18vh] relative">
          {/* Left Image */}
          <div 
            className={`h-[40vh] w-[30vh] z-10 opacity-70 cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 ${getSlideAnimationClass("left")}`}
            onClick={prevSlide}
          >
            <div className="w-full h-full">
              <div className="relative w-full h-full">
                <img
                  src={images[getImageIndex(currentIndex - 1)].src}
                  alt={images[getImageIndex(currentIndex - 1)].name}
                  className="object-cover w-full h-full blur-sm opacity-70 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className={`w-[30vh] h-[40vh] relative z-30 transition-all duration-500 ease-in-out transform ${getSlideAnimationClass("center")}`}>
            <div 
              className="flex items-center justify-center z-20 w-full h-full"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative w-full h-full">
                <img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].name}
                  className="object-cover w-full h-full shadow-lg rounded-lg transition-all duration-500"
                />
                {isHovering && (
                  <div className="bg-black bg-opacity-80 w-full h-full flex flex-col items-center justify-center absolute top-0 rounded-lg transition-opacity duration-300">
                    <p className="text-white text-center p-4 h-1/2 overflow-hidden">
                      {typedText}
                      {isTyping && <span className="inline-block w-1 h-4 bg-white ml-1 animate-ping"></span>}
                    </p>
                    <div className="flex justify-center space-x-4 mt-4">
                      <a href={images[currentIndex].github} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-300 transition-colors">
                        <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                      <a href={images[currentIndex].linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-300 transition-colors">
                        <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div 
            className={`h-[40vh] w-[30vh] z-10 opacity-70 cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 ${getSlideAnimationClass("right")}`}
            onClick={nextSlide}
          >
            <div className="w-full h-full">
              <div className="relative w-full h-full">
                <img
                  src={images[getImageIndex(currentIndex + 1)].src}
                  alt={images[getImageIndex(currentIndex + 1)].name}
                  className="object-cover w-full h-full blur-sm opacity-70 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Name with Animation */}
        <div className="flex justify-center">
          <div className="text-lg font-semibold transition-all duration-500 ease-in-out transform">
            {images[currentIndex].name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;