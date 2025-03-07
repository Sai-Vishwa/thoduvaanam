import { useEffect, useState } from "react";

const Typewriter = () => {
  const text = `Hey coder,\n\n

Hope you brought more than just curiosity… because that won't get you far.\n

Aadukalam is a coding platform where we learn, compete, and grow together.\n
It's a battlefield of logic and problem-solving, designed to push your limits with challenges, contests, and leaderboards.\n
With hand-picked problems, this is the place to sharpen your skills and prove where you stand.\n\n

This Battlefield wouldn't exist without the people who believed it could happen.\n
To those who threw in ideas, stuck around when things broke, fixed my terrible decisions, and kept the spirit high, thank you.\n
This place runs on code, but it was built on your support.\n\n
`;
const [displayText, setDisplayText] = useState("");
const [index, setIndex] = useState(0);
const [cursorVisible, setCursorVisible] = useState(true);

useEffect(() => {
  if (index < text.length) {
    const timeout = setTimeout(() => {
      setDisplayText((prev) => prev + text[index]);
      setIndex(index + 1);
    }, 100);
    return () => clearTimeout(timeout);
  }
}, [index, text]);

useEffect(() => {
  const cursorBlink = setInterval(() => {
    setCursorVisible((prev) => !prev);
  }, 500);
  return () => clearInterval(cursorBlink);
}, []);

return (
  <div className="flex justify-start items-center h-full ">
    <p className="text-[#ffffec] text-xl font-mono">
      {displayText}
      <span className={` ${cursorVisible ? "inline" : "hidden"}`}>|</span>
    </p>
  </div>
);
};

export default Typewriter;