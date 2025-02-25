import React, { useEffect, useState, useRef } from 'react';
import { Edit, Plus, Save, ChevronDown, ChevronUp, CalendarIcon } from 'lucide-react';

const AdminDashboard = () => {
  // Sample data as received from the backend
  const initialData = [
    {
      "id": 19,
      "name": "Aadukalam_Round_2",
      "description": null,
      "notes": null,
      "contestDate": "2025-02-15T08:30:00.000Z",
      "contest": {
        "id": 1,
        "title": "Aadukalam_Round_2",
        "opensOn": "2025-02-15T07:30:00.000Z",
        "closesOn": "2025-02-15T10:30:00.000Z",
        "timeToSolveInMinutes": 120,
        "totalPoints": 150,
        "totalNoOfQuestions": 4,
        "topicId": 19
      },
      "question": [/* questions array */]
    },
    {
      "id": 20,
      "name": "sample_test",
      "description": null,
      "notes": null,
      "contestDate": "2025-02-14T08:27:43.029Z",
      "contest": {
        "id": 2,
        "title": "sample_test",
        "opensOn": "2025-02-25T07:31:02.933Z",
        "closesOn": "2025-02-25T20:01:02.947Z",
        "timeToSolveInMinutes": 90,
        "totalPoints": 120,
        "totalNoOfQuestions": 3,
        "topicId": 20
      },
      "question": [/* questions array */]
    }
  ];

  const [topics, setTopics] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [newTestCase, setNewTestCase] = useState({
    input: '',
    output: '',
    type: 'OPEN1',
    questionId: null
  });
  
  // Create refs for input fields
  const inputRefs = useRef({});

  useEffect(()=>{
    try{
        console.log("here")
        fetch("http://localhost:4000/basic/admin-load",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            console.log("here too   ")
            console.log(JSON.stringify(data))
            setTopics(data.data)
        })
    
    }
    catch(error){
        alert(error.message);
        nav("/")
    }
    
  },[]);
  
  // Toggle section expansion
  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
    setExpandedQuestion(null);
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  // Enable edit mode for a specific field
  const enableEdit = (type, id, field) => {
    setEditMode({
      ...editMode,
      [`${type}-${id}-${field}`]: true
    });
    setHasChanges(true);
    
    // Focus the input after state update
    setTimeout(() => {
      if (inputRefs.current[`${type}-${id}-${field}`]) {
        inputRefs.current[`${type}-${id}-${field}`].focus();
      }
    }, 0);
  };

  // Handle input changes with focus preservation
  const handleChange = (type, id, field, value) => {
    if (type === 'topic') {
      setTopics(topics.map(topic => 
        topic.id === id ? { ...topic, [field]: value } : topic
      ));
    } else if (type === 'question') {
      setTopics(topics.map(topic => ({
        ...topic,
        question: topic.question.map(q => 
          q.id === id ? { ...q, [field]: value } : q
        )
      })));
    } else if (type === 'contest') {
      setTopics(topics.map(topic => 
        topic.id === id ? { 
          ...topic, 
          contest: { 
            ...topic.contest, 
            [field]: value 
          } 
        } : topic
      ));
    }
    
    setHasChanges(true);
  };
  
  // Handle field blur - only exit edit mode when focus actually leaves
  const handleBlur = (type, id, field, e) => {
    // Use setTimeout to allow potential new focus to be set
    setTimeout(() => {
      // Only exit edit mode if the active element is not the same input
      if (document.activeElement !== inputRefs.current[`${type}-${id}-${field}`]) {
        setEditMode({
          ...editMode,
          [`${type}-${id}-${field}`]: false
        });
      }
    }, 0);
  };

  // Set reference to input element
  const setInputRef = (type, id, field, el) => {
    inputRefs.current[`${type}-${id}-${field}`] = el;
  };

  // Add new item
  const addNewTopic = () => {
    const newId = Date.now(); // Temporary ID for UI purposes
    const newTopic = {
      id: newId,
      name: "New Topic",
      description: "",
      notes: "",
      contestDate: new Date().toISOString(),
      contest: {
        id: newId,
        title: "New Contest",
        opensOn: new Date().toISOString(),
        closesOn: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours later
        timeToSolveInMinutes: 90,
        totalPoints: 100,
        totalNoOfQuestions: 3,
        topicId: newId
      },
      question: []
    };
    setTopics([...topics, newTopic]);
    setExpandedTopic(newTopic.id);
    setHasChanges(true);
  };

  const addNewQuestion = (topicId) => {
    const newId = Date.now(); // Temporary ID for UI purposes
    const newQuestion = {
      id: newId,
      title: "New Question",
      description: "",
      topic: topicId,
      noOfHiddenTestCases: 0,
      noOfExternalTestCases: 2, // Fixed as 2
      difficulty: "EASY",
      pointsPerTestCaseSolved: 1,
      type: "CONTEST",
      timeToSolveInMinutes: 60,
      testCase: []
    };
    
    setTopics(topics.map(topic => 
      topic.id === topicId ? 
        { ...topic, question: [...topic.question, newQuestion] } : 
        topic
    ));
    setHasChanges(true);
  };
  
  // Handle test case input changes
  const handleTestCaseChange = (field, value) => {
    setNewTestCase({
      ...newTestCase,
      [field]: value
    });
  };
  
  // Add new test case
  const addTestCase = (questionId) => {
    const testCase = {
      ...newTestCase,
      id: Date.now(), // Temporary ID for UI purposes
      questionId
    };
    
    setTopics(topics.map(topic => ({
      ...topic,
      question: topic.question.map(q => 
        q.id === questionId ? 
          { ...q, testCase: [...(q.testCase || []), testCase] } : 
          q
      )
    })));
    
    // Reset form
    setNewTestCase({
      input: '',
      output: '',
      type: 'OPEN1',
      questionId: null
    });
    
    setHasChanges(true);
  };

  // Save changes
  const saveChanges = () => {
    console.log("Saving changes:", JSON.stringify(topics));
    try{
        fetch("http://localhost:4000/basic/admin-update",{
            method:"POST",
            body:JSON.stringify({
              data: topics
            }),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            if(data.err){
              throw new Error(data.err)
            }
            else{
              alert("Changes made successfully ")
              setHasChanges(false);
              setEditMode({});
            }
        })
        .catch(error => {
          alert(error.message)
        })
    }
    catch(error){
        alert(error.message)
    }
    
  };

  // Render editable field
  const EditableField = ({ type, id, field, value, isTextArea = false, isSelect = false, options = [], disabled = false }) => {
    const isEditing = editMode[`${type}-${id}-${field}`];
    const fieldKey = `${type}-${id}-${field}`;
    
    if (disabled) {
      return (
        <div className="relative mb-2">
          <div className="font-bold text-gray-800 text-sm">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</div>
          <div className="flex items-center">
            <div className="flex-1 p-2 border border-gray-100 bg-gray-50 text-gray-800 font-semibold">{value || "-"}</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="relative mb-2">
        <div className="font-bold text-gray-800 text-sm">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</div>
        {isEditing ? (
          isTextArea ? (
            <textarea
              className="w-full border p-2 rounded bg-white text-black font-medium"
              value={value || ""}
              rows={5}
              onChange={(e) => handleChange(type, id, field, e.target.value)}
              onBlur={(e) => handleBlur(type, id, field, e)}
              ref={(el) => setInputRef(type, id, field, el)}
            />
          ) : isSelect ? (
            <select
              className="w-full border p-2 rounded bg-white text-black font-medium"
              value={value || ""}
              onChange={(e) => handleChange(type, id, field, e.target.value)}
              onBlur={(e) => handleBlur(type, id, field, e)}
              ref={(el) => setInputRef(type, id, field, el)}
            >
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              className="w-full border p-2 rounded bg-white text-black font-medium"
              type={field === "contestDate" || field === "opensOn" || field === "closesOn" ? "datetime-local" : "text"}
              value={field === "contestDate" || field === "opensOn" || field === "closesOn" ? value?.substring(0, 16) : value || ""}
              onChange={(e) => handleChange(type, id, field, e.target.value)}
              onBlur={(e) => handleBlur(type, id, field, e)}
              ref={(el) => setInputRef(type, id, field, el)}
            />
          )
        ) : (
          <div className="flex items-center">
            <div className="flex-1 p-2 border border-transparent font-medium">{value || "-"}</div>
            <button 
              className="p-1 text-blue-600 hover:bg-blue-100 rounded" 
              onClick={() => enableEdit(type, id, field)}
            >
              <Edit size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
        <div className="space-x-2">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center font-bold"
            onClick={addNewTopic}
          >
            <Plus size={18} className="mr-1" /> Add New Topic
          </button>
          <button 
            className={`px-4 py-2 rounded flex items-center font-bold ${hasChanges ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}
            onClick={saveChanges}
            disabled={!hasChanges}
          >
            <Save size={18} className="mr-1" /> Save All Changes
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {topics.map(topic => (
          <div key={topic.id} className="border rounded-lg overflow-hidden shadow-md bg-white">
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleTopic(topic.id)}
            >
              <div className="flex items-center">
                {expandedTopic === topic.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                <h2 className="ml-2 text-xl font-bold">{topic.name}</h2>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-gray-800 font-semibold">
                  <CalendarIcon size={16} className="mr-1" />
                  {new Date(topic.contestDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            {expandedTopic === topic.id && (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <EditableField type="topic" id={topic.id} field="name" value={topic.name} />
                  <EditableField type="topic" id={topic.id} field="contestDate" value={topic.contestDate} />
                  <div className="col-span-2">
                    <EditableField type="topic" id={topic.id} field="description" value={topic.description} isTextArea />
                  </div>
                  <div className="col-span-2">
                    <EditableField type="topic" id={topic.id} field="notes" value={topic.notes} isTextArea />
                  </div>
                </div>
                
                {/* Contest Details Section */}
                <div className="mt-6 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-bold mb-4 text-blue-800">Contest Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <EditableField type="contest" id={topic.id} field="title" value={topic.contest?.title || ""} />
                    <EditableField type="contest" id={topic.id} field="timeToSolveInMinutes" value={topic.contest?.timeToSolveInMinutes || "90"} />
                    <EditableField type="contest" id={topic.id} field="opensOn" value={topic.contest?.opensOn || new Date().toISOString()} />
                    <EditableField type="contest" id={topic.id} field="closesOn" value={topic.contest?.closesOn || new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()} />
                    <EditableField type="contest" id={topic.id} field="totalPoints" value={topic.contest?.totalPoints || "100"} />
                    <EditableField type="contest" id={topic.id} field="totalNoOfQuestions" value={topic.contest?.totalNoOfQuestions || "3"} />
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold">Questions ({topic.question?.length || 0})</h3>
                    <button 
                      className="px-3 py-1 bg-blue-600 text-white rounded flex items-center text-sm font-bold"
                      onClick={() => addNewQuestion(topic.id)}
                    >
                      <Plus size={16} className="mr-1" /> Add Question
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {topic.question && topic.question.map(question => (
                      <div key={question.id} className="border rounded overflow-hidden">
                        <div 
                          className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                          onClick={() => toggleQuestion(question.id)}
                        >
                          <div className="flex items-center">
                            {expandedQuestion === question.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            <span className="ml-2 font-bold">{question.title}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded font-bold ${
                              question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                              question.difficulty === 'BALANCED' ? 'bg-yellow-100 text-yellow-800' :
                              question.difficulty === 'INTENSE' ? 'bg-orange-100 text-orange-800' :
                              question.difficulty === 'HELL' ? 'bg-red-100 text-red-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {question.difficulty}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded font-bold ${
                              question.type === 'CONTEST' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {question.type}
                            </span>
                          </div>
                        </div>
                        
                        {expandedQuestion === question.id && (
                          <div className="p-3 bg-white">
                            <div className="grid grid-cols-2 gap-4">
                              <EditableField type="question" id={question.id} field="title" value={question.title} />
                              <div className="grid grid-cols-2 gap-2">
                                <EditableField 
                                  type="question" 
                                  id={question.id} 
                                  field="difficulty" 
                                  value={question.difficulty}
                                  isSelect={true}
                                  options={['EASY', 'BALANCED', 'INTENSE', 'HELL']} 
                                />
                                <EditableField 
                                  type="question" 
                                  id={question.id} 
                                  field="type" 
                                  value={question.type} 
                                  isSelect={true} 
                                  options={['CONTEST', 'PRACTICE']} 
                                />
                              </div>
                              <div className="col-span-2">
                                <EditableField type="question" id={question.id} field="description" value={question.description} isTextArea />
                              </div>
                              <EditableField type="question" id={question.id} field="pointsPerTestCaseSolved" value={question.pointsPerTestCaseSolved} />
                              <EditableField type="question" id={question.id} field="timeToSolveInMinutes" value={question.timeToSolveInMinutes} />
                              <EditableField type="question" id={question.id} field="noOfHiddenTestCases" value={question.noOfHiddenTestCases} />
                              <EditableField 
                                type="question" 
                                id={question.id} 
                                field="noOfExternalTestCases" 
                                value="2" 
                                disabled={true} 
                              />
                              <EditableField type="question" id={question.id} field="leetCodeLink" value={question.leetCodeLink} />
                              <EditableField type="question" id={question.id} field="leetCodeTitle" value={question.leetCodeTitle} />
                            </div>
                            
                            <div className="mt-6">
                              <h4 className="font-bold text-sm mb-3">Test Cases ({question.testCase ? question.testCase.length : 0})</h4>
                              
                              <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                  <div className="col-span-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                                    <select 
                                      className="w-full border p-2 rounded bg-white text-black font-medium"
                                      value={newTestCase.type}
                                      onChange={(e) => handleTestCaseChange('type', e.target.value)}
                                    >
                                      <option value="OPEN1">OPEN1</option>
                                      <option value="OPEN2">OPEN2</option>
                                      <option value="HIDDEN">HIDDEN</option>
                                    </select>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Input</label>
                                    <textarea 
                                      className="w-full border p-2 rounded bg-white text-black font-medium"
                                      value={newTestCase.input}
                                      rows={3}
                                      onChange={(e) => handleTestCaseChange('input', e.target.value)}
                                      placeholder="Enter input string"
                                    />
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label className="block text-sm font-bold text-gray-700 mb-1">Output</label>
                                  <textarea 
                                    className="w-full border p-2 rounded bg-white text-black font-medium"
                                    value={newTestCase.output}
                                    rows={3}
                                    onChange={(e) => handleTestCaseChange('output', e.target.value)}
                                    placeholder="Enter expected output string"
                                  />
                                </div>
                                <button 
                                  className="px-3 py-2 bg-blue-600 text-white rounded flex items-center text-sm font-bold"
                                  onClick={() => addTestCase(question.id)}
                                >
                                  <Plus size={16} className="mr-1" /> Add Test Case
                                </button>
                              </div>
                              
                              {question.testCase && question.testCase.length > 0 ? (
                                <div className="space-y-2 mt-4">
                                  {question.testCase.map((tc, index) => (
                                    <div key={tc.id || index} className="border p-3 rounded text-sm">
                                      <div className="flex justify-between mb-2">
                                        <span className="font-bold">Test Case #{index + 1}</span>
                                        <div className="flex items-center space-x-2">
                                          <span className={`px-2 py-1 text-xs rounded font-bold ${
                                            tc.type === 'HIDDEN' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                          }`}>
                                            {tc.type}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <div className="text-xs font-bold text-gray-700">Input:</div>
                                          <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto font-medium">{tc.input}</pre>
                                        </div>
                                        <div>
                                          <div className="text-xs font-bold text-gray-700">Expected Output:</div>
                                          <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto font-medium">{tc.output}</pre>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4 text-gray-700 text-sm font-medium">
                                  No test cases added yet.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {(!topic.question || topic.question.length === 0) && (
                      <div className="text-center py-6 text-gray-700 font-medium">
                        No questions added yet. Click "Add Question" to create one.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;