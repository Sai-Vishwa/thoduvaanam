import { useEffect, useState } from "react";
import { ArrowLeft, Code } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie"

const ReviewContestPage = () => {
  const [reviewData, setReviewData] = useState({});
  const nav = useNavigate()
  const {uname , tname}= useParams()

  async function fetchData() {
    try {
      const rev = await fetch("http://localhost:4000/basic/contest-review", {
        method: "POST",
        body: JSON.stringify({
          session: Cookies.get("session"),
          uname: uname,
          tname: tname
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await rev.json();
      if (data.err) {
        throw new Error(data.err);
      } else {
        setReviewData(data.data);
      }
    } catch (error) {
      alert(error.message);
      nav(`/${uname}`);
    }
  }

  useEffect(() => {
    if (Object.keys(reviewData).length === 0) {
      fetchData();
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const getQuestionById = (questionId) => {
    return reviewData.question?.find(q => q.id === questionId) || {};
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={()=>{nav(`/${uname}`)}}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Submissions */}
        <div className="space-y-8">
          {reviewData.submission?.map((submission, index) => {
            const question = getQuestionById(submission.questionId);
            return (
              <div 
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  {/* Question Info */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
                    <p className="text-gray-300">{question.description}</p>
                  </div>

                  {/* Test Cases */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Test Cases</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {question.testCase?.map((test, testIndex) => (
                        <div 
                          key={testIndex}
                          className="bg-gray-900/50 rounded-lg p-4"
                        >
                          <div className="mb-2 text-blue-400 font-medium">
                            Test Case {test.type.slice(-1)}
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-gray-400">Input: </span>
                              <code className="text-green-300 bg-gray-800 px-2 py-1 rounded">
                                {test.inputString}
                              </code>
                            </div>
                            <div>
                              <span className="text-gray-400">Expected Output: </span>
                              <code className="text-purple-300 bg-gray-800 px-2 py-1 rounded">
                                {test.outputString}
                              </code>
                            </div>
                            
                            {(
                              <div>
                                <span className="text-gray-400">Your Output: </span>
                                <code className="text-orange-300 bg-gray-800 px-2 py-1 rounded">
                                  {submission[`output${testIndex + 1}`]?(<>{submission[`output${testIndex + 1}`]}</>):(<>-</>)}
                                </code>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submission Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Status: 
                        <span className={`ml-2 ${submission.status === "COMPLETED" ? "text-green-400" : "text-yellow-400"}`}>
                          {submission.status}
                        </span>
                      </span>
                      <span className="text-gray-400">Points: 
                        <span className="ml-2 text-white">{submission.pointsSecured}</span>
                      </span>
                      <span className="text-gray-400">Cases Passed: 
                        <span className="ml-2 text-white">{submission.noOfCasesPassed}</span>
                      </span>
                    </div>

                    {/* Code Section */}
                    {submission.code && (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">Your Code</h3>
                          {submission.language && (
                            <span className="text-blue-400 text-sm">
                              {submission.language}
                            </span>
                          )}
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                          <pre className="text-gray-300">{submission.code}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewContestPage;