import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Editor from '@monaco-editor/react';

const CodingPage = () => {
  const nav = useNavigate();
  const [language, setLanguage] = useState('C++');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState({
    visible: [
      { passed: false, input: 'Input for test case 1', expectedOutput: 'Expected output 1', actualOutput: '' },
      { passed: false, input: 'Input for test case 2', expectedOutput: 'Expected output 2', actualOutput: '' }
    ],
    hidden: {
      totalTests: 5,
      passedTests: 0,
      failedInput: ''
    }
  });
  const [showResults, setShowResults] = useState(false);

  // Initial code templates for each language
  const templates = {
    'C': `#include <stdio.h>

int main() {
    // Your code here
    return 0;
}`,
    'C++': `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
    'Python': `# Your code here
`,
    'Java': `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`
  };

  useEffect(() => {
    // Set initial code based on selected language
    setCode(templates[language]);
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(templates[newLanguage]);
  };

  const handleCheckCode = async () => {
    setIsSubmitting(true);
    setShowResults(false);
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock test results
    const mockResults = {
      visible: [
        { 
          passed: true, 
          input: 'Input for test case 1', 
          expectedOutput: 'Expected output 1', 
          actualOutput: 'Expected output 1' 
        },
        { 
          passed: true, 
          input: 'Input for test case 2', 
          expectedOutput: 'Expected output 2', 
          actualOutput: 'Expected output 2' 
        }
      ],
      hidden: {
        totalTests: 5,
        passedTests: 3,
        failedInput: 'Input for hidden test case 4'
      }
    };
    
    setTestResults(mockResults);
    setShowResults(true);
    setIsSubmitting(false);
    
    toast.success("Code checked!", {
      style: {
        fontSize: "1.125rem",
        fontWeight: 300,
        padding: 20
      }
    });
  };

  const handleSaveCode = () => {
    toast.success("Code saved successfully!", {
      style: {
        fontSize: "1.125rem",
        fontWeight: 300,
        padding: 20
      }
    });
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden main flex flex-col font-mono relative bg-[#121212]">
      <div className="w-full bg-[#1c1b1b] border-b border-[#3b3b3b] p-4 flex justify-between items-center">
        <motion.button
          onClick={() => nav("/")}
          className="text-[#ddf3ef] border-2 border-[#ddf3ef] px-4 py-1 rounded-lg text-sm hover:border-[#2bbdaa] transition-colors font-mono"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <h1 className="text-[#ddf3ef] text-xl">Coding Challenge</h1>
        <div className="invisible w-20"> {/* Spacer for centering */} </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Question details */}
        <motion.div 
          className="w-1/3 p-6 border-r border-[#3b3b3b] overflow-y-auto bg-[#1c1b1b]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[#ddf3ef] text-xl mb-4 font-semibold">Problem: Two Sum</h2>
          <div className="text-[#ddf3ef] text-sm space-y-4">
            <p>
              Given an array of integers <code className="bg-[#2a2a2a] px-1 rounded">nums</code> and an integer <code className="bg-[#2a2a2a] px-1 rounded">target</code>, return indices of the two numbers such that they add up to <code className="bg-[#2a2a2a] px-1 rounded">target</code>.
            </p>
            <p>
              You may assume that each input would have exactly one solution, and you may not use the same element twice.
            </p>
            <p>
              You can return the answer in any order.
            </p>
            
            <div className="mt-6">
              <h3 className="text-[#ddf3ef] font-semibold mb-2">Example 1:</h3>
              <div className="bg-[#2a2a2a] p-3 rounded">
                <p>Input: nums = [2,7,11,15], target = 9</p>
                <p>Output: [0,1]</p>
                <p>Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-[#ddf3ef] font-semibold mb-2">Example 2:</h3>
              <div className="bg-[#2a2a2a] p-3 rounded">
                <p>Input: nums = [3,2,4], target = 6</p>
                <p>Output: [1,2]</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-[#ddf3ef] font-semibold mb-2">Constraints:</h3>
              <ul className="list-disc pl-5">
                <li>2 ≤ nums.length ≤ 10^4</li>
                <li>-10^9 ≤ nums[i] ≤ 10^9</li>
                <li>-10^9 ≤ target ≤ 10^9</li>
                <li>Only one valid answer exists.</li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Right panel - Editor and results */}
        <motion.div 
          className="w-2/3 flex flex-col bg-[#1c1b1b]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Language selection and action buttons */}
          <div className="px-6 py-3 border-b border-[#3b3b3b] flex justify-between">
            <div className="flex space-x-2">
              {['C', 'C++', 'Python', 'Java'].map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 rounded text-sm ${
                    language === lang 
                      ? 'bg-[#2bbdaa] text-[#1c1b1b]' 
                      : 'text-[#ddf3ef] border border-[#3b3b3b] hover:border-[#2bbdaa]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {lang}
                </motion.button>
              ))}
            </div>
            <div className="flex space-x-2">
              <motion.button
                onClick={handleSaveCode}
                className="text-[#ddf3ef] border border-[#ddf3ef] px-4 py-1 rounded-lg text-sm hover:border-[#2bbdaa] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save
              </motion.button>
              <motion.button
                onClick={handleCheckCode}
                disabled={isSubmitting}
                className="bg-[#2bbdaa] text-[#1c1b1b] px-4 py-1 rounded-lg text-sm hover:bg-[#1a9b8c] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Checking..." : "Check"}
              </motion.button>
            </div>
          </div>
          
          {/* Code editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={language === 'C++' ? 'cpp' : language.toLowerCase()}
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
          
          {/* Test results */}
          <AnimatePresence>
            {showResults && (
              <motion.div 
                className="border-t border-[#3b3b3b] p-4 bg-[#1c1b1b]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3 className="text-[#ddf3ef] font-semibold mb-3">Test Results</h3>
                
                {/* Visible test cases */}
                <div className="mb-4">
                  <h4 className="text-[#ddf3ef] text-sm mb-2">External Test Cases:</h4>
                  <div className="space-y-3">
                    {testResults.visible.map((test, index) => (
                      <div key={index} className="bg-[#2a2a2a] p-3 rounded text-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[#ddf3ef]">Test Case {index + 1}</span>
                          <span className={test.passed ? "text-green-500" : "text-red-500"}>
                            {test.passed ? "✓ Passed" : "✗ Failed"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-[#ddf3ef] opacity-70">Input:</p>
                            <p className="text-[#ddf3ef] font-mono bg-[#333333] p-1 rounded">{test.input}</p>
                          </div>
                          <div>
                            <p className="text-[#ddf3ef] opacity-70">Expected Output:</p>
                            <p className="text-[#ddf3ef] font-mono bg-[#333333] p-1 rounded">{test.expectedOutput}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-[#ddf3ef] opacity-70">Your Output:</p>
                            <p className="text-[#ddf3ef] font-mono bg-[#333333] p-1 rounded">{test.actualOutput}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hidden test cases */}
                <div>
                  <h4 className="text-[#ddf3ef] text-sm mb-2">Hidden Test Cases:</h4>
                  <div className="bg-[#2a2a2a] p-3 rounded text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#ddf3ef]">
                        {testResults.hidden.passedTests} of {testResults.hidden.totalTests} test cases passed
                      </span>
                      <span className={
                        testResults.hidden.passedTests === testResults.hidden.totalTests 
                          ? "text-green-500" 
                          : "text-yellow-500"
                      }>
                        {testResults.hidden.passedTests === testResults.hidden.totalTests 
                          ? "✓ All Passed" 
                          : "⚠ Some Failed"}
                      </span>
                    </div>
                    
                    {testResults.hidden.passedTests < testResults.hidden.totalTests && (
                      <div>
                        <p className="text-[#ddf3ef] opacity-70">First Failed Test Input:</p>
                        <p className="text-[#ddf3ef] font-mono bg-[#333333] p-1 rounded">{testResults.hidden.failedInput}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <Toaster duration={3000} position="bottom-right"/>
    </div>
  );
};

export default CodingPage;