import { useEffect, useState } from "react";
import { ArrowLeft, Clock, AlertCircle, Check, X } from 'lucide-react';
import Cookies from 'js-cookie'
import { useNavigate, useParams } from "react-router-dom";

const ContestHandlerPage = () => {
    const {uname , tname} = useParams();
  const [questionDetails, setQuestionDetails] = useState({});
  const [time , setTime] = useState({});
  const nav = useNavigate();

  async function handleSubmit() {
    try{
        const submit = await fetch("http://localhost:4000/submission/submit-contest",{
            method:"POST",
            body: JSON.stringify({session:Cookies.get("session"),uname:uname,tname:tname}),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const outcome = await submit.json();
        if(outcome.err){
            throw new Error(outcome.err)
        }
        else{
            alert(`Contest submitted successfully... u secured ${outcome.pts} points woohoo`);
            nav(`/${uname}`)
        }
    }
    catch(error){
        alert("Aiyaiyo error submitting contest..")
        alert(error.message)
    }
  }

  async function fetchData() {
    try {
      const details = await fetch("http://localhost:4000/basic/contest-handle", {
        method: "POST",
        body: JSON.stringify({ uname: uname, session:Cookies.get("session"), tname: tname }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await details.json();
      if (data.msg) {
        setQuestionDetails(data.allData);
        setTime({"minutes":data.minutes , "seconds":data.seconds})
      } else {
        throw new Error(data.err);
      }
    } catch (error) {
      alert("Hey wtf");
      nav(`/${uname}`)
    }
  }

  useEffect(() => {
    if (Object.keys(questionDetails).length === 0) {
      console.log("called");
      fetchData();
    }
  }, []);

  const Timer = ({ minutes,sec }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60 + sec);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className="flex items-center space-x-2 text-xl font-mono">
        <Clock className="w-6 h-6" />
        <span>{formatTime(timeLeft)}</span>
      </div>
    );
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'EASY': 'text-green-400',
      'MEDIUM': 'text-yellow-400',
      'HARD': 'text-red-400'
    };
    return colors[difficulty] || 'text-gray-400';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'FAILED':
        return <X className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={()=>{nav(`/${uname}/contest/${tname}`)}}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <Timer minutes={time?.minutes} 
          sec={time?.seconds}/>
        </div>

        {/* Contest Title */}
        <h1 className="text-3xl font-bold mb-6">{questionDetails.title}</h1>

        {/* Questions Grid */}
        <div className="space-y-6">
          {questionDetails?.question?.map((ques, index) => (
            <div 
              key={ques.id} 
              className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {index + 1}. {ques.title}
                    </h2>
                    <div className="flex space-x-4 text-sm">
                      <span className={getDifficultyColor(ques.difficulty)}>
                        {ques.difficulty}
                      </span>
                      <span className="text-gray-400">
                        {ques.pointsPerTestCaseSolved} points per test case
                      </span>
                      <span className="text-gray-400">
                        {ques.timeToSolveInMinutes} minutes
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {ques.submission.map(sub => getStatusIcon(sub.status))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-300">{ques.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-400">
                    <div>
                      <span>Hidden Test Cases: </span>
                      <span className="text-white">{ques.noOfHiddenTestCases}</span>
                    </div>
                    <div>
                      <span>External Test Cases: </span>
                      <span className="text-white">{ques.noOfExternalTestCases}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {}}
                    className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Solve Question
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-6 mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-lg font-semibold shadow-lg"
          >
            <span>Submit All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestHandlerPage;