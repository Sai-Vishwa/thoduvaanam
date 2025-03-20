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






function Temp(){


    const { uname } = useParams();
  const navigate = useNavigate();
  const [allData, setAllData] = useState({ myData: {}, data: [] });
  const [activeSection, setActiveSection] = useState(null);

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


    return (
        <div className="relative main h-screen w-screen overflow-hidden">
      <NavBar 
        userData={allData.myData} 
        currentPath={window.location.pathname}
        viewMode={allData.viewMode}
        rank={allData.rank}
      />

      <div className="flex items-center h-[80vh]">

        <div className="w-1/4 h-full bg-blue-800">

        </div>

        <div className="w-3/4 h-full">
                  <div className="flex h-1/2 w-full">
                      <div className="w-1/3 h-full bg-green-300">

                      </div>
                      <div className="w-1/3 h-full bg-amber-500">

                      </div>
                      <div className="w-1/3 h-full">
                          <DashBoardProfile 
                          userData={{...allData.myData , rank:allData.rank , totalRank:allData.totalRank}}/>
                      </div>

                  </div>  
                  <div className="h-1/2 bg-red-300 w-full">

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