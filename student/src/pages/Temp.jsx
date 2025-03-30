import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import {ExternalLink } from 'lucide-react';

import { 
  ChevronDown, 
  Home, 
  Users, 
  Trophy, 
  User, 
  Download, 
  Medal, 
  Target, 
  Crown,
  Code,
  Book,
  Flame,
  GitCommit
} from "lucide-react";
import { toast, Toaster } from "sonner";
import CommonFooter from "../components/Common/CommonFooter";
import NavBar from "../components/HomePageComponents/NavBar";
import DashBoardProfile from "../components/HomePageComponents/DashboardProfile";
import PieChart from "../components/HomePageComponents/PieChart";
import QuestionDashboard from "../components/HomePageComponents/QuestionDashboard";
import ContestsDashboard from "../components/HomePageComponents/ContestDashboard";
import DetailsDashBoard from "../components/HomePageComponents/DetailsDashboard";






function Temp(){


    const { uname } = useParams();
  const navigate = useNavigate();
  const [allData, setAllData] = useState({ myData: {}, data: [] });
  const [activeSection, setActiveSection] = useState(null);

  const [detailsBox , setDetailsBox] = useState({details:{},type:"none"})

  const fetchData = async () => {
    const session = Cookies.get("session");
    try {
      const result = await fetch("http://localhost:4000/basic/home", {
        method: "POST",
        body: JSON.stringify({ uname, session }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await result.json();
      setAllData(data);
      if (data?.data.length > 0) {
        setActiveSection(data.data[0].name);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const session = Cookies.get("session");
    if (!session) {
      toast.error("Please login to continue", {
        style: {
          fontSize: "1.125rem",
          fontWeight: 300,
          padding: 20
        }
      });
      navigate("/login");
    }
    if (allData?.data?.length === 0) {
      fetchData();
    }
  }, [allData?.data?.length, navigate]);

    // console.log(JSON.stringify(allData.contests))
    return (
        <div className="relative main h-screen w-screen overflow-hidden">
      <NavBar 
        userData={allData.myData} 
        currentPath={window.location.pathname}
        viewMode={allData.viewMode} 
        rank={allData.rank}
      />

      <div className="flex items-center h-[90vh]">

        <div className="w-1/4 h-full flex justify-center items-center py-4">
            <QuestionDashboard 
            detailsBox={detailsBox}
            details={allData.data}
            setDetailsBox={setDetailsBox}
            uname={uname}/>
        </div>

  

        <div className="w-3/4 h-full">
                  <div className="flex h-[38vh] w-full">
                      <div className="w-1/3 h-full text-xs flex justify-center items-center">
                            <ContestsDashboard 
                            details={allData.contests}
                            setDetailsBox={setDetailsBox}
                            uname={uname}/>
                      </div>
                      <div className="w-1/3 h-full flex justify-center items-center">
                            <PieChart 
                            details={{...allData.data , ...allData.myData}}/>
                      </div>
                      <div className="w-1/3 h-full">
                          <DashBoardProfile 
                          userData={{...allData.myData , rank:allData.rank , totalRank:allData.totalRank}}/>
                      </div>

                  </div>  
                  <div className="h-[52vh]  w-full flex justify-center items-center">
                        <DetailsDashBoard 
                        type={detailsBox.type}
                        details={detailsBox.details }
                        uname={uname}
                        />
                  </div>
        </div>

        

        


        {/* <div className="h-full w-1/2">
        <DashBoardProfile userData={{...allData.myData , rank:allData.rank , totalRank:allData.totalRank}}/>
        </div> */}
        

      </div>
            
        </div>
    )
}

export default Temp;