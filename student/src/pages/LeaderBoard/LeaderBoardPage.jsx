import { useEffect, useState } from "react";
import "./index.css";
import { motion } from "framer-motion";
import goldMedal from "../../assets/goldmedal.png";
import silverMedal from "../../assets/silvermedal.png";
import bronzeMedal from "../../assets/bronzemedal.webp";
import { useNavigate } from "react-router-dom";

function LeaderBoardPage() {
  const nav = useNavigate();
  const [leaderBoard, setLeaderBoard] = useState([]);


  
  return (
    <div className="bodies main">
      {[1, 2, 3, 4].map((i) => (
        <div className="glowing" key={i}>
          <span style={{ "--i": 1 }}></span>
          <span style={{ "--i": 2 }}></span>
          <span style={{ "--i": 3 }}></span>
        </div>
      ))}
      <motion.div 
        className="leaderboard-container absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ textAlign: "center", padding: "10px", background: "transparent", borderRadius: "12px" }}
      >
        <motion.h2 
          className="leaderboard-title"
          initial={{ y: -50, color: "#00E6E6" }}
          animate={{ y: 0, color: "#FFD700" }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "3rem", fontWeight: "bold" ,marginBottom:"20px"}}
        >
          🏆 Leaderboard 🏆
        </motion.h2>

        
          <motion.p 
            className="loading-text"
            initial={{ scale: 0.8, color: "#ff0099" }}
            animate={{ scale: 1, color: "#00ffcc" }}
            transition={{ duration: 0.5 }}
          >
            Loading leaderboard...
          </motion.p>
        
      </motion.div>
    </div>
  );
}

export default LeaderBoardPage;
