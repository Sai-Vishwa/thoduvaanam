import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollAnimation = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 100); // Hide when scrolling down
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-[200vh] bg-gray-900 text-white flex flex-col items-center">
      {/* Main Section */}
      <div className="h-screen flex items-center justify-center text-6xl font-bold">
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={visible ? { x: 0, opacity: 1 } : { x: "-100vw", opacity: 0 }}
          transition={{ duration: 1 }}
        >
          1
        </motion.div>
      </div>

      {/* Dummy Info */}
      <div className="h-screen flex items-center justify-center text-4xl">
        Dummy Info Here
      </div>
    </div>
  );
};

export default ScrollAnimation;
