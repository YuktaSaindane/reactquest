'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, ArrowRight, Brain, Clock, Trophy } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import toast from 'react-hot-toast';

export default function QuizScreen() {
  const { state, navigateToScreen, completeQuiz } = useGame();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  if (!state.selectedLevel) {
    navigateToScreen('levelMap');
    return null;
  }

  const level = state.selectedLevel;
  const questions = level.quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Initialize answers array
  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, [questions.length]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer');
      return;
    }

    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleCompleteQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
      setShowFeedback(false);
    }
  };

  const handleCompleteQuiz = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    setIsQuizComplete(true);
    completeQuiz(level.id, score);
    
    toast.success(`Quiz completed! Score: ${score}%`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  if (isQuizComplete) {
    const score = calculateScore();
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/10 to-blue-900/10 p-6 flex items-center justify-center">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Quiz Complete!
          </h1>

          <div className="bg-gray-800/30 rounded-xl p-8 mb-8 backdrop-blur-sm border border-gray-700/50">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400">{score}%</div>
                <div className="text-gray-400 text-sm">Score</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">{correctAnswers}/{questions.length}</div>
                <div className="text-gray-400 text-sm">Correct</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">{formatTime(timeSpent)}</div>
                <div className="text-gray-400 text-sm">Time</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigateToScreen('coding')}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
              Continue to Coding Challenge
            </motion.button>
            
            <motion.button
              onClick={() => navigateToScreen('levelMap')}
              className="flex items-center justify-center gap-3 bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Map
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => navigateToScreen('concept')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Concept
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">{formatTime(timeSpent)}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Quiz</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{level.title} Quiz</h2>
            <span className="text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div 
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            className="bg-gray-800/30 rounded-xl p-8 mb-8 backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{currentQuestionIndex + 1}</span>
              </div>
              <div className="flex-1">
                <div className={`px-3 py-1 rounded-full text-xs font-medium mb-4 inline-block ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-900/30 text-green-400' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {currentQuestion.difficulty}
                </div>
                <h3 className="text-xl font-semibold text-white leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isWrong = showFeedback && isSelected && !isCorrect;
                const shouldHighlight = showFeedback && isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                      shouldHighlight ? 'bg-green-900/30 border-green-500 text-green-100' :
                      isWrong ? 'bg-red-900/30 border-red-500 text-red-100' :
                      isSelected ? 'bg-blue-900/30 border-blue-500 text-blue-100' :
                      'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:border-gray-500'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}`}
                    disabled={showFeedback}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        shouldHighlight ? 'border-green-500 bg-green-500' :
                        isWrong ? 'border-red-500 bg-red-500' :
                        isSelected ? 'border-blue-500 bg-blue-500' :
                        'border-gray-500'
                      }`}>
                        {shouldHighlight && <CheckCircle className="w-4 h-4 text-white" />}
                        {isWrong && <XCircle className="w-4 h-4 text-white" />}
                        {isSelected && !showFeedback && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  className="mt-6 p-4 bg-gray-700/50 rounded-lg border-l-4 border-blue-500"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-blue-400 mb-2">Explanation:</h4>
                  <p className="text-gray-300">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div 
          className="flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div></div>
          
          <div className="flex gap-4">
            {!showFeedback ? (
              <motion.button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
                whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
                whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
              >
                Submit Answer
              </motion.button>
            ) : (
              <motion.button
                onClick={handleNextQuestion}
                className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 