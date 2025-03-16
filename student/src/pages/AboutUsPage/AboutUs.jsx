import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import React from 'react';
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
      className="w-64 bg-[#121212] border-r border-[#3b3b3b] h-screen overflow-y-auto fixed z-10"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 border-b border-[#3b3b3b]">
        <h3 className="text-[#36ead2] font-mono text-lg font-bold">Topics</h3>
      </div>
      {topics.map((topic) => (
        <div key={topic.name} className="border-b border-[#3b3b3b]">
          <motion.div 
            className={`flex items-center justify-between p-4 cursor-pointer transition-colors font-mono ${
              activeSection === topic.name ? 'bg-[#36ead2]/20 text-[#ddf3ef]' : 'text-[#ddf3ef]/80 hover:bg-[#36ead2]/10'
            }`}
            onClick={() => {
              setActiveSection(topic.name);
              toggleTopic(topic.name);
            }}
            whileHover={{ backgroundColor: "rgba(54, 234, 210, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <Code className="w-4 h-4 mr-3 text-[#36ead2]" />
              <span className="font-bold text-sm">{topic.name}</span>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-[#36ead2] transition-transform duration-300 ${
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
                <div className="pl-4 pb-2 bg-[#1a1a1a]">
                  {topic.question.map((q) => (
                    <motion.div
                      key={q.title}
                      className="px-4 py-3 text-sm font-mono text-[#ddf3ef]/90 hover:bg-[#36ead2]/10 cursor-pointer transition-colors"
                      whileHover={{ x: 4, backgroundColor: "rgba(54, 234, 210, 0.1)" }}
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
                    className="px-4 py-3 text-sm font-extrabold text-[#36ead2] hover:bg-[#36ead2]/10 cursor-pointer transition-colors"
                    whileHover={{ x: 4, backgroundColor: "rgba(54, 234, 210, 0.1)" }}
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
      className="bg-[#121212] border-b border-[#3b3b3b] sticky top-0 z-50"
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
                whileHover={{ scale: 1.05, color: "#36ead2" }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors font-mono
                  ${currentPath === item.path ? 'text-[#36ead2] bg-[#36ead2]/10 font-extrabold' : 'text-[#ddf3ef] hover:text-[#36ead2]'}`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
          <div className="relative mr-20" ref={profileRef}>
            <motion.button
              whileHover={{ scale: 1.05, color: "#36ead2" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-[#ddf3ef] hover:text-[#36ead2] font-mono"
              onClick={() => setShowProfile(!showProfile)}
            >
              <User className="w-4 h-4" />
              <span className="font-extrabold">{userData.uname}</span>
            </motion.button>
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-[#121212] border-2 border-[#3b3b3b] rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="text-[#ddf3ef] font-bold text-xl mb-2 font-mono">{userData.name}</div>
                    <div className="text-[#ddf3ef]/70 font-semibold mb-4 font-mono">{userData.rno}</div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Medal className="w-5 h-5 text-[#36ead2]" />
                        <div>
                          <div className="text-sm font-semibold text-[#ddf3ef]/70 font-mono">Total Points</div>
                          <div className="font-bold text-[#ddf3ef] font-mono">{userData.points || 0}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-[#36ead2]" />
                        <div>
                          <div className="text-sm font-semibold text-[#ddf3ef]/70 font-mono">Questions Solved</div>
                          <div className="font-bold text-[#ddf3ef] font-mono">{userData.questionsSolved || 0}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5 text-[#36ead2]" />
                        <div>
                          <div className="text-sm font-semibold text-[#ddf3ef]/70 font-mono">Contests Participated</div>
                          <div className="font-bold text-[#ddf3ef] font-mono">{userData.contestsParticipated || 0}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crown className="w-5 h-5 text-[#36ead2]" />
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
                          className="text-[#36ead2] hover:text-[#ddf3ef] text-sm font-bold flex items-center font-mono"
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
      className={`mb-8 border-2 border-[#3b3b3b] rounded-lg ${isMinimized ? "pb-1" : "pb-6"} p-6 bg-[#121212]`}
    >
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#121212',
            color: '#ddf3ef',
            border: '1px solid #2b2b2b',
            borderRadius: '4px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          },
          className: 'sonner-terminal-toast',
          success: {
            icon: '✓',
            style: {
              borderLeft: '4px solid #27c93f',
            },
          },
          error: {
            icon: '×',
            style: {
              borderLeft: '4px solid #ff5f56',
            },
          },
          warning: {
            icon: '!',
            style: {
              borderLeft: '4px solid #ffbd2e',
            },
          },
          info: {
            icon: 'i',
            style: {
              borderLeft: '4px solid #36ead2',
            },
          },
          duration: 5000,
        }}
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Book className="w-5 h-5 text-[#36ead2]" />
          <h3 className="text-xl font-bold text-[#ddf3ef] font-mono">{topic.name}</h3>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "#36ead2" }}
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
            className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-[#36ead2] text-[#121212] rounded-lg hover:bg-[#25ac9a] transition-colors font-bold font-mono"
          >
            <Download className="w-4 h-4" />
            <span>Download Notes</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full hover:bg-[#3b3b3b] text-[#36ead2]"
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
                className="border-2 border-[#3b3b3b] rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-[#36ead2]"
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
              className="border-2 border-[#3b3b3b] rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-[#36ead2] bg-[#1a1a1a]"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                nav(`/${uname}/contest/${topic.name}`)
              }}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-black text-[#ddf3ef] font-mono">{topic.name} Contest</h4>
                <span className="bg-[#36ead2]/20 text-[#36ead2] px-3 py-1 rounded-full text-sm font-bold font-mono">
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

// Main CSS for striped background pattern
const mainStyles = `
.main {
  background: repeating-linear-gradient(
    135deg,  /* Diagonal stripes */
    #1a1a1a 0px, 
    #1a1a1a 8px, 
    rgba(255, 255, 255, 0.1) 8px,
    rgba(255, 255, 255, 0.1) 9px, 
    #1a1a1a 9px, 
    #1a1a1a 17px, 
    rgba(255, 255, 255, 0.2) 17px,
    rgba(255, 255, 255, 0.2) 18px,
    #1a1a1a 18px, 
    #1a1a1a 26px, 
    rgba(255, 255, 255, 0.1) 26px,
    rgba(255, 255, 255, 0.1) 27px,
    #1a1a1a 27px, 
    #1a1a1a 35px
  );
}
`;

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
    // Add the custom styles to the document head
    const styleEl = document.createElement('style');
    styleEl.textContent = mainStyles;
    document.head.appendChild(styleEl);
    
    return () => {
      // Clean up on unmount
      document.head.removeChild(styleEl);
    };
  }, []);

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
    <div className="min-h-screen main relative">
      <NavBar 
        userData={allData.myData} 
        currentPath={window.location.pathname}
        viewMode={allData.viewMode}
        rank={allData.rank}
      />
      
      <div className="flex max-w-full">
        <div className="hidden md:block lg:block xl:block w-64 flex-shrink-0">
          <VerticalNav 
            topics={allData.data} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            uname={uname}
          />
        </div>
        
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <main className="w-full p-6 md:p-8 border-2 border-[#3b3b3b] rounded-xl bg-[#121212]/70 backdrop-blur-sm">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#36ead2] font-mono">Available Topics</h1>
              <p className="text-[#ddf3ef]/70 text-center font-mono">
                Explore topics and practice questions
              </p>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              {allData.data.map((topic) => (
                <TopicSection key={topic.id} topic={topic} uname={uname} />
              ))}
            </div>
          </main>
        </div>
      </div>
      
      <div className="pt-24"></div>
      <div className="w-full absolute bottom-0">
        <CommonFooter />
      </div>
    </div>
  );
}

export default HomePage;