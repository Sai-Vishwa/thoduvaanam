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
    console.log("im here")
    if (attemptButton === "CONTINUE LAST ATTEMPT") {
      console.log("ithu enna da")
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
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  }

  const getStatusColor = (status) => {
    const colors = {
      'COMPLETED': 'bg-green-500',
      'ENDED': 'bg-red-500',
      'NOT STARTED': 'bg-yellow-500',
      'START NEW ATTEMPT': 'bg-blue-500',
      'CONTINUE LAST ATTEMPT': 'bg-purple-500'
    }
    return colors[status] || 'bg-gray-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => nav(`/${uname}`)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Topics</span>
          </button>
        </div>

        {/* Contest Details Card */}
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold mb-6">{contestDetails.title}</h1>

          {/* Status Badge */}
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${getStatusColor(attemptButton)}`}>
            {attemptButton}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Time Limit</p>
                <p className="font-medium">{contestDetails.timeToSolveInMinutes} minutes</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Total Points</p>
                <p className="font-medium">{contestDetails.totalPoints} points</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FileQuestion className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Questions</p>
                <p className="font-medium">{contestDetails.totalNoOfQuestions} questions</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calculator className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Topic ID</p>
                <p className="font-medium">#{contestDetails.topicId}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4 mb-8">
            <div>
              <p className="text-gray-400 text-sm">Opens On</p>
              <p className="font-medium">{contestDetails.opensOn && formatDate(contestDetails.opensOn)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Closes On</p>
              <p className="font-medium">{contestDetails.closesOn && formatDate(contestDetails.closesOn)}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={toContestHandler}
              disabled={disabled}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all
                ${disabled 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              {attemptButton}
            </button>

            {reviewDiv && (
              <button
                onClick={() => nav(`/${uname}/review-contest/${tname}`)}
                className="px-6 py-3 rounded-lg font-medium bg-green-600 hover:bg-green-700 transition-colors"
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