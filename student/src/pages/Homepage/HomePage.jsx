"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Cookies from "js-cookie"
import Header from "../../components/Common/Header"
import { ChevronDown } from "lucide-react"

const TopicCard = ({ topic, isSelected, onTopicClick }) => {
  const navigate = useNavigate();
  const {uname} = useParams();

  const handleContestClick = (e) => {
    e.stopPropagation(); 
    navigate(`/${uname}/contest/${topic.name}`); 
  };

  return (
    <div
      onClick={() => onTopicClick(topic)}
      className={`
        transform transition-all duration-300 ease-in-out
        border border-gray-700 rounded-xl p-6 mb-4 
        hover:bg-gray-800/50 hover:border-blue-500/50 
        cursor-pointer relative z-[50] overflow-hidden
        ${isSelected ? 'bg-gray-800/30 border-blue-500' : 'bg-gray-900/30'}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{topic.name}</h3>
          <p className="text-gray-400 text-sm">
            {topic.question.length} Questions Available
          </p>
        </div>
        <div className="flex space-x-2 items-center">
          <div>
            <button 
              onClick={handleContestClick}
              className="border border-white/10 px-5 py-3 rounded-2xl hover:bg-black/20 relative z-[1000] transition-colors duration-200"
            >
              Attend Contest
            </button>
          </div>
          <div>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                isSelected ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestionCard = ({ question }) => (
  <div className="transform transition-all duration-300 ease-in-out">
    <div className="bg-gray-800/50 rounded-lg p-6 mb-4 border border-gray-700 hover:border-blue-500/50">
      <h4 className="text-lg font-medium text-white mb-3">{question.title}</h4>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Difficulty</span>
          <span className={`
            text-sm font-medium
            ${question.difficulty === 'Easy' && 'text-green-400'}
            ${question.difficulty === 'Medium' && 'text-yellow-400'}
            ${question.difficulty === 'Hard' && 'text-red-400'}
          `}>
            {question.difficulty}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Type</span>
          <span className="text-white text-sm">{question.type}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Submissions</span>
          <span className="text-white text-sm">{question.submission.length}</span>
        </div>
      </div>
    </div>
  </div>
)

function HomePage() {
  const { uname } = useParams()
  const nav = useNavigate()
  const [allData, setAllData] = useState({ myData: {}, data: [] })
  const [selectedTopic, setSelectedTopic] = useState(null)

  const fetchData = async () => {
    const session = Cookies.get("session")
    try {
      const result = await fetch("http://localhost:4000/basic/home", {
        method: "POST",
        body: JSON.stringify({ uname: uname, session: session }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      const data = await result.json()
      setAllData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    const session = Cookies.get("session")
    if (!session) {
      alert("First login to access this route")
      nav("/login-signup")
    }

    if (allData.data.length === 0) {
      fetchData()
    }
  }, [allData.data.length, nav])

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic.id === selectedTopic?.id ? null : topic)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header data={allData.myData} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Available Topics</h1>
          <p className="text-gray-400 text-center">
            Select a topic to view its questions or attend a contest
          </p>
        </div>

        <div className="space-y-4">
          {allData.data.map((topic) => (
            <div key={topic.id}>
              <TopicCard 
                topic={topic}
                isSelected={selectedTopic?.id === topic.id}
                onTopicClick={handleTopicClick}
              />
              
              {selectedTopic?.id === topic.id && (
                <div className="ml-4 space-y-4 mt-4">
                  {topic.question.map((q) => (
                    <QuestionCard key={q.id} question={q} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default HomePage