import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { motion, AnimatePresence } from 'framer-motion'
import CodeEditor from '../components/CodeEditor'
import CodePreview from '../components/CodePreview'
import { 
  Check, 
  X, 
  Lightbulb, 
  SkipForward, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Target,
  Clock,
  Zap
} from 'lucide-react'

function Challenge() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { 
    currentChallengeData, 
    currentChallenge, 
    totalChallenges,
    dispatch,
    attempts,
    isGameComplete
  } = useGame()

  const [userCode, setUserCode] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [isChecking, setIsChecking] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const challengeNumber = parseInt(id)
  const challenge = currentChallengeData

  useEffect(() => {
    if (challenge) {
      setUserCode(challenge.initialCode)
      setShowHint(false)
      setFeedback(null)
      setShowExplanation(false)
    }
  }, [challenge])

  useEffect(() => {
    // Navigate to results if game is complete
    if (isGameComplete) {
      dispatch({ type: 'COMPLETE_GAME' })
      navigate('/results')
    }
  }, [isGameComplete, navigate, dispatch])

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Challenge Not Found</h1>
        <button onClick={() => navigate('/')} className="btn-primary">
          Go Home
        </button>
      </div>
    )
  }

  const validateCode = () => {
    if (!challenge.testCases) return true

    return challenge.testCases.every(testCase => {
      try {
        return testCase.test(userCode.trim())
      } catch (error) {
        return false
      }
    })
  }

  const handleCheckAnswer = async () => {
    setIsChecking(true)
    dispatch({ type: 'ADD_ATTEMPT', payload: { challengeId: challenge.id } })

    // Simulate checking delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))

    const isCorrect = validateCode()
    const currentAttempts = (attempts[challenge.id] || 0) + 1
    const isFirstTry = currentAttempts === 1

    if (isCorrect) {
      setFeedback({
        type: 'success',
        message: isFirstTry ? '🎉 Perfect! First try!' : '✅ Correct! Well done!',
        details: 'Your solution meets all the requirements.'
      })
      
      setTimeout(() => {
        dispatch({ 
          type: 'COMPLETE_CHALLENGE', 
          payload: { challengeId: challenge.id, firstTry: isFirstTry }
        })
        setShowExplanation(true)
      }, 1500)
    } else {
      const failedTests = challenge.testCases?.filter(test => {
        try {
          return !test.test(userCode.trim())
        } catch {
          return true
        }
      }) || []

      setFeedback({
        type: 'error',
        message: '❌ Not quite right',
        details: failedTests.length > 0 
          ? `Missing: ${failedTests[0].description}`
          : 'Your code doesn\'t match the expected solution.'
      })
    }

    setIsChecking(false)
  }

  const goToNextChallenge = () => {
    const nextChallengeNumber = challengeNumber + 1
    if (nextChallengeNumber <= totalChallenges) {
      navigate(`/challenge/${nextChallengeNumber}`)
    } else {
      navigate('/results')
    }
  }

  const goToPrevChallenge = () => {
    const prevChallengeNumber = challengeNumber - 1
    if (prevChallengeNumber >= 1) {
      navigate(`/challenge/${prevChallengeNumber}`)
    } else {
      navigate('/')
    }
  }

  const resetCode = () => {
    setUserCode(challenge.initialCode)
    setFeedback(null)
    setShowHint(false)
  }

  const useHint = () => {
    setShowHint(true)
    dispatch({ type: 'USE_HINT' })
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPrevChallenge}
              disabled={challengeNumber <= 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-react-blue" />
              <span className="text-lg font-semibold text-gray-900">
                Challenge {challengeNumber} of {totalChallenges}
              </span>
            </div>

            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
          </div>

          <button
            onClick={goToNextChallenge}
            className="btn-secondary flex items-center space-x-1"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{challenge.title}</h1>
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Topic: {challenge.topic}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>Attempts: {attempts[challenge.id] || 0}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={useHint}
                className="btn-secondary flex items-center space-x-1"
                disabled={showHint}
              >
                <Lightbulb className="h-4 w-4" />
                <span>Hint</span>
              </button>
              <button
                onClick={resetCode}
                className="btn-secondary flex items-center space-x-1"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Hint</h4>
                    <p className="text-yellow-700">{challenge.hint}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Code Editor and Preview */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Code</h3>
            <CodeEditor
              value={userCode}
              onChange={setUserCode}
              language="javascript"
            />
          </div>

          <button
            onClick={handleCheckAnswer}
            disabled={isChecking || feedback?.type === 'success'}
            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isChecking ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Checking...</span>
              </>
            ) : feedback?.type === 'success' ? (
              <>
                <Check className="h-4 w-4" />
                <span>Correct!</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Check Answer</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-4">
          <CodePreview
            code={userCode}
            challenge={challenge}
          />

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg border ${
                  feedback.type === 'success' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {feedback.type === 'success' ? (
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`font-medium ${
                      feedback.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {feedback.message}
                    </h4>
                    <p className={`${
                      feedback.type === 'success' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {feedback.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && feedback?.type === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
                <p className="text-blue-700 mb-4">{challenge.explanation}</p>
                <button
                  onClick={goToNextChallenge}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Next Challenge</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Challenge 