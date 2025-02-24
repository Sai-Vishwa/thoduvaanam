import React, { useEffect, useState, useRef } from 'react';
import { Edit, Trash, Plus, Save, ChevronDown, ChevronUp, CalendarIcon, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  // Sample data as received from the backend
  const initialData = [
    {
      "id": 19,
      "name": "Aadukalam_Round_2",
      "description": null,
      "notes": null,
      "contestDate": "2025-02-15T08:30:00.000Z",
      "question": [/* questions array */]
    },
    {
      "id": 20,
      "name": "sample_test",
      "description": null,
      "notes": null,
      "contestDate": "2025-02-14T08:27:43.029Z",
      "question": [/* questions array */]
    }
  ];


  const [topics, setTopics] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
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

  // Delete confirmation
  const confirmDelete = (type, id) => {
    setShowDeleteConfirm({ type, id });
  };

  // Delete item
  const deleteItem = (type, id) => {
    if (type === 'topic') {
      setTopics(topics.filter(topic => topic.id !== id));
    } else if (type === 'question') {
      setTopics(topics.map(topic => ({
        ...topic,
        question: topic.question.filter(q => q.id !== id)
      })));
    }
    setHasChanges(true);
    setShowDeleteConfirm(null);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  // Add new item
  const addNewTopic = () => {
    const newTopic = {
      id: Date.now(),
      name: "New Topic",
      description: "",
      notes: "",
      contestDate: new Date().toISOString(),
      question: []
    };
    setTopics([...topics, newTopic]);
    setExpandedTopic(newTopic.id);
    setHasChanges(true);
  };

  const addNewQuestion = (topicId) => {
    const newQuestion = {
      id: Date.now(),
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
      id: Date.now(),
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
            body:JSON.stringify({data:topics}),
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
        alert(error.message)
    }
    alert("Changes saved!");
    setHasChanges(false);
    setEditMode({});
  };

  // Render editable field
  const EditableField = ({ type, id, field, value, isTextArea = false, isSelect = false, options = [], disabled = false }) => {
    const isEditing = editMode[`${type}-${id}-${field}`];
    const fieldKey = `${type}-${id}-${field}`;
    
    if (disabled) {
      return (
        <div className="relative mb-2">
          <div className="font-semibold text-gray-700 text-sm">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</div>
          <div className="flex items-center">
            <div className="flex-1 p-2 border border-gray-100 bg-gray-50 text-gray-500">{value || "-"}</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="relative mb-2">
        <div className="font-semibold text-gray-700 text-sm">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</div>
        {isEditing ? (
          isTextArea ? (
            <textarea
              className="w-full border p-2 rounded bg-white text-black"
              value={value || ""}
              rows={5}
              onChange={(e) => handleChange(type, id, field, e.target.value)}
              onBlur={(e) => handleBlur(type, id, field, e)}
              ref={(el) => setInputRef(type, id, field, el)}
            />
          ) : isSelect ? (
            <select
              className="w-full border p-2 rounded bg-white text-black"
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
              className="w-full border p-2 rounded bg-white text-black"
              type={field === "contestDate" ? "datetime-local" : "text"}
              value={field === "contestDate" ? value?.substring(0, 16) : value || ""}
              onChange={(e) => handleChange(type, id, field, e.target.value)}
              onBlur={(e) => handleBlur(type, id, field, e)}
              ref={(el) => setInputRef(type, id, field, el)}
            />
          )
        ) : (
          <div className="flex items-center">
            <div className="flex-1 p-2 border border-transparent">{value || "-"}</div>
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
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
            onClick={addNewTopic}
          >
            <Plus size={18} className="mr-1" /> Add New Topic
          </button>
          <button 
            className={`px-4 py-2 rounded flex items-center ${hasChanges ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}
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
                <h2 className="ml-2 text-xl font-semibold">{topic.name}</h2>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon size={16} className="mr-1" />
                  {new Date(topic.contestDate).toLocaleDateString()}
                </div>
                <button 
                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete('topic', topic.id);
                  }}
                >
                  <Trash size={18} />
                </button>
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
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Questions ({topic.question.length})</h3>
                    <button 
                      className="px-3 py-1 bg-blue-600 text-white rounded flex items-center text-sm"
                      onClick={() => addNewQuestion(topic.id)}
                    >
                      <Plus size={16} className="mr-1" /> Add Question
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {topic.question.map(question => (
                      <div key={question.id} className="border rounded overflow-hidden">
                        <div 
                          className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                          onClick={() => toggleQuestion(question.id)}
                        >
                          <div className="flex items-center">
                            {expandedQuestion === question.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            <span className="ml-2 font-medium">{question.title}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded ${
                              question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                              question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {question.difficulty}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              question.type === 'CONTEST' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {question.type}
                            </span>
                            <button 
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDelete('question', question.id);
                              }}
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {expandedQuestion === question.id && (
                          <div className="p-3 bg-white">
                            <div className="grid grid-cols-2 gap-4">
                              <EditableField type="question" id={question.id} field="title" value={question.title} />
                              <div className="grid grid-cols-2 gap-2">
                                <EditableField type="question" id={question.id} field="difficulty" value={question.difficulty} />
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
                              <h4 className="font-medium text-sm mb-3">Test Cases ({question.testCase ? question.testCase.length : 0})</h4>
                              
                              <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                                <div className="grid grid-cols-3 gap-4 mb-3">
                                  <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select 
                                      className="w-full border p-2 rounded bg-white text-black"
                                      value={newTestCase.type}
                                      onChange={(e) => handleTestCaseChange('type', e.target.value)}
                                    >
                                      <option value="OPEN1">OPEN1</option>
                                      <option value="OPEN2">OPEN2</option>
                                      <option value="HIDDEN">HIDDEN</option>
                                    </select>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
                                    <textarea 
                                      className="w-full border p-2 rounded bg-white text-black"
                                      value={newTestCase.input}
                                      rows={3}
                                      onChange={(e) => handleTestCaseChange('input', e.target.value)}
                                      placeholder="Enter input string"
                                    />
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Output</label>
                                  <textarea 
                                    className="w-full border p-2 rounded bg-white text-black"
                                    value={newTestCase.output}
                                    rows={3}
                                    onChange={(e) => handleTestCaseChange('output', e.target.value)}
                                    placeholder="Enter expected output string"
                                  />
                                </div>
                                <button 
                                  className="px-3 py-2 bg-blue-600 text-white rounded flex items-center text-sm"
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
                                        <span className="font-medium">Test Case #{index + 1}</span>
                                        <span className={`px-2 py-1 text-xs rounded ${
                                          tc.type === 'HIDDEN' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                          {tc.type}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <div className="text-xs text-gray-500">Input:</div>
                                          <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto">{tc.input}</pre>
                                        </div>
                                        <div>
                                          <div className="text-xs text-gray-500">Expected Output:</div>
                                          <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto">{tc.output}</pre>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4 text-gray-500 text-sm">
                                  No test cases added yet.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {topic.question.length === 0 && (
                      <div className="text-center py-6 text-gray-500">
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
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center text-red-600 mb-4">
              <AlertTriangle className="mr-2" size={24} />
              <h3 className="text-lg font-bold">Confirm Deletion</h3>
            </div>
            <p className="mb-6">
              Are you sure you want to delete this {showDeleteConfirm.type}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => deleteItem(showDeleteConfirm.type, showDeleteConfirm.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;