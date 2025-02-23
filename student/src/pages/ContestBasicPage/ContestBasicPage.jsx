import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Cookies from 'js-cookie'
import { ArrowLeft, Clock, Trophy, Calculator, FileQuestion } from 'lucide-react'

function ContestBasicPage() {
  const [contestDetails, setContestDetails] = useState({})
  const [attemptButton, setAttemptButton] = useState("Start New Attempt")
  const [disabled, setDisabled] = useState(false)
  const nav = useNavigate()
  const { uname, tname } = useParams()
  const [reviewDiv, setReviewDiv] = useState(false)

  async function toContestHandler() {
    if (attemptButton === "CONTINUE LAST ATTEMPT") {
      nav(`/${uname}/contest-handler/${tname}`);
    } 
    else if (attemptButton === "START NEW ATTEMPT") {
      try {
        const startAttempt = await fetch("http://localhost:4000/submission/solve-contest", {
          method: "POST",
          body: JSON.stringify({ uname: uname, session: Cookies.get("session"), tname: tname }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        const data = await startAttempt.json()
        if (data.msg) {
          alert(JSON.stringify(data))
          nav(`/${uname}/contest-handler/${tname}`)
        } else {
          throw new Error(data.err)
        }
      } catch (error) {
        alert(error.message)
      }
    }
  }

  async function fetchData() {
    try {
      const details = await fetch("http://localhost:4000/basic/contest-basic", {
        method: "POST",
        body: JSON.stringify({ uname: uname, session: Cookies.get("session"), tname: tname }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const data = await details.json()
      if (data.err) {
        throw new Error(data.err)
      } else {
        setContestDetails(data.data)
        setAttemptButton(data.status)
        if (data.status === "COMPLETED" || data.status === "ENDED" || data.status === "NOT STARTED") {
          setDisabled(true)
        }
        if (data.status === "COMPLETED") {
          setReviewDiv(true)
        }
      }
    } catch (error) {
      alert(error.message)
      nav(`/${uname}`)
    }
  }

  useEffect(() => {
    if (Object.keys(contestDetails).length === 0) {
      fetchData()
    }
  }, [])

  const formatDate = (dateString) => {
    const wr = new Date(dateString)
    return new Date(wr.getTime()-5.5*60*60*1000).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }

  const getStatusColor = (status) => {
    const colors = {
      'COMPLETED': 'bg-green-500 text-white',
      'ENDED': 'bg-red-500 text-white',
      'NOT STARTED': 'bg-yellow-500 text-white',
      'START NEW ATTEMPT': 'bg-blue-500 text-white',
      'CONTINUE LAST ATTEMPT': 'bg-purple-500 text-white'
    }
    return colors[status] || 'bg-gray-500 text-white'
  }

  return (
    <div className="min-h-screen bg-white">
      {JSON.stringify(contestDetails)}
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => nav(`/${uname}`)}
            className="flex items-center space-x-2 text-gray-800 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Topics</span>
          </button>
        </div>

        {/* Contest Details Card */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-black">{contestDetails.title}</h1>
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(attemptButton)}`}>
              {attemptButton}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-gray-900 text-sm font-medium">Time Limit</p>
                <p className="font-bold text-black">{contestDetails.timeToSolveInMinutes} minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-gray-900 text-sm font-medium">Total Points</p>
                <p className="font-bold text-black">{contestDetails.totalPoints} points</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileQuestion className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-gray-900 text-sm font-medium">Questions</p>
                <p className="font-bold text-black">{contestDetails.totalNoOfQuestions} questions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calculator className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-gray-900 text-sm font-medium">Topic ID</p>
                <p className="font-bold text-black">#{contestDetails.topicId}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4 mb-8 border-t border-gray-200 pt-6">
            <div>
              <p className="text-gray-900 text-sm font-medium">Opens On</p>
              <p className="font-bold text-black">
                {contestDetails.opensOn && formatDate(contestDetails.opensOn)}
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-sm font-medium">Closes On</p>
              <p className="font-bold text-black">
                {contestDetails.closesOn && formatDate(contestDetails.closesOn)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={toContestHandler}
              disabled={disabled}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all
                ${disabled 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#000015] text-white hover:bg-gray-900'
                }
              `}
            >
              {attemptButton}
            </button>
            {reviewDiv && (
              <button
                onClick={() => nav(`/${uname}/review-contest/${tname}`)}
                className="px-6 py-2 rounded-lg font-medium border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Review Submission
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContestBasicPage