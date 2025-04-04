import React, { useState, useEffect } from 'react';

const Admin = () => {
  
  // State management
  const [activeTab, setActiveTab] = useState('topic');
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [testcases, setTestcases] = useState([]);
  const [contests, setContests] = useState([]);
  
  // For question handling - either topic or contest
  const [questionMode, setQuestionMode] = useState('topic'); // 'topic' or 'contest'
  
  // Topic form state
  const [topicForm, setTopicForm] = useState({
    title: '',
    description: ''
  });
  
  // Question form state
  const [questionForm, setQuestionForm] = useState({
    parentId: '', // this will be either topicId or contestId based on mode
    title: '',
    description: '',
    miniDescription: '',
    noOfHiddenTestCases: 18,
    noOfExternalTestCases: 2,
    difficulty: 'EASY',
    pointsPerTestCaseSolved: 5,
    timeToSolveInMinutes: 90,
    type: 'PRACTICE',
    leetCodeLink: '',
    leetCodeTitle: '',
    cCode: '',
    cppCode:'',
    pythonCode:'',
    javaImport:'',
    javaCode:''
  });
  
  // Testcase form state
  const [testcaseForm, setTestcaseForm] = useState({
    questionId: '',
    inputString: '',
    outputString: '',
    testCaseType: 'OPEN1'
  });
  
  // Contest form state
  const [contestForm, setContestForm] = useState({
    title: '',
    description: '',
    notes: '',
    miniDescription: '',
    timeToSolveInMinutes: 90,
    totalPoints: 120,
    totalNoOfQuestions: 3,
    opensOn: new Date().toISOString().slice(0, 16),
    closesOn: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString().slice(0, 16)
  });
  
  // Load data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const details = await fetch("http://localhost:4000/admin/load", {
          method: "POST",
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data = await details.json();
        if (data.err) {
          throw new Error(data.err);
        } else {
          console.log(JSON.stringify(data));
          if (data.msg === "Successful") {
            processBackendData(data);
          }
        }
      } 
      catch (error) {
        alert(JSON.stringify(error.message));
      }
    }
    fetchData();
  }, []);

  // Process backend data and organize it for our component
  const processBackendData = (data) => {
    // Extract topics
    const extractedTopics = data.topic.map(topic => ({
      id: topic.id.toString(),
      title: topic.name,
      description: topic.description || ''
    }));
    
    // Extract questions
    const extractedQuestions = [];
    data.topic.forEach(topic => {
      if (topic.question && topic.question.length > 0) {
        topic.question.forEach(q => {
          extractedQuestions.push({
            id: q.id.toString(),
            title: q.title,
            description: q.description,
            miniDescription: q.miniDescription || '',
            topicId: q.topic ? q.topic.toString() : null,
            contestId: q.contestId ? q.contestId.toString() : null,
            noOfHiddenTestCases: q.noOfHiddenTestCases,
            noOfExternalTestCases: q.noOfExternalTestCases,
            difficulty: q.difficulty,
            pointsPerTestCaseSolved: q.pointsPerTestCaseSolved,
            timeToSolveInMinutes: q.timeToSolveInMinutes,
            type: q.type || 'PRACTICE',
            leetCodeLink: q.leetCodeLink,
            leetCodeTitle: q.leetCodeTitle,
            testCases: q.testCase || []
          });
        });
      }
    });
    
    // Extract contests
    const extractedContests = data.contest.map(contest => {
      return {
        id: contest.id.toString(),
        title: contest.title,
        miniDescription: contest.miniDescription || '',
        description: contest.description || '',
        notes: contest.notes || '',
        opensOn: contest.opensOn,
        closesOn: contest.closesOn,
        timeToSolveInMinutes: contest.timeToSolveInMinutes,
        totalPoints: contest.totalPoints,
        totalNoOfQuestions: contest.totalNoOfQuestions,
        questions: contest.question ? contest.question.map(q => q.id.toString()) : []
      };
    });
    
    // Extract testcases
    const extractedTestcases = [];
    extractedQuestions.forEach(q => {
      if (q.testCases && q.testCases.length > 0) {
        q.testCases.forEach(tc => {
          extractedTestcases.push({
            id: tc.id.toString(),
            questionId: q.id,
            inputString: tc.inputString || '',
            outputString: tc.outputString || '',
            testCaseType: tc.testCaseType || 'OPEN1'
          });
        });
      }
    });
    
    // Update state
    setTopics(extractedTopics);
    setQuestions(extractedQuestions);
    setContests(extractedContests);
    setTestcases(extractedTestcases);
  };
  
  // Form handlers
  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/admin/addTopic", {
        method: "POST",
        body: JSON.stringify({
          description: topicForm.description,
          title: topicForm.title
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.err) {
        throw new Error(data.err);
      } else {
        alert("Topic added successfully");
        const newTopic = {
          id: data.id || Date.now().toString(),
          title: topicForm.title,
          description: topicForm.description
        };
        setTopics([...topics, newTopic]);
        setTopicForm({ title: '', description: '' });
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };
  
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: questionForm.title,
        description: questionForm.description,
        miniDescription: questionForm.miniDescription,
        [questionMode === 'topic' ? 'topic' : 'contestId']: questionForm.parentId,
        noOfHiddenTestCases: questionForm.noOfHiddenTestCases,
        noOfExternalTestCases: questionForm.noOfExternalTestCases,
        difficulty: questionForm.difficulty,
        pointsPerTestCaseSolved: questionForm.pointsPerTestCaseSolved,
        timeToSolveInMinutes: questionForm.timeToSolveInMinutes,
        type: questionForm.type,
        leetCodeLink: questionForm.leetCodeLink,
        leetCodeTitle: questionForm.leetCodeTitle,
        CBoilerCode:questionForm.cCode,
        CppBoilerCode:questionForm.cppCode,
        PythonBoilerCode:questionForm.pythonCode,
        JavaImports:questionForm.javaImport,
        JavaBoilerCode:questionForm.javaCode
      };
      
      const response = await fetch("http://localhost:4000/admin/addQuestion", {
        method: "POST",
        body: JSON.stringify({data:payload}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.err) {
        throw new Error(data.err);
      } else {
        alert("Question added successfully");
        
        const newQuestion = {
          id: data.id || Date.now().toString(),
          [questionMode === 'topic' ? 'topicId' : 'contestId']: questionForm.parentId,
          ...questionForm
        };
        
        // If this is a contest question, also update the contest
        if (questionMode === 'contest') {
          const updatedContests = contests.map(contest => {
            if (contest.id === questionForm.parentId) {
              return {
                ...contest,
                questions: [...contest.questions, newQuestion.id]
              };
            }
            return contest;
          });
          setContests(updatedContests);
        }
        
        setQuestions([...questions, newQuestion]);
        setQuestionForm({
          parentId: '',
          title: '',
          description: '',
          miniDescription: '',
          noOfHiddenTestCases: 18,
          noOfExternalTestCases: 2,
          difficulty: 'EASY',
          pointsPerTestCaseSolved: 5,
          timeToSolveInMinutes: 90,
          type: 'PRACTICE',
          leetCodeLink: '',
          leetCodeTitle: ''
        });
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };
  
  const handleTestcaseSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        questionId: testcaseForm.questionId,
        inputString: testcaseForm.inputString,
        outputString: testcaseForm.outputString,
        testCaseType: testcaseForm.testCaseType
      };
      
      const response = await fetch("http://localhost:4000/admin/addTestCase", {
        method: "POST",
        body: JSON.stringify({data:payload}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.err) {
        throw new Error(data.err);
      } else {
        alert("Test case added successfully");
        
        const newTestcase = {
          id: data.id || Date.now().toString(),
          ...testcaseForm
        };
        
        setTestcases([...testcases, newTestcase]);
        setTestcaseForm({
          questionId: '',
          inputString: '',
          outputString: '',
          testCaseType: 'OPEN1'
        });
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };
  
  const handleContestSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: contestForm.title,
        miniDescription: contestForm.miniDescription,
        timeToSolveInMinutes: contestForm.timeToSolveInMinutes,
        totalPoints: contestForm.totalPoints,
        totalNoOfQuestions: contestForm.totalNoOfQuestions,
        opensOn: contestForm.opensOn,
        closesOn: contestForm.closesOn
      };
      
      const response = await fetch("http://localhost:4000/admin/addContest", {
        method: "POST",
        body: JSON.stringify({data:payload}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.err) {
        throw new Error(data.err);
      } else {
        alert("Contest added successfully");
        
        const newContest = {
          id: data.id || Date.now().toString(),
          questions: [],
          ...contestForm
        };
        
        setContests([...contests, newContest]);
        setContestForm({
          title: '',
          description: '',
          notes: '',
          miniDescription: '',
          timeToSolveInMinutes: 90,
          totalPoints: 120,
          totalNoOfQuestions: 3,
          opensOn: new Date().toISOString().slice(0, 16),
          closesOn: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString().slice(0, 16)
        });
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };
  
  // Form change handlers
  const handleTopicFormChange = (e) => {
    setTopicForm({
      ...topicForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleQuestionFormChange = (e) => {
    setQuestionForm({
      ...questionForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleTestcaseFormChange = (e) => {
    setTestcaseForm({
      ...testcaseForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleContestFormChange = (e) => {
    setContestForm({
      ...contestForm,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-700">
          <button 
            className={`px-4 py-2 ${activeTab === 'topic' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} rounded-t-lg`}
            onClick={() => setActiveTab('topic')}
          >
            Topics
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'question' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} ml-1 rounded-t-lg`}
            onClick={() => setActiveTab('question')}
          >
            Questions
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'testcase' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} ml-1 rounded-t-lg`}
            onClick={() => setActiveTab('testcase')}
          >
            Test Cases
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'contest' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} ml-1 rounded-t-lg`}
            onClick={() => setActiveTab('contest')}
          >
            Contests
          </button>
        </div>
        
        {/* Topic Form */}
        {activeTab === 'topic' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-300">Add Topic</h2>
            <form onSubmit={handleTopicSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Title</label>
                <input
                  type="text"
                  name="title"
                  value={topicForm.title}
                  onChange={handleTopicFormChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Description</label>
                <textarea
                  name="description"
                  value={topicForm.description}
                  onChange={handleTopicFormChange}
                  className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                  rows="3"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Topic
              </button>
            </form>
            
            {/* Topic List */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2 text-blue-300">Existing Topics</h3>
              {topics.length === 0 ? (
                <p className="text-gray-400">No topics added yet</p>
              ) : (
                <ul className="divide-y divide-gray-700">
                  {topics.map(topic => (
                    <li key={topic.id} className="py-3">
                      <h4 className="font-medium text-white">{topic.title}</h4>
                      <p className="text-gray-400 text-sm">{topic.description || 'No description'}</p>
                      <p className="text-gray-500 text-xs mt-1">ID: {topic.id}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        
        {/* Question Form */}
        {activeTab === 'question' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-300">Add Question</h2>
            
            {/* Toggle between topic and contest */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Add Question To:</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${questionMode === 'topic' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => setQuestionMode('topic')}
                >
                  Topic
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${questionMode === 'contest' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => setQuestionMode('contest')}
                >
                  Contest
                </button>
              </div>
            </div>
            
            {((questionMode === 'topic' && topics.length === 0) || 
              (questionMode === 'contest' && contests.length === 0)) ? (
              <p className="text-yellow-500">Please add {questionMode === 'topic' ? 'topics' : 'contests'} first</p>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    {questionMode === 'topic' ? 'Topic' : 'Contest'}
                  </label>
                  <select
                    name="parentId"
                    value={questionForm.parentId}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    required
                  >
                    <option value="">Select a {questionMode === 'topic' ? 'topic' : 'contest'}</option>
                    {questionMode === 'topic' 
                      ? topics.map(topic => (
                          <option key={topic.id} value={topic.id}>{topic.title}</option>
                        ))
                      : contests.map(contest => (
                          <option key={contest.id} value={contest.id}>{contest.title}</option>
                        ))
                    }
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={questionForm.title}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Description</label>
                  <textarea
                    name="description"
                    value={questionForm.description}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    rows="5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400">C Code</label>
                  <textarea
                    name="cCode"
                    value={questionForm.cCode}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    rows="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Cpp Code</label>
                  <textarea
                    name="cppCode"
                    value={questionForm.cppCode}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    rows="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Python Code</label>
                  <textarea
                    name="pythonCode"
                    value={questionForm.pythonCode}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    rows="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Java imports</label>
                  <textarea
                    name="javaImport"
                    value={questionForm.javaImport}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    rows="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Java code</label>
                  <textarea
                    name="javaCode"
                    value={questionForm.javaCode}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    rows="5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Mini Description</label>
                  <input
                    type="text"
                    name="miniDescription"
                    value={questionForm.miniDescription}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Hidden Test Cases</label>
                    <input
                      type="number"
                      name="noOfHiddenTestCases"
                      value={questionForm.noOfHiddenTestCases}
                      onChange={handleQuestionFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">External Test Cases</label>
                    <input
                      type="number"
                      name="noOfExternalTestCases"
                      value={questionForm.noOfExternalTestCases}
                      onChange={handleQuestionFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Difficulty</label>
                  <select
                    name="difficulty"
                    value={questionForm.difficulty}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                  >
                    <option value="EASY">EASY</option>
                    <option value="BALANCED">BALANCED</option>
                    <option value="INTENSE">INTENSE</option>
                    <option value="HELL">HELL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Question Type</label>
                  <select
                    name="type"
                    value={questionForm.type}
                    onChange={handleQuestionFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                  >
                    <option value="PRACTICE">PRACTICE</option>
                    <option value="CONTEST">CONTEST</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Points Per Test Case</label>
                    <input
                      type="number"
                      name="pointsPerTestCaseSolved"
                      value={questionForm.pointsPerTestCaseSolved}
                      onChange={handleQuestionFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Time to Solve (minutes)</label>
                    <input
                      type="number"
                      name="timeToSolveInMinutes"
                      value={questionForm.timeToSolveInMinutes}
                      onChange={handleQuestionFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">LeetCode Link (Optional)</label>
                    <input
                      type="text"
                      name="leetCodeLink"
                      value={questionForm.leetCodeLink || ''}
                      onChange={handleQuestionFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">LeetCode Title (Optional)</label>
                    <input
                      type="text"
                      name="leetCodeTitle"
                      value={questionForm.leetCodeTitle || ''}
                      onChange={handleQuestionFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Question
                </button>
              </form>
            )}
            
            {/* Question List */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2 text-blue-300">Existing Questions</h3>
              {questions.length === 0 ? (
                <p className="text-gray-400">No questions added yet</p>
              ) : (
                <ul className="divide-y divide-gray-700">
                  {questions.map(question => {
                    const topic = topics.find(t => t.id === question.topicId);
                    const contest = contests.find(c => c.id === question.contestId);
                    return (
                      <li key={question.id} className="py-3">
                        <h4 className="font-medium text-white">{question.title}</h4>
                        <p className="text-gray-400 text-sm mb-1">
                          {question.topicId ? `Topic: ${topic?.title || 'Unknown'}` : 
                           question.contestId ? `Contest: ${contest?.title || 'Unknown'}` : 'No Topic/Contest'}
                        </p>
                        <p className="text-blue-400 text-sm mb-1">Difficulty: {question.difficulty}</p>
                        <p className="text-gray-400 text-sm">{question.miniDescription || 'No mini description'}</p>
                        <p className="text-gray-500 text-xs mt-1">ID: {question.id}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
        
        {/* Test Case Form */}
        {activeTab === 'testcase' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-300">Add Test Case</h2>
            {questions.length === 0 ? (
              <p className="text-yellow-500">Please add questions first</p>
            ) : (
              <form onSubmit={handleTestcaseSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Question</label>
                  <select
                    name="questionId"
                    value={testcaseForm.questionId}
                    onChange={handleTestcaseFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                    required
                  >
                    <option value="">Select a question</option>
                    {questions.map(question => (
                      <option key={question.id} value={question.id}>{question.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Input String</label>
                  <textarea
                    name="inputString"
                    value={testcaseForm.inputString}
                    onChange={handleTestcaseFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white font-mono"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Output String</label>
                  <textarea
                    name="outputString"
                    value={testcaseForm.outputString}
                    onChange={handleTestcaseFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white font-mono"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Test Case Type</label>
                  <select
                    name="testCaseType"
                    value={testcaseForm.testCaseType}
                    onChange={handleTestcaseFormChange}
                    className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                  >
                    <option value="OPEN1">OPEN1</option>
                    <option value="OPEN2">OPEN2</option>
                    <option value="HIDDEN">HIDDEN</option>
                  </select>
                </div>
                <button
                  type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Test Case
              </button>
            </form>
          )}
          
          {/* Test Case List */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Existing Test Cases</h3>
            {testcases.length === 0 ? (
              <p className="text-gray-500">No test cases added yet</p>
            ) : (
              <ul className="divide-y divide-gray-700">
                {testcases.map(testcase => {
                  const question = questions.find(q => q.id === testcase.questionId);
                  return (
                    <li key={testcase.id} className="py-2">
                      <h4 className="font-medium">Test Case for: {question?.title || 'Unknown'}</h4>
                      <p className="text-gray-300 text-sm">Type: {testcase.testCaseType}</p>
                      <div className="mt-1 p-2 rounded">
                        <p className="text-sm font-medium">Input:</p>
                        <pre className="text-xs overflow-x-auto">{testcase.inputString}</pre>
                        <p className="text-sm font-medium mt-2">Output:</p>
                        <pre className="text-xs overflow-x-auto">{testcase.outputString}</pre>
                      </div>
                      <p className="text-gray-300 text-xs mt-1">ID: {testcase.id}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
      
      {/* Contest Form */}
      {activeTab === 'contest' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Add Contest</h2>
          <form onSubmit={handleContestSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Title</label>
              <input
                type="text"
                name="title"
                value={contestForm.title}
                onChange={handleContestFormChange}
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Mini Description</label>
              <textarea
                name="miniDescription"
                value={contestForm.miniDescription}
                onChange={handleContestFormChange}
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                rows="3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300">Contest opens on</label>
              <input
                type="datetime-local"
                name="opensOn"
                value={contestForm.opensOn}
                onChange={handleContestFormChange}
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Contest closes on</label>
              <input
                type="datetime-local"
                name="closesOn"
                value={contestForm.closesOn}
                onChange={handleContestFormChange}
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                required
              />
            </div>
            <div>
                    <label className="block text-sm font-medium text-gray-400">Time to solve in minutes</label>
                    <input
                      type="number"
                      name="timeToSolveInMinutes"
                      value={contestForm.timeToSolveInMinutes}
                      onChange={handleContestFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Total Points</label>
                    <input
                      type="number"
                      name="totalPoints"
                      value={contestForm.totalPoints}
                      onChange={handleContestFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Total no of questions</label>
                    <input
                      type="number"
                      name="totalNoOfQuestions"
                      value={contestForm.totalNoOfQuestions}
                      onChange={handleContestFormChange}
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white"
                      min="0"
                    />
                  </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Contest
            </button>
          </form>
          
          {/* Contest List */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Existing Contests</h3>
            {contests.length === 0 ? (
              <p className="text-gray-500">No contests added yet</p>
            ) : (
              <ul className="divide-y divide-gray-700">
                {contests.map(contest => {
                  const contestQuestions = questions.filter(q => 
                    contest.questions.includes(q.id) || q.contestId === contest.id
                  );
                  return (
                    <li key={contest.id} className="py-2">
                      <h4 className="font-medium">{contest.title}</h4>
                      {contest.description && <p className="text-gray-600 text-sm">{contest.description}</p>}
                      <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                        <p>Date: {new Date(contest.contestDate).toLocaleString()}</p>
                        <p>Questions: {contestQuestions.length}</p>
                      </div>
                      {contest.notes && <p className="text-gray-500 text-sm mt-1">Notes: {contest.notes}</p>}
                      <p className="text-gray-500 text-xs mt-1">ID: {contest.id}</p>
                      
                      {/* List of questions in this contest */}
                      {contestQuestions.length > 0 && (
                        <div className="mt-2 pl-4">
                          <p className="text-sm font-medium">Questions:</p>
                          <ul className="pl-2">
                            {contestQuestions.map(q => (
                              <li key={q.id} className="text-sm py-1">
                                • {q.title} ({q.difficulty})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Admin;