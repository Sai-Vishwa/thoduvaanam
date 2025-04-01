import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
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
  Book
} from "lucide-react";
import { toast, Toaster } from "sonner";

const NavBar = ({ userData, currentPath, viewMode, rank }) => {
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);
    const { uname } = useParams();

    const nav = useNavigate();
  
    const navItems = [
      { label: "Home", icon: Home, path: `home` },
      { label: "Discussions", icon: Users, path: `discussions` },
      { label: "Leaderboard", icon: Trophy, path: `leaderboard` }
    ];
  
    async function logout() {
      let status = false;
      let dt = {};
      const dummy = await new Promise((resolve) => {
        toast.promise(
          new Promise((resolve, reject) => {
            fetch("http://localhost:4000/login-signup/logout", {
              method: "POST",
              body: JSON.stringify({ session: Cookies.get("session"), uname: uname }),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            })
            .then((resp) => resp.json())
            .then((data) => {
              if (data.err) {
                throw new Error(data.err);
              }
              resolve(data);
            })
            .catch((err) => reject(err));
          }),
          {
            loading: "Logging out...",
            success: (data) => {
              status = true;
              dt = data;
              resolve();
              return (`Logged out successfully..!!`);
            },
            error: (err) => {
              resolve();
              return (`${err}`);
            },
            style: {
              fontSize: "1.125rem",
              fontWeight: 300,
              padding: 20
            }
          }
        );
      });
      
      if (status) {
        Cookies.remove('session');
        nav('/');
      }
    }
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setShowProfile(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <motion.div 
        className="bg-[#1c1b1b] border-b border-[#3b3b3b] sticky top-0 z-50 w-full h-[10vh]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="px-4 w-full">
          <div className="flex items-center justify-between h-16 w-full">
            <div className="flex items-center space-x-8 ml-20">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ color: "#36ead2" }}
                  className={`flex items-center space-x-2 px-3 py-0   rounded-lg transition-colors font-mono
                    ${currentPath === item.path ? 'text-[#3dead2] basic-1 transition-colors' : 'text-[#ddf3ef] hover:text-[#36ead2] cursor-pointer basic-1  transition-colors'}`}
                  onClick={() => nav(item.path)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="relative mr-20" ref={profileRef}>
              <motion.button
                className="flex text-[#ddf3ef]  font-mono items-center space-x-2 px-2   basic-1  transition-colors hover:text-[#36ead2] "
                onHoverStart={()=>{
                    if(!showProfile)setShowProfile(!showProfile)}}
                onClick={()=>{
                  setShowProfile(!showProfile)
                }}
              >

                <User className={`w-4 h-4` }/>
                <span>{userData?.uname}</span>
                <ChevronDown 
                              className={`w-5 h-5 transition-transform duration-300 ${showProfile?"transform rotate-180":""}`}
                            />
                
              </motion.button>
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute flex flex-col  justify-center mt-2 w-[120px] bg-[#1c1b1b] border-2 border-[#3b3b3b] rounded-lg shadow-lg overflow-hidden"
                  >
                    <button
                    onClick={()=>{nav(`/profile/${uname }`)}}
                    className="w-full p-2  text-[#ddf3ef] hover:bg-[#3b3b3b] text-sm font-bold border-t border-[#3b3b3b] font-mono">
                            Profile
                    </button>
                    {!viewMode && (
                      <button
                        onClick={logout}
                        className="w-full p-2  text-red-400 hover:bg-[#3b3b3b] text-sm font-bold border-t border-[#3b3b3b] font-mono"
                      >
                        Logout
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  export default NavBar