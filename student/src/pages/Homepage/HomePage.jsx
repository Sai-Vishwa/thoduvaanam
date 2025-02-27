import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { 
  ChevronDown, 
  Home, 
  Users, 
  Trophy, 
  User, 
  Download, 
  Medal, 
  Target, 
  Crown 
} from "lucide-react";
import { toast, Toaster } from "sonner";

const VerticalNav = ({ topics, activeSection, setActiveSection , uname}) => {
  const [expandedTopics, setExpandedTopics] = useState({});
  const nav = useNavigate();
  const toggleTopic = (topicName) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  return (
    <div className="w-64 bg-gray-200 border- border-[#000015] h-screen overflow-y-auto fixed">
      {topics.map((topic) => (
        <div key={topic.name} className="border-b border-r border-t border-[#000015]/20">
          <motion.div 
            className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#000015]/5 transition-colors ${
              activeSection === topic.name ? 'bg-[#000015]/10 text-[#000015]' : ''
            }`}
            onClick={() => {
              setActiveSection(topic.name);
              toggleTopic(topic.name);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold text-sm">{topic.name}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-300 ${
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
                <div className="pl-4 pb-2 bg-gray-50">
                  {topic.question.map((q) => (
                    <motion.div
                      key={q.title}
                      className="px-4 py-3 text-sm font-semibold text-[#000015] hover:bg-[#000015]/5 cursor-pointer transition-colors"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={()=>{
                        nav(`/${uname}/question/${q.title}`)
                      }}
                    >
                      {q.title}
                      <span className={`ml-2 text-xs font-bold ${
                        q.difficulty === 'EASY' ? 'text-green-600' :
                        q.difficulty === 'BALANCED' ? 'text-yellow-600' :
                        q.difficulty === 'HELL' ? 'text-red-900' :
                        'text-red-600'
                      }`}>
                        {q.difficulty}
                      </span>
                    </motion.div>
                  ))}
                  <motion.div
                    className="px-4 py-3 text-sm font-extrabold text-purple-600 hover:bg-[#000015]/5 cursor-pointer transition-colors"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={()=>{
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
    </div>
  );
};

const NavBar = ({ userData, currentPath, viewMode }) => {
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

    let status = false
    let dt = {}
    const dummy =  await new Promise ((resolve)=>{
          toast.promise(new Promise((resolve,reject)=>{
            fetch("http://localhost:4000/login-signup/logout", {
              method: "POST",
              body: JSON.stringify({session:Cookies.get("session") , uname:uname}),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }).then((resp) => resp.json())
            ((data)=>{
              if(data.err){
                throw new Error(data.err)
              }
              resolve(data)
            })
            .catch((err)=> reject(err))
          }),{
            loading: "Logging out...",
            success: (data)=>{
              status = true
              dt = data
              console.log("i must be first")
              resolve()
              return (`Logged out successfully..!!`)
            },
            error: (err) => {
              resolve()
              return (`${err}`)
            },
            style: {
              fontSize:"1.125rem",
              fontWeight:300,
              padding:20
            }
          })
        })
    
        if(status){
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
    <div className="bg-white border-b border-[#000015] sticky top-0 z-50 shadow-sm">
      <div className="px-4 w-full">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex items-center space-x-8 ml-20">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors font-bold
                  ${currentPath === item.path ? 'text-[#000015] bg-[#000015]/5 font-extrabold' : 'text-gray-600 hover:text-[#000015] hover:bg-gray-50'}`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
          <div className="relative mr-20" ref={profileRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-[#000015] hover:bg-gray-50"
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
                  className="absolute right-0 mt-2 w-80 bg-white border-2 border-[#000015] rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="text-[#000015] font-bold text-xl mb-2">{userData.name}</div>
                    <div className="text-gray-600 font-semibold mb-4">{userData.rno}</div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Medal className="w-5 h-5 text-[#000015]" />
                        <div>
                          <div className="text-sm font-semibold text-gray-600">Total Points</div>
                          <div className="font-bold text-[#000015]">{userData.points || 0}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-[#000015]" />
                        <div>
                          <div className="text-sm font-semibold text-gray-600">Problems Solved</div>
                          <div className="font-bold text-[#000015]">{userData.problemsSolved || 0}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5 text-[#000015]" />
                        <div>
                          <div className="text-sm font-semibold text-gray-600">Contests Won</div>
                          <div className="font-bold text-[#000015]">{userData.contestsWon || 0}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crown className="w-5 h-5 text-[#000015]" />
                        <div>
                          <div className="text-sm font-semibold text-gray-600">Current Rank</div>
                          <div className="font-bold text-[#000015]">#{userData.rank || '-'}</div>
                        </div>
                      </div>
                    </div>
                    {userData?.leetCodeProfile?.length > 0 && (
                      <div className="pt-4 border-t border-gray-200">
                        <a
                          href={userData.leetCodeProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#000015] hover:text-blue-600 text-sm font-bold flex items-center"
                        >
                          <span>LeetCode Profile</span>
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {!viewMode && (
                    <button
                      onClick={logout}
                      className="w-full p-4 text-left text-red-600 hover:bg-gray-50 text-sm font-bold border-t border-gray-200"
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
    </div>
  );
};

const TopicSection = ({ topic ,uname }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const nav = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-8 border-2 border-[#000015] rounded-lg ${isMinimized?"pb-1":"pb-6"} p-6 bg-white`}

      onClick={() => setIsMinimized(!isMinimized)}
    >
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-bold text-[#000015]">{topic.name}</h3>
      
        </div>
        <div className="flex items-center justify-end space-x-4">


        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={topic.notesUrl}
          onClick={()=>{
            toast.info("No notes available now",{
                    style: {
                      fontSize:"1.125rem",
                      fontWeight:300,
                      padding:20
                    }
                  })
          }}
          download
          className="flex items-center space-x-2 px-4 py-2 bg-[#000015] text-white rounded-lg hover:bg-gray-900 transition-colors font-bold"
        >
          <Download className="w-4 h-4" />
          <span>Download Notes</span>
        </motion.a>

        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-full hover:bg-gray-100"
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
            {topic.question.map((q) => (
              <motion.div
                key={q.id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-[#000015]"
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.99 }}
                onClick={()=>{
                  nav(`/${uname}/question/${q.title}`)
                }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#000015]">{q.title}</h4>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-bold
                    ${q.difficulty === 'EASY' && 'bg-green-100 text-green-600'}
                    ${q.difficulty === 'BALANCED' && 'bg-yellow-100 text-yellow-600'}
                    ${q.difficulty === 'INTENSE' && 'bg-red-100 text-red-600'}
                    ${q.difficulty === 'HELL' && 'bg-red-300 text-red-900'}
                  `}>
                    {q.difficulty}
                  </span>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-[#000015] bg-gray-50"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.99 }}
              onClick={()=>{
                nav(`/${uname}/contest/${topic.name}`)
              }}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-black text-[#000015]">{topic.name} Contest</h4>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-bold">
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
      if (data.data.length > 0) {
        setActiveSection(data.data[0].name);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const session = Cookies.get("session");
    if (!session) {
      alert("First login to access this route");
      navigate("/login");
    }
    if (allData?.data?.length === 0) {
      fetchData();
    }
  }, [allData?.data?.length, navigate]);

  return (
    <div className="min-h-screen bg-gray-200">
      <NavBar 
        userData={allData.myData} 
        currentPath={window.location.pathname}
        viewMode={allData.viewMode}
      />
      
      <div className="flex">
        <div className="w-1/6 xs:hidden sm:hidden md:hidden lg:block xl:block">
        <VerticalNav 
          topics={allData.data} 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          uname = {uname}
        />
        </div>
        
        <div className="flex p-8  lg:w-5/6 xl:w-5/6 xs:w-full md:w-full sm:w-full ">
        <main className="flex-1 w-full p-8 border-2 border-black rounded-xl bg-white">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-center mb-2 text-[#000015]">Available Topics</h1>
            <p className="text-gray-600 text-center">
              Explore topics and their questions
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
    </div>
  );
}

export default HomePage;