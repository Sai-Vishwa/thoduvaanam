import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import searchlogo from "../../assets/image.png";
import Cookies from "js-cookie";
import Header from "../../components/Common/Header";
import Topic from "../../components/HomePageComponents/Topic";
import Profile from "../../components/HomePageComponents/Profile";

function HomePage() {
  const { uname } = useParams();
  const ne = uname.slice(1);
  console.log(ne);
  const nav = useNavigate();
  const [allData, setAllData] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);

  const fetchData = async () => {
    const session = Cookies.get("session");
    console.log("sending a post req")
    const result = await fetch("http://localhost:4000/basic/home", {
      method: "POST",
      body: JSON.stringify({ uname: uname, session: session }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    console.log("sent req and recieved response")
    const data = await result.json()
    setAllData(data)
  }


  useEffect(() => {
    const session = Cookies.get("session");
    if (!session) {
      alert("first login to access this route");
      nav("/login-signup")
    }

    if (Object.keys(allData).length == 0) {
      fetchData()
    }
  }, [])

  const topics = [
    { id: 1, name: "Arrays" },
    { id: 2, name: "Strings" },
    { id: 3, name: "Linked Lists" },
    { id: 4, name: "Dynamic Programming" },
    { id: 5, name: "Graphs" },
    { id: 6, name: "Trees" },
    { id: 7, name: "Hash Tables" },
  ];
  useEffect(() => {
    console.log("Updated selectedTopic state:", selectedTopic);
  }, [selectedTopic]);

  return (
    <div className="body bg-dark-blue">
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Header />
      <Profile profileData={allData.myData} />
      {allData.data &&
        allData.data.map((topic) => (
          <Topic key={topic.id} topic={topic} uname={ne} />
        ))}
      <div style={{ display: "flex", height: "80%", padding: "16px" }}>
        {/* Sidebar */}
        <div style={{ width: "30%", backgroundColor: "rgba(80, 76, 152, 0.36)", color: "white", borderRadius: "12px", padding: "16px", overflowY: "auto", textAlign: "left", marginLeft: "100px" }}>
          <h2 style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "16px", textAlign: "center", textDecoration: "underline" }}>Topics</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {topics.map((topic) => (
              <li
                key={topic.id}
                style={{
                  padding: "15px",
                  fontSize: "17px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  alignItems: "center",
                  backgroundColor: selectedTopic?.id === topic.id ? "#1e90ff" : "transparent",
                  transition: "background-color 0.3s",
                  pointerEvents: "auto", // Ensure clicks are registered
                  position: "relative", // Prevent overlapping issues
                  zIndex: 10, // Ensure it's clickable
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent any outer divs from interfering
                  console.log("Clicked topic:", topic);
                  setSelectedTopic(topic);
                }}
              >
                {topic.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Topic Details */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {selectedTopic ? (
            <div style={{ width: "50%", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", border: "1px solid #ddd", borderRadius: "12px", backgroundColor: "#F5FEFD", padding: "50px" }}>
              <h2 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "30px", color: "black" }}>{selectedTopic.name}</h2>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <button
                  style={{ backgroundColor: "#28a745", color: "white", padding: "12px 24px", border: "none", borderRadius: "8px", cursor: "pointer" }}
                  onClick={() => nav(`/practice/${selectedTopic.id}`)}
                >
                  📝 Practice
                </button>
                <button
                  style={{ backgroundColor: "#dc3545", color: "white", padding: "12px 24px", border: "none", borderRadius: "8px", cursor: "pointer" }}
                  onClick={() => nav(`/contest/${selectedTopic.id}`)}
                >
                  🏆 Contest
                </button>
              </div>
            </div>
          ) : (
            <p style={{ fontSize: "18px", color: "#fff" }}>Select a topic to begin</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;