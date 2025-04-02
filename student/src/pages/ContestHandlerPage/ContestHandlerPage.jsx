import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Check, X } from 'lucide-react';
import Cookies from 'js-cookie'
import { useNavigate, useParams } from "react-router-dom";
import { ClipboardList, CheckCircle, AlertCircle, ArrowRight , AlertTriangle} from 'lucide-react';
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";


const   ContestHandlerPage = () => {

  const [contest, setContest ] = useState({});
  const [timeLeft, setTimeLeft] = useState({minutes:-10 , seconds:-10});
  const [activeTab, setActiveTab] = useState("overview");
  const [isLowTime, setIsLowTime] = useState(false);

  const [terminate , setTerminate] = useState(false)
  const nav = useNavigate();
  const {uname , cname} = useParams()

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft(prev => ({ ...prev, seconds: prev.seconds - 1 }));
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
      } else {
        clearInterval(timer);
        if(terminate && timeLeft.minutes>-1){
          handleSubmit()
        }
        // Handle contest end
      }
      
      // Check if less than 5 minutes remaining
      if (timeLeft.minutes < 5) {
        setIsLowTime(true);
        setTerminate(true)
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
     });
  };

  const getTimeLeft = () => {
    const minutes = timeLeft?.minutes?.toString()?.padStart(2, '0');
    const seconds = timeLeft?.seconds?.toString()?.padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  
  async function handleSubmit() {
    let status = false
    let dt = {}
    const dummy =  await new Promise ((resolve)=>{
        toast.promise(new Promise((resolve,reject)=>{
          fetch("http://localhost:4000/submission/submit-contest", {
            method: "POST",
            body: JSON.stringify({ uname: uname, session: Cookies.get("session"), tname: cname }),
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
          loading: "Submitting...",
          success: (data)=>{
            status = true
            dt = data
            console.log("i must be first")
            resolve()
            return (`Submission successful`)
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
      if(status){
        nav(`/${uname}`);
      } 
  }



  async function fetchData() {
      try {
        const details = await fetch("http://localhost:4000/basic/contest-handle", {
          method: "POST",
          body: JSON.stringify({ uname: uname, session:Cookies.get("session"), tname: cname }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data = await details.json();
        if (data.msg) {
          setContest(data.allData);
          setTimeLeft ({"minutes":data.minutes , "seconds":data.seconds})
        } else {
          throw new Error(data.err);
        }
      } catch (error) {
        alert(JSON.stringify(error.message));
        nav(`/${uname}`)
      }
    }

    useEffect(()=>{
      fetchData()
    },[])

    return (
      <div className="min-h-screen main p-4 flex justify-center">
        <Toaster 
        position="bottom"/>
        <div className="w-full max-w-6xl border-2 border-[#3b3b3b] bg-[#1c1b1b] rounded-2xl p-6 text-[#ddf3ea]">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[#2bbdaa]">{contest.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`flex items-center space-x-2 rounded-xl`}>
                <Clock className={`w-4 h-4  ${isLowTime ? 'text-[#ff5252]' : 'text-[#2bbdaa]'} ${isLowTime ? 'animate-pulse' : ''}`} />
                <span className={`${isLowTime ? 'text-[#ff5252]' : 'text-[#2bbdaa]'}  text-base font-['Yu_Gothic']`}>{getTimeLeft()}</span>
              </div>
              
              <motion.div 
                
            >
                <div ><a className="click-btn btn-style3" onClick={handleSubmit} href="#">Submit</a></div>
                {/* <span className="mas">LOGIN</span>
                <button type="button" name="Hover"  onClick={()=>{nav("/login")}}>LOGIN</button> */}
            </motion.div>
            </div>
          </div>
          
          {/* Contest Info */}
          <div className="p-1 mb-1">
          <p className="text-[#a7b9b2]">{contest.miniDescription}</p>

          </div>

          
          
          {/* Rules Section */}
          <div className="bg-[#222] border-2 border-[#323232] rounded-xl px-5 pt-3 text-[#2bbdaa] mt-2 pb-5 mb-4 ">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className=" w-5 h-5" />
              <h2 className="text-lg font-bold">Contest Rules</h2>
            </div>
            
            <div className="bg-[#1c1b1b] p-4 pt-2 rounded-lg overflow-y-auto h-[20vh]">
              <ul className="list-disc list-inside text-[#ddf3ea] space-y-3">
                <li>Complete all questions within the given time limit of {contest.timeToSolveInMinutes} minutes.</li>
                <li>Each question has external and hidden test cases. Points are awarded per test case solved correctly.</li>
                <li>Submit your final answers before the timer runs out or your progress will not be saved.</li>
                <li className="text-[#ff5252] font-medium">Any form of malpractice, including but not limited to plagiarism, collaboration, or using unauthorized resources, will lead to immediate disqualification and potential termination of your account.</li>
                <li>You cannot leave the page during the contest. Doing so may result in automatic submission.</li>
              </ul>
            </div>
          </div>
          
          {/* Questions */}
          <div className="bg-[#222] border-2 border-[#323232] rounded-xl px-5 pt-3   pb-5">
            <h2 className="text-xl font-bold mb-2 text-[#2bbdaa]">Questions</h2>
            {contest?.question?.map((q, index) => (
              <div key={q.id} className="bg-[#1c1b1b] border border-[#323232] rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    
                    <div>
                      <div className="font-medium text-[#36ead2]">{q.title}</div>
                      <div className="text-sm text-[#a7b9b2]">{q.miniDescription}</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                  <motion.div 
                
            >
                <div className="flex flex-col items-center" >
                  <div>
                    {q?.submission[0]?.isFinal == "YES"?(
                      <span className="text-[#36ead2] text-sm">COMPLETED</span>
                    ):(<span className="text-[#f8f880] text-sm">PENDING</span>)}
                  </div>
                  <a className="click-btn btn-style3" onClick={()=>{nav(`/${uname}/question/${q.title}`)}} href="#">Solve</a></div>
                {/* <span className="mas">LOGIN</span>
                <button type="button" name="Hover"  onClick={()=>{nav("/login")}}>LOGIN</button> */}
            </motion.div>
                </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                  <div>
                    <div className="text-xs text-[#36ead2]">POINTS PER TEST CASE</div>
                    <div className="text-sm font-medium text-[#ddf3ea]">{q.pointsPerTestCaseSolved}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#36ead2]">EXTERNAL TEST CASES</div>
                    <div className="text-sm font-medium text-[#ddf3ea]">{q.noOfExternalTestCases}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#36ead2]">HIDDEN TEST CASES</div>
                    <div className="text-sm font-medium text-[#ddf3ea]">{q.noOfHiddenTestCases}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#36ead2]">TOTAL POINTS POSSIBLE</div>
                    <div className="text-sm font-medium text-[#ddf3ea]">
                      {q.pointsPerTestCaseSolved * (q.noOfExternalTestCases + q.noOfHiddenTestCases)}
                    </div>
                  </div>
                </div>
                
                
              </div>
            ))}
            <div className="flex justify-end">

            <motion.div 
                
                >
                <div ><a className="click-btn btn-style3" onClick={handleSubmit} href="#">Submit</a></div>
                {/* <span className="mas">LOGIN</span>
                <button type="button" name="Hover"  onClick={()=>{nav("/login")}}>LOGIN</button> */}
            </motion.div>
                </div>
          </div>
        </div>
      </div>
    )
  
};

export default ContestHandlerPage;







  