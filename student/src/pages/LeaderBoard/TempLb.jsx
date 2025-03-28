import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Trophy, 
  Crown, 
  Medal, 
  Filter, 
  X 
} from 'lucide-react';
import NavBar from '../../components/HomePageComponents/NavBar';
import { useParams } from 'react-router-dom';

// Static mock data for 30 people
const generateMockData = () => {
  const names = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown', 'David Wilson',
    'Sarah Lee', 'Tom Anderson', 'Lisa Chen', 'Alex Rodriguez', 'Emma Watson',
    'Ryan Kim', 'Olivia Martinez', 'Chris Evans', 'Sophia Lee', 'Daniel Park',
    'Ava Wilson', 'Michael Chang', 'Isabella Garcia', 'Kevin Liu', 'Emma Jones',
    'Ryan Wang', 'Olivia Kim', 'Jason Lee', 'Sophie Chen', 'Brian Wu',
    'Mia Taylor', 'Eric Zhang', 'Grace Liu', 'Tyler Wong', 'Lauren Chen'
  ];

  return names.map((name, index) => ({
    id: index + 1,
    uname: `user_${name.toLowerCase().replace(/\s/g, '_')}`,
    name: name,
    rank: index + 1,
    points: Math.floor(5000 - index * 50),
    // For contests
    timeTaken: `${Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
  }));
};

const LeaderBoard = () => {
  // State management
  const [activeBoard, setActiveBoard] = useState('overall');
  const [activeContest, setActiveContest] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(generateMockData());
  const [myPosition, setMyPosition] = useState({
    rank: 25,
    name: 'My Name',
    uname: 'my_username',
    points: 2500
  });

  const {uname} = useParams();

  // Search functionality
  const filteredLeaderboard = () => {
    return leaderboardData.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.uname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Render top 3 users in a special section
  const renderTopThree = () => {
    const topThree = filteredLeaderboard().slice(0, 3);
    const podiumColors = [
      'bg-gradient-to-b from-yellow-400 to-yellow-600',
      'bg-gradient-to-b from-gray-300 to-gray-500',
      'bg-gradient-to-b from-yellow-700 to-yellow-900'
    ];

    return (
      <div className="flex justify-center space-x-4 mb-4">
        {topThree.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className={`
              w-1/3 ${podiumColors[index]} text-white rounded-2xl p-4 
              flex flex-col items-center justify-center
              transform transition-all duration-300 hover:scale-105 cursor-pointer
            `}
            onClick={() => setSelectedUser(user)}
          >
            <div className="text-2xl font-bold mb-2">#{user.rank}</div>
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-sm opacity-80">@{user.uname}</div>
            <div className="mt-2 text-xl font-bold">{user.points} pts</div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Render leaderboard list
  const renderLeaderboardList = () => {
    const users = filteredLeaderboard().slice(3); // Exclude top 3
    return (
      <div 
        className="h-[50vh] overflow-auto bg-[#1c1b1b] rounded-xl border border-[#3b3b3b] px-2"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#2bbdaa #1c1b1b' }}
      >
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="
              flex items-center justify-between 
              p-3 hover:bg-[#2c2b2b] 
              rounded-lg 
              cursor-pointer 
              transition-colors 
              group
            "
            onClick={() => setSelectedUser(user)}
          >
            <div className="w-12 text-[#2bbdaa] font-bold">#{user.rank}</div>
            <div className="flex-grow">
              <div className="text-white group-hover:text-[#2bbdaa]">{user.name}</div>
              <div className="text-sm text-gray-400">@{user.uname}</div>
            </div>
            <div className="text-[#22bdaa] font-bold">{user.points} pts</div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Render contest leaderboard
  const renderContestLeaderboard = () => {
    const users = filteredLeaderboard();
    return (
      <div 
        className="h-[50vh] overflow-auto bg-[#1c1b1b] rounded-xl border border-[#3b3b3b] px-2"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#2bbdaa #1c1b1b' }}
      >
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="
              flex items-center justify-between 
              p-3 hover:bg-[#2c2b2b] 
              rounded-lg 
              cursor-pointer 
              group
            "
            onClick={() => setSelectedUser(user)}
          >
            <div className="w-12 text-[#2bbdaa] font-bold">#{user.rank}</div>
            <div className="flex-grow">
              <div className="text-white group-hover:text-[#2bbdaa]">{user.name}</div>
              <div className="text-sm text-gray-400">@{user.uname}</div>
            </div>
            <div className="text-[#22bdaa] font-bold mr-4">{user.points} pts</div>
            <div className="text-white opacity-70">{user.timeTaken}</div>
          </motion.div>
        ))}
      </div>
    );
  };

    const [activeTab, setActiveTab] = useState("general");
  

  return (
    <div className="h-screen w-screen main block text-[#ddf3ea] font-['Yu_Gothic'] overflow-hidden ">
        <NavBar
        currentPath={window.location.pathname}
        userData={{uname:uname}}
      />
      <div className='w-full h-[90vh] flex justify-center pt-5'>
                <div className='w-5/6 h-[75vh] border-2 border-[#3b3b3b] bg-[#1c1b1b] rounded-3xl'>
                <div className=" w-full font-['Courier_New'] flex bg-[#222] rounded-t-3xl">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('general')}
          className={`w-1/2 flex items-center justify-center space-x-2 relative ${activeTab==='general'?"text-[#36ead2]":"text-[#ddf3ea]"}`}
        >
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
          onClick={() => setActiveTab('contests')}
          className={`w-1/2 py-2 flex items-center justify-center space-x-2 ${activeTab==='contests'?"text-[#36ead2]":"text-[#ddf3ea]"} relative`}
        >
          <span>Contest</span>
          {activeTab === 'contests' && (
            <motion.div 
              layoutId="navbar-underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2bbdaa]"
            />
          )}
        </motion.button>
      </div>
                </div>
      </div>
      
      {/* <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`
              px-4 py-2 rounded-full transition-all
              ${activeBoard === 'overall' 
                ? 'bg-[#2bbdaa] text-black' 
                : 'bg-[#1c1b1b] text-[#2bbdaa] hover:bg-[#2c2b2b]'}
            `}
            onClick={() => setActiveBoard('overall')}
          >
            Overall Leaderboard
          </button>
          <button
            className={`
              px-4 py-2 rounded-full transition-all
              ${activeBoard === 'contests' 
                ? 'bg-[#2bbdaa] text-black' 
                : 'bg-[#1c1b1b] text-[#2bbdaa] hover:bg-[#2c2b2b]'}
            `}
            onClick={() => setActiveBoard('contests')}
          >
            Contests
          </button>
        </div>

        {activeBoard === 'contests' && (
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map(contest => (
              <button
                key={contest}
                className={`
                  px-3 py-1 rounded-full text-sm transition-all
                  ${activeContest === contest 
                    ? 'bg-[#2bbdaa] text-black' 
                    : 'bg-[#1c1b1b] text-[#2bbdaa] hover:bg-[#2c2b2b]'}
                `}
                onClick={() => setActiveContest(contest)}
              >
                Contest {contest}
              </button>
            ))}
          </div>
        )}

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by name or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full px-4 py-2 rounded-full 
              bg-[#1c1b1b] border-2 border-[#3b3b3b] 
              text-[#ddf3ea] placeholder-[#2bbdaa]
            "
          />
          <Search className="absolute right-4 top-3 text-[#2bbdaa]" />
        </div>

        {renderTopThree()}

        {activeBoard === 'overall' ? renderLeaderboardList() : renderContestLeaderboard()}

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="
            fixed bottom-0 left-0 right-0 
            bg-[#1c1b1b] border-t-2 border-[#3b3b3b] 
            p-4 text-center
            flex items-center justify-center
            z-50
          "
        >
          <div className="flex items-center space-x-4">
            <div className="text-[#2bbdaa] text-lg font-bold">My Position</div>
            <div className="text-white text-xl">#{myPosition.rank}</div>
            <div className="text-[#ddf3ea]">{myPosition.name}</div>
            <div className="text-gray-400">@{myPosition.uname}</div>
            <div className="text-[#22bdaa] font-bold">{myPosition.points} pts</div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setSelectedUser(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-11/12 max-w-md bg-[#1c1b1b] rounded-xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h2 className="text-2xl text-[#2bbdaa] mb-4">{selectedUser.name}</h2>
                  <p className="text-[#ddf3ea]">Username: @{selectedUser.uname}</p>
                  <p className="text-[#22bdaa]">Rank: #{selectedUser.rank}</p>
                  <p className="text-white">Points: {selectedUser.points}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}
    </div>
  );
};

export default LeaderBoard;