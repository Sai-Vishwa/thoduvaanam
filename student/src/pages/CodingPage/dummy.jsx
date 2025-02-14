import React, { useState, useEffect } from 'react';
import { Editor } from "@monaco-editor/react";
import { ArrowLeft, Clock, Play, CheckCircle, XCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const DummyPage = () => {
  const { uname, tname, qname } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('JAVA');
  const [code, setCode] = useState('');
  const [memory, setMemory] = useState({
    PYTHON: '',
    C: '',
    CPP: '',
    JAVA: ''
  });
  const [questionData, setQuestionData] = useState({
    data: null,
    minutes: 0,
    seconds: 0,
    testCase: [],
    boiler: []
  });

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch("http://localhost:4000/basic/coding-page", {
          method: "POST",
          body: JSON.stringify({
            session: Cookies.get("session"),
            uname: uname,
            qname: qname,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await result.json();
        if (data.err) {
          throw new Error(data.err);
        }
        
        setQuestionData(data);
        setCode(data.data.code || '');
        setLanguage(data.data.language);
        setLoading(false);
      } catch (error) {
        alert(error.message);
        navigate(`/${uname}/contest-handler/${tname}`);
      }
    }

    fetchData();
  }, [uname, qname, tname, navigate]);

  const Timer = ({ minutes, seconds }) => {
    const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className="flex items-center space-x-2 text-xl font-mono">
        <Clock className="w-6 h-6" />
        <span>{formatTime(timeLeft)}</span>
      </div>
    );
  };

  const handleEditorChange = (value) => {
    setCode(value || '');
    setMemory(prev => ({
      ...prev,
      [language]: value || ''
    }));
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (questionData.boiler && questionData.boiler[0]) {
      const boilerplateCode = questionData.boiler[0][newLang.toLowerCase()];
      setCode(boilerplateCode?.replace(/^"|"$/g, '') || '');
    }
  };

  async function handleRunCode() {
    try {
      const response = await fetch("http://localhost:4000/submission/run-test", {
        method: "POST",
        body: JSON.stringify({
          session: Cookies.get("session"),
          uname: uname,
          qname: qname,
          code: code,
          language: language
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.err) {
        throw new Error(data.err);
      }
      setQuestionData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          output1: data.output1,
          output2: data.output2
        }
      }));
    } catch (error) {
      alert("Error running code: " + error.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const { data, testCase, minutes, seconds } = questionData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(`/${uname}/contest-handler/${tname}`)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Contest</span>
          </button>
          <Timer minutes={minutes} seconds={seconds} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem Description & Test Cases */}
          <div className="lg:col-span-1 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Test Cases</h2>
              <div className="space-y-4">
                {testCase.map((test, index) => (
                  <div key={index} className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">{test.type}</p>
                    <div className="space-y-2">
                      <div>
                        <p className="font-mono text-sm text-gray-400">Input:</p>
                        <p className="font-mono text-sm">{test.inputString}</p>
                      </div>
                      <div>
                        <p className="font-mono text-sm text-gray-400">Expected Output:</p>
                        <p className="font-mono text-sm">{test.outputString}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <select
                  className="bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2"
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="PYTHON">Python</option>
                  <option value="JAVA">Java</option>
                  <option value="CPP">C++</option>
                  <option value="C">C</option>
                </select>
                <button
                  onClick={handleRunCode}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Run Code</span>
                </button>
              </div>
              
              <Editor
                height="400px"
                language={language.toLowerCase()}
                value={code}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  fontSize: 16,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Output Section */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Output</h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Test Case 1</h4>
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {data?.output1 || 'Not run yet'}
                  </pre>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Test Case 2</h4>
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {data?.output2 || 'Not run yet'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyPage;