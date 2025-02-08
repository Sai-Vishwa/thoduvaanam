import { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import "./index.css"
import searchlogo from "../../assets/image.png"
import Cookies from 'js-cookie';

function HomePage(){
    const {uname} = useParams()
    const ne = uname.slice(1)
    console.log(ne); 
    const nav = useNavigate();
    const [allData,setAllData] = useState({});
    useEffect(()=>{
        const session = Cookies.get("session");
        if(!session){
          alert("first login to access this route");
          nav("/login-signup")
      }
        const fetchData = async () =>{
          const session = Cookies.get("session");
          const result = await fetch("http://localhost:4000/basic/home",{
            method:"POST",
            body: JSON.stringify({uname:ne , session: session}),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
          const data = await result.json()
          console.log(JSON.stringify(data))
        }
        fetchData();
        
        
    },[])
    const topics = [
        { name: "Data Structures", notesLink: "/notes/dsa" },
        { name: "Algorithms", notesLink: "/notes/algo" },
        { name: "C Program", notesLink: "/notes/c" },
        { name: "Java Program", notesLink: "/notes/java" },
        { name: "Python", notesLink: "/notes/py" },
      ];
      
      const problems = [
        { name: "Two Sum", completed: true },
        { name: "Binary Search", completed: false },
        { name: "Breadth First Search", completed: true },
        { name: "Depth First Search", completed: false },
        { name: "Matrix", completed: false },
      ];
      
      const contests = [
        { name: "Codeforces Round", completed: true },
        { name: "LeetCode Biweekly", completed: false },
        { name: "HackerRanker Biweekly", completed: false },
        { name: "LeetCode Biweekly", completed: true },
      ];
    return (
        <div>
<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>
<div class="content">
  <nav>
    <div className="profile">
        <a href="#"><img src="https://th.bing.com/th/id/OIP.TN84RunoeQpTrZvWEAFfFQHaHw?rs=1&pid=ImgDetMain"/></a>
        <p>Username</p>
    </div>
    <div  className="topic animate-[bounce_2s]"><h1>Transform your coding journey !🚀</h1></div>
    
    <div className="search">
         <input type="search" placeholder="search here" />
         <img src={searchlogo} className="searchlogo"/>
    </div>
  </nav>
  <div className="min-h-screen ">

      <div className="p-6 topic-container">
        {/* Topics & Notes */}
        <div className=" sub-topic">
        <h2 className=" text-white text-2xl font-bold mt-3 mb-6 underline ">Topics & Notes</h2>
        <div className="">
          {topics.map((topic, index) => (
            <div key={index} className="p-6 shadow-md  box-container animate-[pulse_1s]">
            <h3 className="text-lg font-semibold">{topic.name}</h3>
            <a href={topic.notesLink} className="text-blue-500 ml-5 font-bold" download>View Notes</a>
             </div>
            
          ))}</div>
        </div>

        {/* Problems */}
        <div className=" sub-topic">
        <h2 className="text-white text-2xl font-bold mt-3 mb-6 underline">Problems</h2>
        <div className="">
          {problems.map((problem, index) => (
            <div key={index} className="p-4 shadow-md  box-container animate-[pulse_1s]">
            <div >
              <h3 className="text-lg mb-3">{problem.name}</h3>
              </div>
              <div className="ml-7">
              <a href="#" className={`px-2 py-1 rounded-md ${problem.completed ? "text-green-600 font-bold" : "text-red-500 font-bold "} text-white`}>
                {problem.completed ? "Completed" : "Pending"}
              </a>
              <a href="#" className={`px-2 py-1 rounded-md ${problem.completed ? "text-green-600 font-bold" : ""} text-white`}>
                {problem.completed ? "View" : ""}
              </a>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Contests */}
        <div className=" sub-topic">
        <h2 className="text-white text-2xl font-bold mt-3 mb-6 underline">Contests</h2>
        <div className="">
          {contests.map((contest, index) => (
            <div key={index} className="p-4 shadow-md  box-container animate-[pulse_1s]">
            <div className="">
              <h3 className="text-lg mb-3">{contest.name}</h3>
              </div>
              <div className="ml-7">
              <a href="#" className={`px-2 py-1 rounded-md ${contest.completed ? "text-green-600 font-bold" : "text-red-500 font-bold"} text-white`}>
                {contest.completed ? "Participated" : "Upcoming"}
              </a>
              </div>

            </div>
          ))}</div>
        </div>
      </div>
    </div>
</div>
</div>
);
}
export default HomePage;