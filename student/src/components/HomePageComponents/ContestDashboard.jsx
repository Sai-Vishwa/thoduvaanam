import React, { useState } from 'react';
import Cookies from "js-cookie";


const ContestsDashboard = ({details , setDetailsBox , uname}) => {



  async function handleClick(contestTitle) {

    try {
          const details = await fetch("http://localhost:4000/basic/contest-basic", {
            method: "POST",
            body: JSON.stringify({ uname: uname, session: Cookies.get("session"), tname: contestTitle }),
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

    // console.log(JSON.stringify(details))

    // details?.map((val)=>{
    //     console.log(JSON.stringify(val))
    // })
  // Static sample data
  const sampleData = details
  const sampleData2 =[
    {
      "id": 1,
      "title": "Aadukalam_Round_2",
      "opensOn": "2025-02-25T08:30:00.000Z",
      "closesOn": "2025-03-26T20:01:02.947Z", // Made this active for demo
      "timeToSolveInMinutes": 90,
      "totalPoints": 120,
      "totalNoOfQuestions": 3
    },
    {
      "id": 2,
      "title": "sample_test",
      "opensOn": "2025-02-25T07:31:02.933Z",
      "closesOn": "2025-03-25T20:01:02.947Z", // Made this active for demo
      "timeToSolveInMinutes": 90,
      "totalPoints": 120,
      "totalNoOfQuestions": 3
    },
    {
      "id": 3,
      "title": "Upcoming_Contest_1",
      "opensOn": "2025-04-05T08:30:00.000Z",
      "closesOn": "2025-04-05T20:01:02.947Z",
      "timeToSolveInMinutes": 120,
      "totalPoints": 150,
      "totalNoOfQuestions": 4
    },
    {
      "id": 4,
      "title": "Finished_Contest_1",
      "opensOn": "2025-01-15T08:30:00.000Z",
      "closesOn": "2025-01-15T20:01:02.947Z",
      "timeToSolveInMinutes": 60,
      "totalPoints": 100,
      "totalNoOfQuestions": 2
    },
    {
        "id": 5,
        "title": "Finished_Contest_2",
        "opensOn": "2025-01-15T08:30:00.000Z",
        "closesOn": "2025-01-15T20:01:02.947Z",
        "timeToSolveInMinutes": 60,
        "totalPoints": 100,
        "totalNoOfQuestions": 2
      }
  ];
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active'); // Default to active tab
  
  // Mock current date for demonstration
  const currentDate = new Date('2025-03-23');
  
  // Categorize contests
  const active = [];
  const upcoming = [];
  const finished = [];
  
  sampleData?.forEach(contest => {
    const opensOn = new Date(contest.opensOn);
    const closesOn = new Date(contest.closesOn);
    
    if (currentDate >= opensOn && currentDate <= closesOn) {
      active.push(contest);
    } else if (currentDate < opensOn) {
      upcoming.push(contest);
    } else {
      finished.push(contest);
    }
  });
  
  // Filter contests based on search term
  const filterContests = (contests) => {
    return contests.filter(contest => 
      contest.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const filteredActive = filterContests(active);
  const filteredUpcoming = filterContests(upcoming);
  const filteredFinished = filterContests(finished);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Calculate time remaining
  const getTimeRemaining = (dateString) => {
    const targetDate = new Date(dateString);
    const now = currentDate; // Using our mock current date
    const diffMs = targetDate - now;
    
    // If the date has passed
    if (diffMs < 0) {
      return "Expired";
    }
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h remaining`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m remaining`;
    } else {
      return `${diffMinutes}m remaining`;
    }
  };
  
  // Render a contest card
  const renderContestCard = (contest , type) => (
    <div 
      onClick={()=>{handleClick(contest.title)}}
      key={contest.id} 
      className="px-4 py-3 cursor-pointer border-b-2 w-full border-[#3b3b3b] hover:bg-[#252525] "
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-medium text-white font-['Courier_New']">
            {contest.title}
          </p>
          <div className="flex flex-wrap  gap-2">
            {/* <span className="text-xs px-2 py-1 rounded bg-purple-900 text-purple-200">
              {contest.timeToSolveInMinutes} mins
            </span>
            <span className="text-xs px-2 py-1 rounded bg-blue-900 text-blue-200">
              {contest.totalPoints} points
            </span> */}
            {/* <span className="text-xs px-2 py-1 rounded bg-indigo-900 text-indigo-200">
              {contest.totalNoOfQuestions} questions
            </span> */}
          </div>
        </div>
      </div>
      {
        type=='finished' &&   
      
      <div className="text-sm text-gray-400 font-['Courier_New']">
        {/* <p>Opens: {formatDate(contest.opensOn)}</p> */}
        <p>Closed on: {formatDate(contest.closesOn)}</p>
        {currentDate < new Date(contest.closesOn) && (
          <p className="text-[#2bbdaa] mt-1">{getTimeRemaining(contest.closesOn)}</p>
        )}
      </div>
      }

    {
        type=='active' &&   
      
      <div className="text-sm text-gray-400 font-['Courier_New']">
        {/* <p>Opens: {formatDate(contest.opensOn)}</p> */}
        <p>Closes on: {formatDate(contest.closesOn)}</p>
        {currentDate < new Date(contest.closesOn) && (
          <p className="text-[#2bbdaa] mt-1">{getTimeRemaining(contest.closesOn)}</p>
        )}
      </div>
      }

{
        type=='upcoming' &&   
      
      <div className="text-sm text-gray-400 font-['Courier_New']">
        {/* <p>Opens: {formatDate(contest.opensOn)}</p> */}
        <p>Opens on: {formatDate(contest.opensOn)}</p>
        {currentDate < new Date(contest.opensOn) && (
          <p className="text-[#2bbdaa] mt-1">{getTimeRemaining(contest.opensOn)}</p>
        )}
      </div>
      }
    </div>
  );
  
  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'active':
        return (
          <div className="w-full">
            {filteredActive.length > 0 ? (
              filteredActive.map(contest => renderContestCard(contest , 'active'))
            ) : (
              <div className="text-center py-8 text-gray-400 font-['Courier_New']">
                No active contests at the moment
              </div>
            )}
          </div>
        );
      case 'upcoming':
        return (
          <div className="w-full">
            {filteredUpcoming.length > 0 ? (
              filteredUpcoming.map(contest => renderContestCard(contest , 'upcoming'))
            ) : (
              <div className="text-center py-8 text-gray-400 font-['Courier_New']">
                No upcoming contests found
              </div>
            )}
          </div>
        );
      case 'finished':
        return (
          <div className="w-full">
            {filteredFinished.length > 0 ? (
              filteredFinished.map(contest => renderContestCard(contest , 'finished'))
            ) : (
              <div className="text-center py-8 text-gray-400 font-['Courier_New']">
                No finished contests found
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="h-5/6 w-5/6 overflow-hidden flex flex-col text-gray-200 relative">
      {/* Header with search */}
      <div className='sticky transform top-0 bg-[#1c1b1b] rounded-3xl border-b-0 rounded-b-none border-2 px-3  border-[#3b3b3b]'>
        <h1 className='text-base font-["Courier_New"] text-[#2bbdaa] pt-2 px-2' >CONTESTS</h1>
        <div>
          
        </div>
      </div>
      
      {/* Main content area */}
      <div className="rounded-3xl rounded-br-none border-2 h-full border-[#3b3b3b] bg-[#1c1b1b] border-t-0 rounded-t-none flex flex-col items-center overflow-hidden">
        {/* Tab navigation */}
        <div className="w-full text-xs flex border-b-2 border-[#3b3b3b] bg-[#222]">
        <button 
            onClick={() => setActiveTab('finished')}
            className={`flex-1  px-4 font-["Courier_New"] text-center ${activeTab === 'finished' ? 'text-[#2bbdaa] border-b-2 border-[#2bbdaa]' : 'text-gray-400'}`}
          >
            FINISHED ({finished.length})
          </button>
          <button 
            onClick={() => setActiveTab('active')}
            className={`flex-1 px-4 font-["Courier_New"] text-center text-xs ${activeTab === 'active' ? 'text-[#2bbdaa] border-b-2 border-[#2bbdaa]' : 'text-gray-400'}`}
          >
            ACTIVE ({active.length})
          </button>
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 px-4 font-["Courier_New"] text-center ${activeTab === 'upcoming' ? 'text-[#2bbdaa] border-b-2 border-[#2bbdaa]' : 'text-gray-400'}`}
          >
            UPCOMING ({upcoming.length})
          </button>
          
        </div>
        
        {/* Contest list with overflow scrolling */}
        <div className="w-full overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ContestsDashboard;