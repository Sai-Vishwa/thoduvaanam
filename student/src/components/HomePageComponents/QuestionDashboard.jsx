import React, { useState } from 'react';

const QuestionDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data from backend
  const data = {
    "0": {
      "id": 1,
      "name": "Aadukalam_Round_2",
      "question": [
        { "id": 6, "title": "Game-2", "difficulty": "EASY", "type": "PRACTICE" },
        { "id": 8, "title": "Direction-2", "difficulty": "EASY", "type": "PRACTICE" },
        { "id": 10, "title": "Balance-1", "difficulty": "EASY", "type": "PRACTICE" }
      ]
    },
    "1": {
      "id": 2,
      "name": "sample_test",
      "question": [
        { "id": 5, "title": "Game-1", "difficulty": "EASY", "type": "PRACTICE" },
        { "id": 7, "title": "Direction-1", "difficulty": "EASY", "type": "PRACTICE" },
        { "id": 9, "title": "Balance", "difficulty": "EASY", "type": "PRACTICE" }
      ]
    },
    "totalQuestions": 6,
    "easyQuestions": 6,
    "balancedQuestions": 0,
    "intenseQuestions": 0,
    "hellQuestions": 0
  };
  
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
    <div className="h-full  w-5/6 overflow-hidden flex flex-col text-gray-200">
      <div className="rounded-3xl border-2 border-[#3b3b3b] bg-[#1c1b1b] border-b-0 rounded-b-none flex flex-col items-center">
        <h1 className='text-xl font-["Courier_New"] text-[#2bbdaa] pt-2'>PRACTICE</h1>
        <input
          type="text"
          placeholder="Search questions..."
          className="w-5/6 px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef]  rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 rounded-3xl border-2 border-[#3b3b3b] bg-[#1c1b1b] border-t-0 rounded-t-none">
        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.map(question => (
              <div 
                key={question.id} 
                className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {question.title} - {getTopicFromTitle(question.title)} - 
                      <span className={`ml-1 ${
                        question.difficulty === "EASY" ? "text-green-400" :
                        question.difficulty === "BALANCED" ? "text-yellow-400" :
                        question.difficulty === "INTENSE" ? "text-orange-400" :
                        "text-red-400"
                      }`}>
                        {question.difficulty}
                      </span>
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ml-2 ${
                    question.difficulty === "EASY" ? "bg-green-900 text-green-300" :
                    question.difficulty === "BALANCED" ? "bg-yellow-900 text-yellow-300" :
                    question.difficulty === "INTENSE" ? "bg-orange-900 text-orange-300" :
                    "bg-red-900 text-red-300"
                  }`}>
                    {question.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Group: {question.groupName}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No questions match your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDashboard;