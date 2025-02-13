import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ArrowLeft, Clock, Play, Save } from 'lucide-react';

const CodingPage = () => {
  const nav = useNavigate();
  const { uname, tname, qname } = useParams();
  const [lang, setLang] = useState("java");
  const [questionData, setQuestionData] = useState({});
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [output1, setOutput1] = useState("");
  const [output2, setOutput2] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [boiler, setBoiler] = useState({});
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

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
      setQuestionData(data.data);
      setTime({ minutes: data.minutes, seconds: data.seconds });
      setTimeLeft(data.minutes * 60 + data.seconds);
      setTestCases(data.testCase);
      setBoiler(data.boiler);
      setCode(data.data.code || getDefaultBoilerplate(lang));
    } catch (error) {
      alert(error.message);
      nav(`/${uname}/contest-handler/${tname}`);
    }
  }

  useEffect(() => {
    if (Object.keys(questionData).length === 0) {
      fetchData();
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDefaultBoilerplate = (language) => {
    const templates = {
      python: boiler[0]?.python,
      java: boiler[0]?.java,
      cpp: boiler[0]?.cpp,
      c: boiler[0]?.c,
    };
    return templates[language] || templates.python;
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => nav(`/${uname}/contest-handler/${tname}`)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Contest</span>
          </button>
          <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-0 gap-6">
          {/* Left Panel - Question and Test Cases */}
          <div className="space-y-6 w-3/4">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">{questionData.title || "Problem"}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{questionData.description}</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Test Cases</h3>
              <div className="space-y-4">
                {testCases.map((testCase, index) => (
                  <div key={index} className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="text-gray-300">Input: <span className="font-mono">{testCase.inputString}</span></p>
                    <p className="text-gray-300">Expected Output: <span className="font-mono">{testCase.outputString}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Editor and Controls */}
          <div className="space-y-6 ">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <select
                  className="bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2"
                  value={lang}
                  onChange={(e) => {
                    setLang(e.target.value);
                    setCode(getDefaultBoilerplate(e.target.value));
                  }}
                >
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                </select>
              </div>

              <div className="rounded-lg overflow-hidden border border-gray-700 ">
                <Editor
                  height="600px"
                  
                  defaultLanguage={lang}
                  value={code}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    fontSize: 20,
                    lineNumbers: "on",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                  <Play className="w-5 h-5" />
                  <span>Run Code</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                  <Save className="w-5 h-5" />
                  <span>Save & Exit</span>
                </button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Output</h3>
              <div className="space-y-4">
                {output1 && (
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-mono">Test Case 1: {output1}</p>
                  </div>
                )}
                {output2 && (
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-mono">Test Case 2: {output2}</p>
                  </div>
                )}
                {!output1 && !output2 && (
                  <p className="text-gray-400">No output yet. Run your code to see results.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;