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

  async function fetchdata() {
      const lb = await fetch("http://localhost:4000/basic/leaderboard",{
        method:"POST",
        body: "{}",
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = await lb.json()
    setLeaderBoard(data)
  }

  useEffect(() => {
      if(Object.keys(leaderBoard)===0){
        fetchdata()
      }
  }, []);
  const getMedalImage = (rank) => {
    if (rank === 1) return goldMedal;
    if (rank === 2) return silverMedal;
    if (rank === 3) return bronzeMedal;
    return null;
  };
  const getRowColor = (rank) => (rank % 2 === 0 ? "#7A5CFA" : "#4A3DA0");
  return (
    <div className="bodies">
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

        {leaderBoard.length === 0 ? (
          <motion.p 
            className="loading-text"
            initial={{ scale: 0.8, color: "#ff0099" }}
            animate={{ scale: 1, color: "#00ffcc" }}
            transition={{ duration: 0.5 }}
          >
            Loading leaderboard...
          </motion.p>
        ) : (
          <motion.table 
            className="leaderboard-table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ width: "90%", height:"30vh",margin: "auto", borderCollapse: "collapse", background: "transparent", borderRadius: "12px" }}
          >
            <thead>
              <motion.tr 
               initial={{ backgroundColor: "#8A2BE2" }}
               animate={{ backgroundColor: "#6A5ACD" }}
                transition={{ duration: 1 }}
                style={{ color: "white",fontSize:"20px"}}
              >
                <th style={{padding:"10px"}}>Rank</th>
                <th style={{padding:"10px"}}>Name</th>
                <th style={{padding:"10px"}}>Score</th>
              </motion.tr>
            </thead>
            <tbody>
              {leaderBoard?.data?.map((player, index) => (
                <motion.tr 
                className="cursor-pointer"
                onClick={()=>{nav(`/${player.uname}`)}}
                  key={player.id} 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ 
                    backgroundColor: getRowColor(index + 1),
                    color: "white", 
                    textAlign: "center", 
                    fontWeight: "bold", 
                    transition: "background-color 0.1s ease"
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: "#E6E6FA" ,color:"black"}}
                >
                  <td style={{ fontWeight: "bold",padding:"10px" }}>
                    {getMedalImage(index + 1) ? (
                      <img src={getMedalImage(index + 1)} alt="medal" style={{ width: "45px", height: "35px", marginLeft:"40px",padding:"0px" }} />
                    ) : (
                      index + 1
                    )}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </motion.div>
    </div>
  );
}

export default LeaderBoardPage;
