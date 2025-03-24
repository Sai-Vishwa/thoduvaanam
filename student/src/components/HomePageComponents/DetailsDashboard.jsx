import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Info, 
  FileText, 
  Play, 
  Award, 
  Timer 
} from 'lucide-react';

const DashboardDetails = ({ type, details }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const renderStatusButton = () => {
    const status = details.status;
    const buttonClasses = "px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center space-x-2 transition-all";
    
    const statusMap = {
      "START NEW ATTEMPT": { 
        icon: <Play className="w-4 h-4" />, 
        color: "bg-green-600 hover:bg-green-700 text-white" 
      },
      "CONTINUE LAST ATTEMPT": { 
        icon: <Play className="w-4 h-4" />, 
        color: "bg-yellow-600 hover:bg-yellow-700 text-white" 
      },
      "COMPLETED": { 
        icon: <CheckCircle2 className="w-4 h-4" />, 
        color: "bg-blue-600 hover:bg-blue-700 text-white" 
      },
      "ENDED": { 
        icon: <XCircle className="w-4 h-4" />, 
        color: "bg-red-600 hover:bg-red-700 text-white" 
      },
      "NOT STARTED": { 
        icon: <Clock className="w-4 h-4" />, 
        color: "bg-gray-600 hover:bg-gray-700 text-white" 
      }
    };

    const statusConfig = statusMap[status] || statusMap["NOT STARTED"];

    return (
      <button className={`${buttonClasses} ${statusConfig.color}`}>
        {statusConfig.icon}
        <span>{status}</span>
      </button>
    );
  };

  const renderDetailsContent = () => {
    if (type === 'question') {
      const questionData = details.questionData;
      return (
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#2bbdaa]" />
            <span className="font-bold">{questionData.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-[#2bbdaa]" />
            <span>{questionData.miniDescription}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4 text-[#2bbdaa]" />
            <span>Time to Solve: {questionData.timeToSolveInMinutes} minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#2bbdaa]" />
            <span>Points: {questionData.points}</span>
          </div>
        </div>
      );
    }

    if (type === 'contest') {
      const contestData = details.data;
      return (
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#2bbdaa]" />
            <span className="font-bold">{contestData.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-[#2bbdaa]" />
            <span>{contestData.miniDescription}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#2bbdaa]" />
            <span>Opens: {new Date(contestData.opensOn).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-[#2bbdaa]" />
            <span>Closes: {new Date(contestData.closesOn).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4 text-[#2bbdaa]" />
            <span>Time to Solve: {contestData.timeToSolveInMinutes} minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#2bbdaa]" />
            <span>Total Points: {contestData.totalPoints}</span>
          </div>
        </div>
      );
    }

    return <div>No details available</div>;
  };

  const renderSubmissionsContent = () => {
    const submissionData = type === 'question' 
      ? details.submissionData 
      : type === 'contest' 
        ? details.data?.question?.[0]?.submission || [] 
        : [];

    if (submissionData.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">
          No submissions yet
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {submissionData.map((submission, index) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#2b2b2b] rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-[#2bbdaa]" />
              <div>
                <div className="text-sm font-bold">Submission #{submission.id}</div>
                <div className="text-xs text-gray-400">
                  Submitted on: {new Date(submission.submittedOn).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span 
                className={`
                  text-xs font-bold px-2 py-1 rounded 
                  ${
                    submission.status === 'completed' ? 'bg-green-600 text-white' :
                    submission.status === 'computing' ? 'bg-yellow-600 text-white' :
                    submission.status === 'waiting' ? 'bg-blue-600 text-white' :
                    'bg-gray-600 text-white'
                  }
                `}
              >
                {submission.status.toUpperCase()}
              </span>
              <button className="bg-[#2bbdaa] text-white px-3 py-1 rounded-md text-xs hover:bg-[#22a89f] transition-colors">
                Review
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center h-full w-full font-['Yu_Gothic']">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-5/6 h-[70vh] pt-2 flex flex-col space-y-3 rounded-3xl border-2 border-[#3b3b3b] bg-[#1c1b1b] overflow-hidden shadow-2xl"
      >
        <div className="flex justify-center space-x-4 border-b border-[#3b3b3b] pb-2">
          {renderStatusButton()}
        </div>

        <div className="flex border-b border-[#3b3b3b]">
          <button 
            onClick={() => setActiveTab('details')}
            className={`
              w-1/2 py-2 flex items-center justify-center space-x-2 
              ${activeTab === 'details' ? 'text-[#2bbdaa] border-b-2 border-[#2bbdaa]' : 'text-gray-400'}
            `}
          >
            <Info className="w-4 h-4" />
            <span>Details</span>
          </button>
          <button 
            onClick={() => setActiveTab('submissions')}
            className={`
              w-1/2 py-2 flex items-center justify-center space-x-2 
              ${activeTab === 'submissions' ? 'text-[#2bbdaa] border-b-2 border-[#2bbdaa]' : 'text-gray-400'}
            `}
          >
            <FileText className="w-4 h-4" />
            <span>Submissions</span>
          </button>
        </div>

        <div className="px-4 py-2 overflow-y-auto">
          {activeTab === 'details' ? renderDetailsContent() : renderSubmissionsContent()}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardDetails;