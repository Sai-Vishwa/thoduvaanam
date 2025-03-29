import { AnimatePresence, color, motion } from 'framer-motion';
import { FileText, Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from "react-select";


const LeaderboardPage = () => {
  const [timeFilter, setTimeFilter] = useState('all');


  useEffect(()=>{
    async function fetchData() {

      try {
        const details = await fetch("http://localhost:4000/basic/leaderBoard", {
          method: "POST",
          body: JSON.stringify({}),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          const data = await details.json()
          if (data.err) {
            throw new Error(data.err)
          } else {
            setDetailsBox({type:"contest" , details:data})
          }
        } 
        catch (error) {
          console.log(error)
          setDetailsBox({type:"contest" , details:{} , error:"Some internal error try again"})
        }
      
    }

    fetchData();

      
      
  },[])


  function getShortUrl(url) {
    try {
      if (!url) return "";
      
      // Check if it's a URL
      const urlObj = new URL(url);
      
      // For GitHub URLs, show the username
      if (urlObj.hostname === "github.com") {
        const pathParts = urlObj.pathname.split('/').filter(p => p);
        return pathParts.length > 0 ? pathParts[0] : "https://...";
      }
      
      // For LeetCode URLs, show the username
      if (urlObj.hostname === "leetcode.com") {
        const pathParts = urlObj.pathname.split('/').filter(p => p);
        return pathParts.length > 0 ? pathParts[0] : "https://...";
      }
      
      // For other URLs, show abbreviated format
      return "https://...";
    } catch (e) {
      // If not a valid URL
      return url.length > 10 ? url.substring(0, 10) + "..." : url;
    }
  }
  
  
  // Sample data for leaderboard
  const topTraders = [
    
    {
      id: 1,
      name: 'Robert Fox',
      username: '@foxy_rob',
      rank: 2,
      points: 879,
      github: 'https://github.com/robertfox',
      leetcode: 'https://leetcode.com/foxy_rob',
      timeTaken: '02:12:05'
    },
    {
      id: 2,
      name: 'Jacob Jones',
      username: '@jacob_99',
      rank: 1,
      points: 983,
      github: 'https://github.com/jacobjones',
      leetcode: 'https://leetcode.com/jacob_99',
      timeTaken: '01:45:22'
    },
    {
      id: 3,
      name: 'Albert Flores',
      username: '@albert_02',
      rank: 3,
      points: 754,
      github: 'https://github.com/albertflores',
      leetcode: 'https://leetcode.com/albert_02',
      timeTaken: '02:35:47'
    }
  ];
  
  const rankingParticipants = [
    {
      rank: 4,
      name: 'Cupsey',
      username: '@johnsmith',
      points: 738,
      github: 'https://github.com/cupsey',
      leetcode: 'https://leetcode.com/johnsmith',
      timeTaken: '02:48:17'
    },
    {
      rank: 5,
      name: 'Cented',
      username: '@cented',
      points: 712,
      github: 'https://github.com/cented',
      leetcode: 'https://leetcode.com/cented',
      timeTaken: '02:53:42'
    },
    {
      rank: 6,
      name: 'Jalen',
      username: '@jaly',
      points: 694,
      github: 'https://github.com/jalendev',
      leetcode: 'https://leetcode.com/jaly',
      timeTaken: '03:01:15'
    },
    {
      rank: 7,
      name: 'Marcell',
      username: '@marc',
      points: 675,
      github: 'https://github.com/marcell',
      leetcode: 'https://leetcode.com/marc',
      timeTaken: '03:10:38'
    },
    {
      rank: 8,
      name: 'Cooker',
      username: '@cooker_3',
      points: 653,
      github: 'https://github.com/cooker3',
      leetcode: 'https://leetcode.com/cooker_3',
      timeTaken: '03:15:22'
    },
    {
      rank: 9,
      name: 'Euris',
      username: '@euris_0',
      points: 629,
      github: 'https://github.com/euris0',
      leetcode: 'https://leetcode.com/euris_0',
      timeTaken: '03:22:45'
    }
  ];


  const optionsMap = {
    general: [
      { value: "overall", label: "Overall" },
      { value: "2nd_years_only", label: "2nd Years Only" },
      { value: "3rd_years_only", label: "3rd Years Only" },
    ],
    contest: [
      { value: "contest_1", label: "Contest 1" },
      { value: "contest_2", label: "Contest 2" },
      { value: "contest_3", label: "Contest 3" },
    ],
  };

  const [selectedOption, setSelectedOption] = useState(null);
  
  const customStyles = {
    // Styles the main select box (dropdown button)
    control: (base) => ({
      ...base,
      color:"#ff0000",
      backgroundColor: "#222", // Background color of the select box
      borderColor: "#323232", // Border color
      borderWidth:"2px",
      borderRadius: "8px", // Rounded corners
      boxShadow: "none", // Removes default box shadow
      "&:hover": { borderColor: "#525252" }, // Border color on hover
    }),
    singleValue: (base) => ({
      ...base,
      color: "white", // Ensures the selected option text is white
    }),
    
    // Styles the dropdown menu
    menu: (base) => ({
      ...base,
      backgroundColor: "#222", // Background color of the dropdown
      color: "white", // Text color
      borderRadius: "8px", // Rounded corners
    }),
    
    // Styles each option inside the dropdown
    option: (base, { isFocused , isClicked }) => ({
      ...base,
      backgroundColor: isFocused ? "#323232" :isClicked?"#525252":"222", // Background color changes on hover
      color: "#ddf3ea", // Text color
      cursor: "pointer", // Cursor changes to pointer

    }),
  };

  const [activeTab , setActiveTab] = useState("general")
  return (
    <div className="min-h-screen main  p-4 flex justify-center">
      <div className="w-full max-w-6xl  border-2 border-[#3b3b3b] bg-[#1c1b1b]  rounded-2xl p-6 text-[#ddf3ea]">
        {/* Header */}
        
        
        {/* Leaderboard Title */}
        <div className="flex space-x-[188px] items-center mb-6">
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          

          <div className='flex items-center w-full justify-between'>

          
          <div className="relative space-x-32 px-10 font-['Courier_New'] rounded-[8px] border-2 flex border-[#3b3b3b] bg-[#222]">
          <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('general')}
          className={`w-1/2 flex items-center justify-center space-x-2 relative ${activeTab==='general'?"text-[#36ead2]":"text-[#ddf3ea]"}`}
        >
          <Info className="w-4 h-4" />
          <span className={``}>General</span>
          {activeTab === 'general' && (
            <motion.div 
            layoutId="navbar-underline"
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2bbdaa]"
            />
          )}
        </motion.button>
        
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('contest')}
          className={`w-1/2 py-2 flex items-center justify-center space-x-2 ${activeTab==='contest'?"text-[#36ead2]":"text-[#ddf3ea]"} relative`}
        >
          <FileText className="w-4 h-4" />
          <span>Contests</span>
          {activeTab === 'contest' && (
            <motion.div 
            layoutId="navbar-underline"
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2bbdaa]"
            />
          )}
        </motion.button>
          </div>


          <div className="w-60">
          <Select
            options={optionsMap[activeTab] || []}
            placeholder={activeTab=="general"?"Overall":"Contest-1"}
            value={selectedOption}
            onChange={(option) => {
              setSelectedOption(option);
              onChange(option);
            }}
            styles={customStyles}
            />
        </div>
            </div>
        </div>
        
        {/* Top 3 Traders */}
        <div className="grid grid-cols-3 gap-4 mb-6">
      {topTraders.map((trader) => (
        <div key={trader.id} className={`bg-[#222] rounded-xl p-4 ${trader.rank === 1 ? 'border border-[#2bbdaa]' : 'border-2 border-[#323232] '}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              
              <div>
                <div className="font-medium text-[#ddf3ea]">{trader.name}</div>
                <div className="text-sm text-[#2bbdaa]">{trader.username}</div>
              </div>
            </div>
            <div className=" text-[#ddf3ea] px-2 rounded text-base">
              Rank #{trader.rank}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-[#ddf3ea]">POINTS</div>
              <div className="text-sm font-medium text-[#36ead2]">{trader.points}</div>
            </div>
            {activeTab === "contest" && (
              <div>
                <div className="text-xs text-[#ddf3ea]">TIME TAKEN</div>
                <div className="text-sm font-medium text-[#36ead2]">{trader.timeTaken}</div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-10 mb-4">
            <a href={trader.github} className="flex items-center text-xs text-[#ddf3ef] basic-1  hover:text-[#36ead2] transition-colors">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Github 
            </a>
            <a href={trader.leetcode} className="flex items-center text-xs text-[#ddf3ef] basic-1  hover:text-[#36ead2] transition-colors">
              LeetCode
            </a>
          </div>
          
          <button className=" text-[#ddf3ef] basic-1  hover:text-[#36ead2]  rounded-lg text-sm font-medium transition-colors">
            View Profile
          </button>
        </div>
      ))}
    </div>
        
        {/* Ranking Table */}
        <div className="bg-[#222] border-2 border-[#323232] rounded-xl p-4">
  <table className="w-full">
    <thead>
      <tr className="text-[#a7b9b2] text-xs border-b border-[#525252]">
        <th className="py-3 text-left pl-4">RANK</th>
        <th className="py-3 text-left">PARTICIPANT</th>
        <th className="py-3 text-center">POINTS</th>
        {activeTab === "contest" && <th className="py-3 text-center">TIME TAKEN</th>}
        <th className="py-3 text-center">GITHUB</th>
        <th className="py-3 text-center">LEETCODE</th>
        <th className="py-3 text-center">PROFILE</th>
      </tr>
    </thead>
    <tbody>
      {rankingParticipants.map((participant) => (
        <tr key={participant.rank} className="border-b border-[#525252]">
          <td className="py-4 pl-4">{participant.rank}</td>
          <td>
            <div className="flex items-center gap-2">
            
              <div>
                <div className="font-medium">{participant.name}</div>
                <div className="text-xs text-[#a7b9b2]">{participant.username}</div>
              </div>
            </div>
          </td>
          <td className="text-center font-medium">{participant.points}</td>
          
          {activeTab === "contest" && (
            <td className="text-center">{participant.timeTaken}</td>
          )}
          
          <td className="text-center">
            <a 
              href={participant.github} 
              className="inline-flex items-center text-gray-300 hover:text-white px-2 py-1 group relative"
              target="_blank"
              rel="noopener noreferrer"
              title={participant.github}
            >
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {getShortUrl(participant.github)}
              <span className="invisible group-hover:visible absolute left-0 -bottom-6 bg-gray-800 px-2 py-1 text-xs rounded whitespace-nowrap">
                {participant.github}
              </span>
            </a>
          </td>
          
          <td className="text-center">
            <a 
              href={participant.leetcode} 
              className=" text-gray-300 hover:text-white px-2 py-1 group relative"
              target="_blank"
              rel="noopener noreferrer"
              title={participant.leetcode}
            >

              
              {getShortUrl(participant.leetcode)}
              <span className="invisible group-hover:visible absolute left-0 -bottom-6 bg-gray-800 px-2 py-1 text-xs rounded whitespace-nowrap">
                {participant.leetcode}
              </span>
            </a>
          </td>
          
          <td className="text-center">
            <button className="basic-1  hover:text-[#36ead2]   text-[#ddf3ea] text-xs  pt-1 rounded transition-colors">
              View Profile
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      </div>
    </div>
  );
};

export default LeaderboardPage;