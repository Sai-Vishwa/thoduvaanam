import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Info, 
  FileText, 
  Play, 
  Award, 
  Timer,
  Target 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Cookies from "js-cookie";


const DashboardDetails = ({ type, details , uname }) => {
  const [btnVisible , setBtnVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("details");
  const [isVisible, setIsVisible] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    setIsVisible(true);
  }, []);

  

  const renderStatusButton = () => {
    if (!details) return null;
    const status = details.status;
    const buttonClasses = "w-full px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center space-x-2 transition-all";

    async function buttonClick() {
      if(type=="question"){
        const qname = details.questionData.title
        if(status === "CONTINUE LAST ATTEMPT"){
          nav(`/${uname}/question/${qname}`);
        }
        else if (status == "START NEW ATTEMPT"){


          let status = false
          let dt = {}
          setBtnVisible(false)
          const dummy =  await new Promise ((resolve)=>{
              toast.promise(new Promise((resolve,reject)=>{
                fetch("http://localhost:4000/submission/solve-question", {
                  method: "POST",
                  body: JSON.stringify({ uname: uname, session: Cookies.get("session"), title: qname }),
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }
                }).then((resp) => resp.json())
                .then((data)=>{
                  if(data.err){
                    throw new Error(data.err)
                  }
                  resolve(data)
                })
                .catch((err)=> reject(err))
              }),{
                loading: "Preparing question...",
                success: (data)=>{
                  status = true
                  dt = data
                  console.log("i must be first")
                  resolve()
                  return (`Navigating to question`)
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
            console.log("i must be second")
            setBtnVisible(true)
            if(status){
              nav(`/${uname}/question/${qname}`);
            } 
          }
      }
      if(type=="contest"){
        const cname = details.data.title
        if(status === "CONTINUE LAST ATTEMPT"){
          nav(`/${uname}/contest-handler/${cname}`);
        }
        else if (status == "START NEW ATTEMPT"){


        let status = false
        let dt = {}
        setBtnVisible(false)
        const dummy =  await new Promise ((resolve)=>{
            toast.promise(new Promise((resolve,reject)=>{
              fetch("http://localhost:4000/submission/solve-contest", {
                method: "POST",
                body: JSON.stringify({ uname: uname, session: Cookies.get("session"), title: cname }),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              }).then((resp) => resp.json())
              .then((data)=>{
                if(data.err){
                  throw new Error(data.err)
                }
                resolve(data)
              })
              .catch((err)=> reject(err))
            }),{
              loading: "Starting contest...",
              success: (data)=>{
                status = true
                dt = data
                console.log("i must be first")
                resolve()
                return (`Navigating to contest`)
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
          console.log("i must be second")
          setBtnVisible(true)
          if(status){
            nav(`/${uname}/contest-handler/${cname}`);
          } 
        }
      }
        
    }
    
    const statusMap = {
      "START NEW ATTEMPT": { 
        icon: <Play className="w-4 h-4" />, 
        color: "bg-green-600 hover:bg-green-700 text-[#ddf3ea] " ,
        disabled: false
      },
      "CONTINUE LAST ATTEMPT": { 
        icon: <Play className="w-4 h-4" />, 
        color: "bg-purple-600 hover:bg-purple-700 text-[#ddf3ea]" ,
        disabled: false

      },
      "COMPLETED": { 
        icon: <CheckCircle2 className="w-4 h-4" />, 
        color: "bg-blue-600 hover:bg-blue-700 text-[#ddf3ea] disabled" ,
        disabled: true

      },
      "ENDED": { 
        icon: <XCircle className="w-4 h-4" />, 
        color: "bg-red-600 hover:bg-red-700 text-[#ddf3ea] disabled",
        disabled: true 
      },
      "NOT STARTED": { 
        icon: <Clock className="w-4 h-4" />, 
        color: "bg-gray-600 hover:bg-gray-700 text-[#ddf3ea] disabled",
        disabled: true
      }
    };
    const statusConfig = statusMap[status] || statusMap["NOT STARTED"];
    return (
      
      <button  onClick={buttonClick}
      className={`${buttonClasses} ${btnVisible?"block":"hidden"} ${statusConfig.color} p-0 m-0`} disabled={statusConfig.disabled}>
        {statusConfig.icon}
        <span>{status}</span>
      </button>
    );
  };

  const renderDefaultContent = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 text-gray-400">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#2bbdaa]">Ready to Explore?</h2>
          <p className="text-sm">
            Click on a question or contest to view its details and start your challenge!
          </p>
        </div>
      </div>
    );
  };

  const renderDetailsContent = () => {
    if (!details) return renderDefaultContent();
    
    if (type === 'question') {
      const questionData = details.questionData;
      return (
        <div className="space-y-2 ">
          <div>
            <h2 className="text-xl font-bold text-[#2bbdaa]">
              {questionData.title}
            </h2>
            <p className="text-[#ddf3ea] opacity-80 text-sm">
              {questionData.miniDescription}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[#2bbdaa]">
                <Timer className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  {questionData.timeToSolveInMinutes} mins
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[#2bbdaa]">
                <Award className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  {questionData.points} pts
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (type === 'contest') {
      const contestData = details.data;
      return (
        <div className="space-y-2">
          <div>
            <h2 className="text-2xl font-bold text-[#2bbdaa] ">
              {contestData.title}
            </h2>
            <p className="text-[#ddf3ea] opacity-80 text-sm">
              {contestData.miniDescription}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[#2bbdaa]">
                <Timer className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  {contestData.timeToSolveInMinutes} mins
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[#2bbdaa]">
                <Award className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  {contestData.totalPoints} pts
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[#2bbdaa]">
                <Award className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  No. of Questions - {contestData.totalNoOfQuestions}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 flex space-x-4">
            <div>
              <span className="text-[#2bbdaa] mr-2">Opens:</span>
              {new Date(contestData.opensOn).toLocaleString()}
            </div>
            <div>
              <span className="text-[#2bbdaa] mr-2">Closes:</span>
              {new Date(contestData.closesOn).toLocaleString()}
            </div>
          </div>
        </div>
      );
    }
    
    return renderDefaultContent();
  };

  const renderSubmissionsContent = () => {
    // If no details or no submissions, use dummy submissions
    const submissionData = details 
      ? (type === 'question' 
          ? details.submissionData 
          : type === 'contest' 
            ? details.data?.question?.[0]?.submission || [] 
            : []
        )
      : [];

    const dummySubmissions = [
      {
        id: 1,
        submittedOn: new Date().toISOString(),
        status: 'completed',
        score: 85
      },
      {
        id: 2,
        submittedOn: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        status: 'computing',
        score: null
      },
      {
        id: 3,
        submittedOn: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        status: 'waiting',
        score: null
      }
    ];

    const finalSubmissions = submissionData.length > 0 ? submissionData : dummySubmissions;

    return (
      <div className="space-y-2">
        <AnimatePresence>
          {finalSubmissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1 
              }}
              className="bg-[#2b2b2b] rounded-lg p-3 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-[#2bbdaa]" />
                <div>
                  <div className="text-sm text-[#ddf3ea]">Submission #{submission.id}</div>
                  <div className="text-xs text-gray-400">
                    Submitted on: {new Date(submission?.submittedOn).toISOString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span 
                  className={`
                    text-xs font-bold px-2 py-1 rounded 
                    ${
                      submission.status === 'completed' ? 'text-[#42f2a8]' :
                      submission.status === 'computing' ? 'text-[#c84ae5]' :
                      submission.status === 'waiting' ? ' text-[#44bade]' :
                      'bg-gray-600 text-[#ddf3ea]'
                    }
                  `}
                >
                  {submission.status.toUpperCase()}
                </span>
                <button className=" text-[#ddf3ea] px-3 py-1 basic-1  hover:text-[#36ead2]  text-xs transition-colors">
                  Review
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };


  const renderNavBar = () => {
    if (!details) return null;
    return (
      <div className="relative w-full font-['Courier_New'] flex border-[#3b3b3b] bg-[#222]">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('details')}
          className={`w-1/2 flex items-center justify-center space-x-2 relative ${activeTab==='details'?"text-[#36ead2]":"text-[#ddf3ea]"}`}
        >
          <Info className="w-4 h-4" />
          <span className={``}>Details</span>
          {activeTab === 'details' && (
            <motion.div 
              layoutId="navbar-underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2bbdaa]"
            />
          )}
        </motion.button>
        
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('submissions')}
          className={`w-1/2 py-2 flex items-center justify-center space-x-2 ${activeTab==='submissions'?"text-[#36ead2]":"text-[#ddf3ea]"} relative`}
        >
          <FileText className="w-4 h-4" />
          <span>Submissions</span>
          {activeTab === 'submissions' && (
            <motion.div 
              layoutId="navbar-underline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2bbdaa]"
            />
          )}
        </motion.button>
      </div>
    );
  };
  

  return (
    <div className="flex justify-center items-center h-5/6 w-full font-['Yu_Gothic']">
                  <Toaster duration={3000} position="bottom-right"/>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full mx-7 h-full flex flex-col space-y-3 rounded-3xl border-2 border-[#3b3b3b] bg-[#1c1b1b] overflow-hidden shadow-2xl"
      >
        {Object.keys(details || {}).length > 0 && renderNavBar()}
        
        <div className="px-6 mt-0 pt-0 overflow-y-auto w-full h-4/6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'details' ? renderDetailsContent() : 
               activeTab === 'submissions' ? renderSubmissionsContent() : 
               renderDefaultContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {details && (
          <div className="px-4 py-2 border-t border-[#3b3b3b]">
            {renderStatusButton()}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardDetails;