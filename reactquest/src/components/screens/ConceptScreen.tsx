'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Code, Brain } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ConceptScreen() {
  const { state, navigateToScreen } = useGame();
  
  if (!state.selectedLevel) {
    navigateToScreen('levelMap');
    return null;
  }

  const level = state.selectedLevel;
  const concept = level.concept;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => navigateToScreen('levelMap')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Map
          </button>
          
          <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 backdrop-blur-sm">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Concept</span>
          </div>
        </motion.div>

        {/* Level Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {level.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {level.description}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Theory Section */}
          <motion.div 
            className="bg-gray-800/30 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold">{concept.title}</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6">
                {concept.explanation}
              </p>
              
              {concept.keyPoints && concept.keyPoints.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Key Points:</h3>
                  <ul className="space-y-2">
                    {concept.keyPoints.map((point, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Code Examples Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-semibold">Code Examples</h2>
            </div>
            
            {concept.codeExamples && concept.codeExamples.length > 0 ? (
              <div className="space-y-6">
                {concept.codeExamples.map((example, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="px-6 py-4 bg-gray-700/30 border-b border-gray-600/50">
                      <h3 className="font-semibold text-green-400">{example.title}</h3>
                      {example.explanation && (
                        <p className="text-sm text-gray-400 mt-1">{example.explanation}</p>
                      )}
                    </div>
                    <div className="overflow-x-auto">
                      <SyntaxHighlighter 
                        language={example.language || 'jsx'}
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          padding: '1.5rem',
                          background: 'transparent',
                          fontSize: '0.9rem'
                        }}
                      >
                        {example.code}
                      </SyntaxHighlighter>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Fallback for levels without structured code examples
              <motion.div 
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="px-6 py-4 bg-gray-700/30 border-b border-gray-600/50">
                  <h3 className="font-semibold text-green-400">Example Code</h3>
                </div>
                <div className="overflow-x-auto">
                  <SyntaxHighlighter 
                    language="jsx"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '0.9rem'
                    }}
                  >
                    {level.codeExample || '// Code examples will be shown here'}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            onClick={() => navigateToScreen('quiz')}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain className="w-5 h-5" />
            Take the Quiz
          </motion.button>
          
          <motion.button
            onClick={() => navigateToScreen('coding')}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code className="w-5 h-5" />
            Coding Challenge
          </motion.button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gray-800/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">1</span>
              </div>
              <span className="text-sm text-blue-400 font-medium">Concept</span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-gray-400" />
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">2</span>
              </div>
              <span className="text-sm text-gray-400">Quiz</span>
            </div>
            
            <ArrowRight className="w-4 h-4 text-gray-400" />
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">3</span>
              </div>
              <span className="text-sm text-gray-400">Code</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 