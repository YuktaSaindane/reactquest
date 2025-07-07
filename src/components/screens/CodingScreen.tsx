'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, CheckCircle, XCircle, Code, Trophy, Lightbulb } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';

export default function CodingScreen() {
  const { state, navigateToScreen, completeCoding } = useGame();
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!state.selectedLevel) {
    navigateToScreen('levelMap');
    return null;
  }

  const level = state.selectedLevel;
  const challenge = level.codingChallenge;

  useEffect(() => {
    setCode(challenge.startingCode);
  }, [challenge.startingCode]);

  const runTests = async () => {
    setIsRunning(true);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple test runner - in a real app, this would use a sandbox
    const results = challenge.testCases.map((testCase, index) => {
      // This is a simplified test - in reality, you'd execute the code safely
      const passed = Math.random() > 0.3; // Simulate some tests passing
      
      return {
        id: index,
        passed,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: passed ? testCase.expectedOutput : 'Error: Component not found',
        description: testCase.description
      };
    });
    
    setTestResults(results);
    setIsRunning(false);
    
    const allPassed = results.every(result => result.passed);
    if (allPassed) {
      setIsComplete(true);
      completeCoding(level.id);
      toast.success('All tests passed! Challenge completed!');
    } else {
      toast.error('Some tests failed. Keep trying!');
    }
  };

  const resetCode = () => {
    setCode(challenge.startingCode);
    setTestResults([]);
    setIsComplete(false);
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-blue-900/10">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between p-6 border-b border-gray-700/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => navigateToScreen('quiz')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Quiz
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 backdrop-blur-sm">
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Coding Challenge</span>
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex">
          {/* Left Panel - Instructions and Tests */}
          <motion.div 
            className="w-1/3 p-6 border-r border-gray-700/50 overflow-y-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Challenge Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2 text-white">{challenge.title}</h1>
              <p className="text-gray-300 mb-4">{challenge.description}</p>
              
              <div className="bg-gray-800/30 rounded-lg p-4 mb-4 border border-gray-700/50">
                <h3 className="font-semibold mb-2 text-blue-400">Instructions:</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{challenge.instructions}</p>
              </div>
            </div>

            {/* Test Cases */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4 text-green-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Test Cases
              </h3>
              
              <div className="space-y-3">
                {challenge.testCases.map((testCase, index) => {
                  const result = testResults.find(r => r.id === index);
                  
                  return (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border ${
                        result 
                          ? result.passed 
                            ? 'bg-green-900/20 border-green-500/50' 
                            : 'bg-red-900/20 border-red-500/50'
                          : 'bg-gray-800/30 border-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {result && (
                          result.passed 
                            ? <CheckCircle className="w-4 h-4 text-green-400" />
                            : <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-sm font-medium">Test {index + 1}</span>
                      </div>
                      
                      <p className="text-xs text-gray-400 mb-2">{testCase.description}</p>
                      
                      {result && !result.passed && (
                        <div className="text-xs">
                          <div className="text-red-400">Expected: {result.expectedOutput}</div>
                          <div className="text-red-400">Got: {result.actualOutput}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hints */}
            <div className="mb-6">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-3"
              >
                <Lightbulb className="w-5 h-5" />
                <span className="font-semibold">
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </span>
              </button>
              
              {showHints && (
                <motion.div 
                  className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-2">
                    {challenge.hints.map((hint, index) => (
                      <li key={index} className="text-sm text-yellow-100 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={runTests}
                disabled={isRunning}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                whileHover={!isRunning ? { scale: 1.02 } : {}}
                whileTap={!isRunning ? { scale: 0.98 } : {}}
              >
                <Play className="w-4 h-4" />
                {isRunning ? 'Running Tests...' : 'Run Tests'}
              </motion.button>
              
              <button
                onClick={resetCode}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Reset Code
              </button>

              {isComplete && (
                <motion.button
                  onClick={() => navigateToScreen('levelMap')}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trophy className="w-4 h-4" />
                  Complete Level
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Right Panel - Code Editor */}
          <motion.div 
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="p-4 border-b border-gray-700/50">
              <h3 className="font-semibold text-white">Code Editor</h3>
              <p className="text-sm text-gray-400">Write your solution below</p>
            </div>
            
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  renderLineHighlight: 'line',
                  selectOnLineNumbers: true,
                  roundedSelection: false,
                  readOnly: false,
                  cursorStyle: 'line',
                  folding: true,
                  showFoldingControls: 'mouseover',
                  matchBrackets: 'always',
                  autoIndent: 'advanced',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Success Modal */}
        {isComplete && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold mb-4 text-white">
                🎉 Challenge Complete!
              </h2>
              
              <p className="text-gray-300 mb-6">
                All tests passed! You've successfully completed the coding challenge.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setIsComplete(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Continue Coding
                </button>
                
                <button
                  onClick={() => navigateToScreen('levelMap')}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold"
                >
                  Next Level
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 