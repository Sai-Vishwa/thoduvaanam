import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Editor from '@monaco-editor/react';
import Cookies from 'js-cookie';
import { ArrowLeft, Clock, SkipBack } from 'lucide-react';

const CodingPage = () => {
  const nav = useNavigate();
  const [language, setLanguage] = useState('Java');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [isLowTime, setIsLowTime] = useState(false);
  const [cCode , setCCode] = useState("");
  const [cppCode , setCppCode] = useState("");
  const [javaCode , setJavaCode] = useState("");
  const [pythonCode , setPythonCode] = useState("");
  const [lastSubmit , setLastSubmit] = useState({lang:"Java" , code:""});


  const saveTimer = useRef(null);

  const resetAutoSaveTimer = () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(autoSave, 120000); // 2 minutes
  };

  const autoSave = async () => {
    const dummy =  await new Promise ((resolve)=>{
        toast.promise(new Promise((resolve,reject)=>{
          fetch("http://localhost:4000/submission/auto-save-solution", {
            method: "POST",
            body: JSON.stringify({
               uname: uname,
               session: Cookies.get("session"), 
               sId:details.details.data.id, 
               savedCCode:cCode,
               savedCppCode:cppCode,
               savedJavaCode:javaCode,
               savedPythonCode:pythonCode
              }),
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
          loading: "Saving...",
          success: (data)=>{
            resolve()
            return (`Successful`)
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
      resetAutoSaveTimer()
  };


  const [testResults, setTestResults] = useState({
    visible: [
      { passed: false, input: '', expectedOutput: '', actualOutput: '' },
      { passed: false, input: '', expectedOutput: '', actualOutput: '' }
    ],
    hidden: {
      totalTests: 0,
      passedTests: 0,
      failedInput: '',
      isChecked: false
    }
  });
  const [showResults, setShowResults] = useState(false);
  const [details, setDetails] = useState({ details: {}, error: null });
  const [loading, setLoading] = useState(true);
  const [template , setTemplate] = useState({})

  const { uname, qname } = useParams();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft(prev => ({ ...prev, seconds: prev.seconds - 1 }));
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
      } else {
        clearInterval(timer);
        if(questionData?.type=="CONTEST"){
          nav(`/${uname}/contest-handler/${questionData.contest.title}`)
        }
        else if(questionData.type==="PRACTICE"){
          nav(`/${uname}`)
        }
        // Handle contest end
      }
      
      // Check if less than 5 minutes remaining
      if (timeLeft.minutes < 5) {
        setIsLowTime(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Language mapping for Monaco editor
  const languageMap = {
    'Java': 'java',
    'C': 'c',
    'C++': 'cpp',
    'Python': 'python'
  };

  // Initial code templates for each language
  const templates = {
    'C': `#include <stdio.h>

int main() {
    // TODO: Implement weighted average calculation
    return 0;
}`,
    'C++': `#include <iostream>
#include <iomanip>
#include <vector>
using namespace std;

int main() {
    // TODO: Implement weighted average calculation
    return 0;
}`,
    'Python': `# TODO: Implement weighted average calculation
`,
    'Java': `import java.util.*;
import java.text.DecimalFormat;

public class Main {
    public static void main(String[] args) {
        // TODO: Implement weighted average calculation
    }
}`
  };

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/basic/coding-page", {
        method: "POST",
        body: JSON.stringify({ uname: uname, session: Cookies.get("session"), qname: qname }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.err) {
        throw new Error(data.err);
      } else {
        setDetails({ details: data, error: null });
        // Set the language based on the backend data
        setTimeLeft ({"minutes":data.minutes , "seconds":data.seconds})
        setTemplate({c:data.data.savedCCode,cpp:data.data.savedCppCode,java:data.data.savedJavaCode,python:data.data.savedPythonCode})
        setCCode(data.data.savedCCode)
        setCppCode(data.data.savedCppCode)
        setJavaCode(data.data.savedJavaCode)
        setPythonCode(data.data.savedPythonCode)
        setLastSubmit({lang:"Java",code:data.data.savedJavaCode})
        setTestResults({
          visible: [
            { passed: data.data["output1Status"]=="YES"?true:false, input: data.ip1.Input, expectedOutput: data.ip1.Output, actualOutput: data.data.output1 },
            { passed: data.data["output2Status"]=="YES"?true:false, input: data.ip2.Input, expectedOutput: data.ip2.Output, actualOutput: data.data.output2 }
          ],
          hidden: {
            totalTests: data.totaltc,
            passedTests: data.data.noOfCasesPassed,
            failedInput: data.data.failedForInput,
            isChecked:data.data.isChecked
          }
        })
        
        if (data.data && data.data.language) {
          const backendLanguage = data.data.language;
          const mappedLanguage = backendLanguage === 'JAVA' ? 'Java' : 
                                 backendLanguage === 'PYTHON' ? 'Python' : 
                                 backendLanguage === 'C' ? 'C' : 'C++';
          setLanguage(mappedLanguage);
          // Set initial code if available, otherwise use template
          setCode(data.data.code || templates[mappedLanguage]);
        }
      }
    } catch (error) {
      console.error(error);
      setDetails({ details: {}, error: "Some internal error try again" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    resetAutoSaveTimer(); // Start autosave on mount
    return () => clearTimeout(saveTimer.current); 
  }, []);

  useEffect(() => {
    // Set initial code based on selected language if not already set
    if (!code && templates[language]) {
      setCode(templates[language]);
    }
  }, [language]);
  const handleEditorChange = (value) => {
    if(language=="Java"){
      setJavaCode(value)
    
    }
    else if(language=="C++"){
      setCppCode(value)
    }
    else if(language=="Python"){
      setPythonCode(value)
    }
    else if(language=="C"){
      setCCode(value)
    }
    setCode(value);
  };

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage !== language) {
      // Show confirmation dialog if code has been modified
      setLanguage(newLanguage)
    }
  };






  const handleCheckCode = async () => {

    await handleSaveCode();

      let result = {}
      let status = false
      
      const dummy =  await new Promise ((resolve)=>{
          toast.promise(new Promise((resolve,reject)=>{
            fetch("http://localhost:4000/submission/check-submission", {
              method: "POST",
              body: JSON.stringify({ 
                uname: uname, 
                session: Cookies.get("session"),
                language:language=="Java"?"JAVA":language=="Python"?"PYTHON":language=="C"?"C":"CPP",
                code:language=="Java"?javaCode:language=="Python"?pythonCode:language=="C"?cCode:cppCode,
                qname:qname,
                sId:details.details.data.id
               }),
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
            loading: "Checking your code...",
            success: (data)=>{
              status=true
              result = data
              console.log("i must be first")
              resolve()
              return (`Checked successfully`)
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
          setTestResults({
            visible: [
              { passed: result.op1Pass, input: testResults.visible[0].input, expectedOutput:testResults.visible[0].expectedOutput, actualOutput: result.op1 },
              { passed: result.op2Pass, input: testResults.visible[1].input, expectedOutput: testResults.visible[1].expectedOutput, actualOutput: result.op2 }
            ],
            hidden: {
              totalTests: testResults.hidden.totalTests,
              passedTests: result.count,
              failedInput: result.failedHidden,
              isChecked: "YES"
            }
          })
          setShowResults(true)
        }
        
      
  };





  const handleSaveCode = async () => {
    try {
      resetAutoSaveTimer();
       await autoSave()
      
    }
    catch(error){
      
    }
  };


  const getTimeLeft = () => {
    const minutes = timeLeft?.minutes?.toString()?.padStart(2, '0');
    const seconds = timeLeft?.seconds?.toString()?.padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSubmitCode = async () => {
    
      setIsSubmitting(true);
      let status = false
      if(questionData.type=="PRACTICE"){
        let status2 = false
        const dummy =  await new Promise ((resolve)=>{
          toast.promise(new Promise((resolve,reject)=>{
            fetch("http://localhost:4000/submission/submit-question", {
              method: "POST",
              body: JSON.stringify({ uname: uname, session: Cookies.get("session"), sId: details.details.data.id , tname:qname}),
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
              status2 = true
              console.log("i must be first")
              resolve()
              return (`Submitted successfully`)
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
        if(status2){
          setIsSubmitting(!isSubmitting)
          nav(`/${uname}`)
        }
      }
      const dummy =  await new Promise ((resolve)=>{
                    toast.promise(new Promise((resolve,reject)=>{
                      fetch("http://localhost:4000/submission/submit-question-of-a-contest", {
                        method: "POST",
                        body: JSON.stringify({ uname: uname, session: Cookies.get("session"), submissionId: details.details.data.id}),
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
                        console.log("i must be first")
                        resolve()
                        return (`Navigating back`)
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
                    setIsSubmitting(!isSubmitting)
                    nav(`/${uname}/contest-handler/${questionData.contest.title}`)
                  } 
                }

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  const formatTimeLeft = () => {
    if (!details.details?.data?.maxTimeToSolve) return "Time: N/A";
    
    const endTime = new Date(details.details.data.maxTimeToSolve);
    const now = new Date();
    const timeLeftMs = endTime - now;
    
    if (timeLeftMs <= 0) return "Time Expired";
    
    const minutes = Math.floor(timeLeftMs / 60000);
    const seconds = Math.floor((timeLeftMs % 60000) / 1000);
    
    return `Time Left: ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-[#121212] text-[#ddf3ef]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2bbdaa] mx-auto mb-4"></div>
          <p>Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (details.error) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-[#121212] text-[#ddf3ef]">
        <div className="text-center p-8 bg-[#1c1b1b] rounded-lg border border-red-500">
          <h2 className="text-xl mb-4">Error Loading Challenge</h2>
          <p className="mb-4">{details.error}</p>
          <motion.button
            onClick={() => nav("/")}
            className="text-[#ddf3ef] border-2 border-[#ddf3ef] px-4 py-1 rounded-lg text-sm hover:border-[#2bbdaa] transition-colors font-mono"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Dashboard
          </motion.button>
        </div>
      </div>
    );
  }

  const questionData = details.details?.ques || {};


  const submissionData = details.details?.data || {};


  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-mono relative bg-[#121212]">
      <div className="w-full bg-[#1c1b1b] border-b border-[#3b3b3b] p-4 flex items-center">
        <div className='w-1/3'>

        <span
        onClick={()=>{
          const ok = confirm("Potential loss of unsaved data.. make sure you saved your code")
          if(!ok){
            return
          }
          if(questionData.type=="CONTEST"){
            nav(`/${uname}/contest-handler/${questionData.contest.title}`)
          }
          else if(questionData.type==="PRACTICE"){
            nav(`/${uname}`)
          }
        }}
        className='text-[#ddf3ef] w-fit basic-1 border-0 hover:text-[#36ead2] transition-colors flex justify-start space-x-1 items-center'>
        <ArrowLeft className='w-4 h-4'/>

        <button
          className=" text-base  font-mono"
          
          >
          Back
        </button>
          </span>
            </div>
        <div className="flex flex-col items-center w-1/3 justify-center">
          <h1 className="text-[#ddf3ef] text-xl">{questionData.title || "Coding Challenge"}</h1>
          <div className={`flex items-center space-x-2 rounded-xl`}>
                <Clock className={`w-4 h-4  ${isLowTime ? 'text-[#ff5252]' : 'text-[#2bbdaa]'} ${isLowTime ? 'animate-pulse' : ''}`} />
                <span className={`${isLowTime ? 'text-[#ff5252]' : 'text-[#2bbdaa]'}  text-base font-['Yu_Gothic']`}>{getTimeLeft()}</span>
              </div>
        </div>
        <div className='w-1/3 flex justify-end pr-5'>

        <div className="text-[#ddf3ef] text-sm px-4 py-1 rounded-lg bg-[#2a2a2a]">
          Difficulty: <span className={
            questionData.difficulty === "EASY" ? "text-green-500" :
            questionData.difficulty === "MEDIUM" ? "text-yellow-500" :
            "text-red-500"
          }>
            {questionData.difficulty || "INTENSE"}
          </span>
        </div>
            </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Question details */}
        <motion.div 
          className="w-1/3 p-6 border-r border-[#3b3b3b] overflow-y-auto bg-[#1c1b1b]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[#ddf3ef] text-xl mb-4 font-semibold">{questionData.title || "Weighted Average"}</h2>
          <div className="text-[#ddf3ef] text-sm space-y-4">
            <p className="whitespace-pre-line">
              {questionData.description || "No description available"}
            </p>
            
            {/* Additional information */}
            <div className="mt-6 space-y-4">
              
              <div className="bg-[#2a2a2a] p-3 rounded">
                <h3 className="text-[#ddf3ef] font-semibold mb-2">Test Cases:</h3>
                <p>External Test Cases: {questionData.noOfExternalTestCases || 2}</p>
                <p>Hidden Test Cases: {questionData.noOfHiddenTestCases || 18}</p>
                <p>Points per Test Case: {questionData.pointsPerTestCaseSolved || 5}</p>
              </div>
              
              
            </div>
          </div>
        </motion.div>
        
        {/* Right panel - Editor and results */}
        <motion.div 
          className="w-2/3 flex flex-col bg-[#1c1b1b] overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Language selection and action buttons */}
          <div className="px-6 py-3 border-b border-[#3b3b3b] flex justify-between items-center">
            <div className="flex space-x-2">
              {['C', 'C++', 'Python', 'Java'].map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 rounded text-sm ${
                    language === lang 
                      ? 'border border-[#2bbdaa] text-[#2bbdaa]' 
                      : 'text-[#ddf3ef] border border-[#3b3b3b] hover:border-[#2bbdaa]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {lang}
                </motion.button>
              ))}
            </div>
            <div className="flex space-x-2">
              <motion.button
                onClick={handleSaveCode}
                className="text-[#ddf3ef] border border-[#ddf3ef] px-4 py-1 rounded-lg text-sm hover:border-[#2bbdaa] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save
              </motion.button>
              <motion.button
                onClick={handleCheckCode}
                disabled={isSubmitting}
                className=" text-[#ddf3ef] border border-[#ddf3ef] px-4 py-1 rounded-lg text-sm hover:border-[#2bbdaa] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Checking..." : "Save & Run"}
              </motion.button>
              
              <motion.button
                onClick={handleSubmitCode}
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </motion.button>
            </div>
          </div>
          
          {/* Code editor */}
          <div className="flex-1 overflow-x-auto">
                <Editor
                  height="100%"
                  language={languageMap[language] || 'java'}
                  value={language=="Java"?javaCode:language=="C++"?cppCode:language=="Python"?pythonCode:cCode}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    fontSize: 16,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    tabSize: 2,
                  }}
                />
          </div>
          
          {/* Test results toggle button */}
          
            <motion.button
              onClick={toggleResults}
              className="w-full py-2 bg-[#2a2a2a] text-[#ddf3ef] text-sm border-t border-[#3b3b3b] flex items-center justify-center"
              whileHover={{ backgroundColor: '#333333' }}
            >
              {showResults ? "▼ Hide Test Results" : "▲ Show Test Results"}
            </motion.button>
          
          
          {/* Test results */}
          <AnimatePresence>
            {showResults && (
              <motion.div 
                className="border-t border-[#3b3b3b] p-4 bg-[#1c1b1b] overflow-y-auto max-h-80"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3 className="text-[#ddf3ef] font-semibold mb-3">Test Results</h3>
                
                {/* Visible test cases */}
                <div className="mb-4">
                  <h4 className="text-[#ddf3ef] text-sm mb-2">External Test Cases:</h4>
                  <div className="space-y-3">
                    {testResults.visible.map((test, index) => (
                      <div key={index} className="bg-[#2a2a2a] p-3 rounded text-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[#ddf3ef]">Test Case {index + 1}</span>
                          <span className={test.passed ? "text-green-500" : "text-red-500"}>
                            {test.passed &&  testResults.hidden.isChecked=="YES"? "✓ Passed" : testResults.hidden.isChecked=="YES"?"X Failed":""}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-[#ddf3ef] opacity-70">Input:</p>
                            <pre className="text-[#ddf3ef] font-mono bg-[#333333] p-1 rounded overflow-hidden">{test.input}</pre>
                          </div>
                          <div>
                            <p className="text-[#ddf3ef] opacity-70">Expected Output:</p>
                            <pre className="text-[#ddf3ef] font-mono bg-[#333333] p-1 rounded overflow-hidden">{test.expectedOutput}</pre>
                          </div>
                          <div className="col-span-2">
                            <p className="text-[#ddf3ef] opacity-70">Your Output:</p>
                            <pre className="text-[#ddf3ef] font-mono bg-[#333333] p-1 rounded overflow-hidden">{test.actualOutput}{" "}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hidden test cases */}
                <div>
                  <h4 className="text-[#ddf3ef] text-sm mb-2">Hidden Test Cases:</h4>
                  <div className="bg-[#2a2a2a] p-3 rounded text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#ddf3ef]">
                        {testResults.hidden.passedTests} of {testResults.hidden.totalTests} test cases passed
                      </span>
                      <span className={
                        testResults.hidden.passedTests === testResults.hidden.totalTests 
                          ? "text-green-500" 
                          : "text-yellow-500"
                      }>
                        {testResults.hidden.passedTests === testResults.hidden.totalTests 
                          ? "✓ All Passed" 
                          : testResults.hidden.isChecked=="YES"?"Some failed":""}
                      </span>
                    </div>
                    
                    {testResults.hidden.passedTests < testResults.hidden.totalTests && (
                      <div>
                        <p className="text-[#ddf3ef] opacity-70">Failed for the input:</p>
                        <pre className="text-[#ddf3ef] font-mono bg-[#333333] p-1 rounded">{testResults.hidden.failedInput}{" "}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <Toaster duration={3000} position="bottom-right"/>
    </div>
  );
};

export default CodingPage;