import { useState, useEffect } from "react";

const Timer = ({ minutes }) => {
  const [time, setTime] = useState(minutes * 60);

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => setTime((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div
      className={`p-4 text-2xl font-bold border-4 ${
        time <= 600 ? "border-red-500" : "border-gray-500"
      }`}
    >
      Time Left: {formatTime(time)}
    </div>
  );
};

export default Timer;
