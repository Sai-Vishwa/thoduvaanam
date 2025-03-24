import React, { useState } from 'react';
import Cookies from "js-cookie";

const QuestionDashboard = ({details , setDetailsBox , uname}) => {

  // console.log(JSON.stringify(details))
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data from backend
  const data = details

  async function handleClick(questionTitle){
    console.log("hi")
    try{
      const details = await fetch("http://localhost:4000/basic/question", {
                  method: "POST",
                  body: JSON.stringify({ uname: uname, session: Cookies.get("session"), tname: questionTitle }),
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }
                })
                const data = await details.json()
                if (data.err) {
                  throw new Error(data.err)
                } else {
                  setDetailsBox({type:"question" , details:data})
                }
    }
    catch(error){
      console.log(error)
      setDetailsBox({type:"question" , details:{} , error:"Some internal error try again"})
    }

  }
  
  // Extract all questions from data
  const allQuestions = Object.keys(data)
    .filter(key => !isNaN(parseInt(key)))
    .flatMap(key => 
      data[key].question.map(q => ({
        ...q,
        groupName: data[key].name
      }))
    );
  
  // Group questions by topic (extract topic name from title before the hyphen)
  const getTopicFromTitle = (title) => {
    const parts = title.split('-');
    return parts[0];
  };
  
  // Group all questions by topic
  const groupedByTopic = allQuestions.reduce((acc, question) => {
    const topic = getTopicFromTitle(question.title);
    if (!acc[topic]) {
      acc[topic] = [];
    }
    acc[topic].push(question);
    return acc;
  }, {});
  
  // Filter questions based on search term
  const filteredQuestions = allQuestions.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getTopicFromTitle(q.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="h-full w-5/6 overflow-hidden flex flex-col text-gray-200 relative">
      <div className='sticky transform top-0 bg-[#1c1b1b] rounded-3xl border-b-0 rounded-b-none border-2 px-3 pb-2 border-[#3b3b3b]'>
        <h1 className='text-base font-["Courier_New"] text-[#2bbdaa] py-2 px-2'>PRACTICE</h1>
        <div>
          <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef]  rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        </div>
      <div className="rounded-3xl border-2 h-full border-[#3b3b3b] bg-[#1c1b1b] border-t-0  rounded-t-none flex flex-col items-center overflow-y-auto overflow-x-hidden">
        
        
        

<div className="flex flex-col w-full h-full">
        {filteredQuestions.length > 0 ? (
          <div className="space-">
            {filteredQuestions.map(question => (
              <div 
                key={question.id} 
                onClick={()=>{handleClick(question.title)}}
                className="px-2 py-1 space-y-0  hover:bg-[#252525] cursor-pointer border-t-2 w-full border-[#3b3b3b]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-white font-['Courier_New']">
                      {question.title} 
                      
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ml-2 ${
                    question.difficulty === "EASY" ? "bg-green-900 text-[#3aff4e]" :
                    question.difficulty === "BALANCED" ? "bg-orange-700 text-orange-200" :
                    question.difficulty === "INTENSE" ? "bg-red-700 text-red-200" :
                    "bg-red-950 text-[#fda3a3]"
                  }`}>
                    {question.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2 font-['Courier_New']">{question.groupName}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 font-['Courier_New']">
            No questions match your search criteria
          </div>
        )}
      </div>


      </div>
      
      
    </div>
  );
};

export default QuestionDashboard;