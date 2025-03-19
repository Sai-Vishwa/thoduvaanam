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
import CommonFooter from "../../components/Common/CommonFooter";

const VerticalNav = ({ topics, activeSection, setActiveSection, uname }) => {
  const [expandedTopics, setExpandedTopics] = useState({});
  const nav = useNavigate();
  
  const toggleTopic = (topicName) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  return (
    <motion.div 
      className="w-64 bg-[#1c1b1b] border-r border-[#3b3b3b] h-screen overflow-y-auto fixed z-0"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 border-b border-[#3b3b3b]">
        <h3 className="text-[#ddf3ef] font-mono text-lg font-bold">Topics</h3>
      </div>
      {topics.map((topic) => (
        <div key={topic.name} className="border-b border-[#3b3b3b]">
          <motion.div 
            className={`flex items-center justify-between p-4 cursor-pointer transition-colors font-mono ${
              activeSection === topic.name ? 'bg-[#2bbdaa]/20 text-[#ddf3ef]' : 'text-[#ddf3ef]/80 hover:bg-[#2bbdaa]/10'
            }`}
            onClick={() => {
              setActiveSection(topic.name);
              toggleTopic(topic.name);
            }}
            whileHover={{ backgroundColor: "rgba(43, 189, 170, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <Code className="w-4 h-4 mr-3 text-[#2bbdaa]" />
              <span className="font-bold text-sm">{topic.name}</span>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-[#2bbdaa] transition-transform duration-300 ${
                expandedTopics[topic.name] ? 'transform rotate-180' : ''
              }`}
            />
          </motion.div>
          
          <AnimatePresence>
            {expandedTopics[topic.name] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pl-4 pb-2 bg-[#252525]">
                  {topic.question.map((q) => (
                    <motion.div
                      key={q.title}
                      className="px-4 py-3 text-sm font-mono text-[#ddf3ef]/90 hover:bg-[#2bbdaa]/10 cursor-pointer transition-colors"
                      whileHover={{ x: 4, backgroundColor: "rgba(43, 189, 170, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        nav(`/${uname}/question/${q.title}`)
                      }}
                    >
                      {q.title}
                      <span className={`ml-2 text-xs font-bold ${
                        q.difficulty === 'EASY' ? 'text-green-400' :
                        q.difficulty === 'BALANCED' ? 'text-yellow-400' :
                        q.difficulty === 'HELL' ? 'text-red-400' :
                        'text-red-400'
                      }`}>
                        {q.difficulty}
                      </span>
                    </motion.div>
                  ))}
                  <motion.div
                    className="px-4 py-3 text-sm font-extrabold text-[#2bbdaa] hover:bg-[#2bbdaa]/10 cursor-pointer transition-colors"
                    whileHover={{ x: 4, backgroundColor: "rgba(43, 189, 170, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      nav(`/${uname}/contest/${topic.name}`)
                    }}
                  >
                    {topic.name} Contest
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

const NavBar = ({ userData, currentPath, viewMode, rank }) => {
  const [nameHover , setNameHover] = useState(false)

  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { uname } = useParams();

  const navItems = [
    { label: "Home", icon: Home, path: `/${uname}` },
    { label: "Discussions", icon: Users, path: `/${uname}/discussions` },
    { label: "Leaderboard", icon: Trophy, path: `/${uname}/leaderboard` }
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
      navigate('/');
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
      className="bg-[#1c1b1b] border-b border-[#3b3b3b] sticky top-0 z-50 w-full h-full"
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
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors font-mono
                  ${currentPath === item.path ? 'text-[#2bbdaa]' : 'text-[#ddf3ef] hover:text-[#36ead2] cursor-pointer basic-1  transition-colors'}`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
          <div className="relative mr-20" ref={profileRef}>
            <motion.button
              whileHover={()=>{setNameHover(true)}}
              onHoverEnd={()=>{setNameHover(false)}}
              className="flex text-[#ddf3ef]  font-mono"
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className={`flex items-center space-x-2 px-4 py-2  basic-1  transition-colors hover:text-[#36ead2] `}>
              <User className={`w-4 h-4 text-[#ddf3ef] hover:text-[#36ead2] ${nameHover?"text:#[36ead2]":""}` }/>
              <div className={`text-[#ddf3ef] hover:text-[#36ead2] ${nameHover?"text:#[36ead2]":""}`}>{userData.uname}</div>
              </div>
              
            </motion.button>
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-[#1c1b1b] border-2 border-[#3b3b3b] rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="text-[#ddf3ef] font-bold text-xl mb-2 font-mono">{userData.name}</div>
                    <div className="text-[#ddf3ef]/70 font-semibold mb-4 font-mono">{userData.rno}</div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Medal className="w-5 h-5 text-[#2bbdaa]" />
                        <div>
                          <div className="text-sm font-semibold text-[#ddf3ef]/70 font-mono">Total Points</div>
                          <div className="font-bold text-[#ddf3ef] font-mono">{userData.points || 0}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-[#2bbdaa]" />
                        <div>
                          <div className="text-sm font-semibold text-[#ddf3ef]/70 font-mono">Questions Solved</div>
                          <div className="font-bold text-[#ddf3ef] font-mono">{userData.questionsSolved || 0}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5 text-[#2bbdaa]" />
                        <div>
                          <div className="text-sm font-semibold text-[#ddf3ef]/70 font-mono">Contests Participated</div>
                          <div className="font-bold text-[#ddf3ef] font-mono">{userData.contestsParticipated || 0}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crown className="w-5 h-5 text-[#2bbdaa]" />
                        <div>
                          <div className="text-sm font-semibold text-[#ddf3ef]/70 font-mono">Current Rank</div>
                          <div className="font-bold text-[#ddf3ef] font-mono">#{userData.rank || '-'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#3b3b3b]">
                      {userData?.leetCodeProfile?.length > 0 ? (
                        <a
                          href={userData.leetCodeProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2bbdaa] hover:text-[#ddf3ef] text-sm font-bold flex items-center font-mono"
                        >
                          <span>LeetCode Profile</span>
                        </a>
                      ) : (
                        <span className="text-[#ddf3ef]/50 text-sm font-bold flex items-center font-mono">
                          No LeetCode profile
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {!viewMode && (
                    <button
                      onClick={logout}
                      className="w-full p-4 text-left text-red-400 hover:bg-[#3b3b3b] text-sm font-bold border-t border-[#3b3b3b] font-mono"
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

const TopicSection = ({ topic, uname }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const nav = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-8 border-2 border-[#3b3b3b] rounded-lg ${isMinimized ? "pb-1" : "pb-6"} p-6 bg-[#1c1b1b]`}
    >
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Book className="w-5 h-5 text-[#2bbdaa]" />
          <h3 className="text-xl font-bold text-[#ddf3ef] font-mono">{topic.name}</h3>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "#2bbdaa" }}
            whileTap={{ scale: 0.95 }}
            href={topic.notesUrl}
            onClick={() => {
              toast.info("No notes available now", {
                style: {
                  fontSize: "1.125rem",
                  fontWeight: 300,
                  padding: 20
                }
              })
            }}
            download
            className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-[#2bbdaa] text-[#1c1b1b] rounded-lg hover:bg-[#25a796] transition-colors font-bold font-mono"
          >
            <Download className="w-4 h-4" />
            <span>Download Notes</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full hover:bg-[#3b3b3b] text-[#2bbdaa]"
          >
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300 ${
                isMinimized ? '' : 'transform rotate-180'
              }`}
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            <span className="font-bold text-[#ddf3ef] font-mono">
              Practice
            </span>
            {topic.question.map((q) => (
              <motion.div
                key={q.id}
                className="border-2 border-[#3b3b3b] rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-[#2bbdaa]"
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  nav(`/${uname}/question/${q.title}`)
                }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#ddf3ef] font-mono">{q.title}</h4>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-bold font-mono
                    ${q.difficulty === 'EASY' && 'bg-green-900/30 text-green-400'}
                    ${q.difficulty === 'BALANCED' && 'bg-yellow-900/30 text-yellow-400'}
                    ${q.difficulty === 'INTENSE' && 'bg-red-900/30 text-red-400'}
                    ${q.difficulty === 'HELL' && 'bg-red-900/40 text-red-400'}
                  `}>
                    {q.difficulty}
                  </span>
                </div>
              </motion.div>
            ))}
            <span className="font-bold text-[#ddf3ef] font-mono">Contest</span>

            <motion.div
              className="border-2 border-[#3b3b3b] rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-[#2bbdaa] bg-[#252525]"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                nav(`/${uname}/contest/${topic.name}`)
              }}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-black text-[#ddf3ef] font-mono">{topic.name} Contest</h4>
                <span className="bg-[#2bbdaa]/20 text-[#2bbdaa] px-3 py-1 rounded-full text-sm font-bold font-mono">
                  Contest
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function HomePage() {
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
    <div className="min-h-screen  relative main">
      <NavBar 
        userData={allData.myData} 
        currentPath={window.location.pathname}
        viewMode={allData.viewMode}
        rank={allData.rank}
      />
      
      
      <div className="flex">
        <div className="w-1/6 xs:hidden sm:hidden md:hidden lg:block xl:block">
          <VerticalNav 
            topics={allData.data} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            uname={uname}
          />
        </div>
        
        <div className="flex p-8 lg:w-5/6 xl:w-5/6 xs:w-full md:w-full sm:w-full">
          <main className="flex-1 w-full p-8 border-2 border-[#3b3b3b] rounded-xl bg-[#1c1b1b]">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-center mb-2 text-[#ddf3ef] font-mono">Available Topics</h1>
              <p className="text-[#ddf3ef]/70 text-center font-mono">
                Explore topics and practice questions
              </p>
            </motion.div>

            <div className="space-y-8">
              {allData.data.map((topic) => (
                <TopicSection key={topic.id} topic={topic} uname={uname} />
              ))}
            </div>
          </main>
        </div>
      </div>
      
      <div className="h-[20vh]"></div>
      <div className="w-full h-[20vh] absolute transform bottom-0">
        <CommonFooter />
      </div>
    </div>
  );
}

export default HomePage;