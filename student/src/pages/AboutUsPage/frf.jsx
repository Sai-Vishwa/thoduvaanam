import { useEffect, useState, useRef } from "react";

const Typewriter = () => {
  const text = [
    `Hey coder,`,
    `Aadukalam is a coding platform where we learn, compete, and grow together.`,
    `It's a battlefield of logic and problem-solving, designed to push your limits with challenges, contests, and leaderboards. With hand-picked problems, this is the place to sharpen your skills and prove where you stand.`,
    `This Battlefield wouldn't exist without the people who believed it could happen.`,
    `To those who threw in ideas, stuck around when things broke, fixed terrible decisions, and kept the spirit high, thank you.`,
    `This battlefied runs on code, but it was built on your support.`
  ];
  
  const [displayText, setDisplayText] = useState({0:"",1:"",2:"",3:"",4:"",5:""});
  const [index, setIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [arr, setArr] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  // Ref for the container to enable auto-scrolling
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);
  
  // Auto-scroll function
  const scrollToBottom = () => {
    if (activeLineRef.current) {
      // Find the parent scrollable container
      let parent = activeLineRef.current.parentElement;
      while (parent && !parent.classList.contains('custom-scrollbar')) {
        parent = parent.parentElement;
      }
      
      if (parent) {
        const lineBottom = activeLineRef.current.offsetTop + activeLineRef.current.offsetHeight;
        const containerHeight = parent.clientHeight;
        const scrollTop = parent.scrollTop;
        
        // If the current line is below the visible area, scroll to it
        if (lineBottom > scrollTop + containerHeight - 50) {
          parent.scrollTo({
            top: lineBottom - containerHeight + 50,
            behavior: 'smooth'
          });
        }
      }
    }
  };
  
  // Smooth typing effect with variable speed
  useEffect(() => {
    if (arr < 6 && index < text[arr].length) {
      // Adjust typing speed based on punctuation
      const charSpeed = 
        text[arr][index] === ',' ? 150 : 
        text[arr][index] === '.' ? 250 : 
        text[arr][index] === '!' ? 250 : 
        text[arr][index] === '?' ? 200 : 30;
      
      const timeout = setTimeout(() => {
        setDisplayText((prev) => ({
          ...prev,
          [arr]: prev[arr] + text[arr][index]
        }));
        setIndex(index + 1);
        
        // Scroll to the current line position after text update
        setTimeout(scrollToBottom, 0);
      }, charSpeed);
      
      return () => clearTimeout(timeout);
    } else if (arr < 5 && index >= text[arr].length) {
      // Pause between paragraphs
      const pauseTimeout = setTimeout(() => {
        setArr(arr + 1);
        setIndex(0);
      }, 100);
      
      return () => clearTimeout(pauseTimeout);
    } else if (arr === 5 && index >= text[arr].length) {
      setCompleted(true);
    }
  }, [index, text, arr]);
  
  // Cursor blink effect
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    
    return () => clearInterval(cursorBlink);
  }, []);
  
  return (
    <div className="flex justify-start w-full font-['Courier_New'] h-full" ref={containerRef}>
      <div className="text-[#ddf3ef] text-sm md:text-base space-y-2 leading-relaxed w-full">
        {Object.keys(displayText).map((line, i) => (
          <div 
            key={line} 
            className={`transition-opacity duration-500 ${
              displayText[line].length > 0 ? 'opacity-100' : 'opacity-0'
            }`}
            ref={i == arr ? activeLineRef : null}
          >
            <p className="leading-relaxed">
              {displayText[line]}
              <span 
                className={`text-[#2bbdaa] ${
                  cursorVisible && (i == arr || (i == 5 && completed)) ? "inline-block" : "hidden"
                }`}
              >
                |
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Typewriter;