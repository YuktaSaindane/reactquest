import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Clock, 
  Target, 
  Lightbulb, 
  RotateCcw,
  Home,
  Share2,
  Award
} from 'lucide-react'

function Results() {
  const { 
    userName, 
    score, 
    completedChallenges, 
    totalChallenges,
    startTime, 
    endTime, 
    hintsUsed,
    attempts,
    dispatch 
  } = useGame()
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti animation
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const formatTime = (start, end) => {
    if (!start || !end) return 'Unknown'
    const diffMinutes = Math.round((end - start) / (1000 * 60))
    if (diffMinutes < 1) return 'Less than a minute'
    if (diffMinutes === 1) return '1 minute'
    return `${diffMinutes} minutes`
  }

  const getPerformanceMessage = () => {
    const completionRate = (completedChallenges.length / totalChallenges) * 100
    const avgAttempts = Object.values(attempts).reduce((a, b) => a + b, 0) / completedChallenges.length

    if (completionRate === 100 && avgAttempts <= 1.5) {
      return "🏆 React Master! Outstanding performance!"
    } else if (completionRate === 100) {
      return "🎉 Congratulations! You completed all challenges!"
    } else if (completionRate >= 75) {
      return "🌟 Great job! You're well on your way to React mastery!"
    } else if (completionRate >= 50) {
      return "👍 Good progress! Keep practicing to improve!"
    } else {
      return "🚀 Every journey starts with a single step!"
    }
  }

  const getTotalAttempts = () => {
    return Object.values(attempts).reduce((total, count) => total + count, 0)
  }

  const restartGame = () => {
    dispatch({ type: 'RESET_GAME' })
    navigate('/')
  }

  const goHome = () => {
    navigate('/')
  }

  const shareResults = () => {
    const text = `I just completed ${completedChallenges.length}/${totalChallenges} React challenges on ReactQuest and scored ${score} points! 🚀 #ReactQuest #LearnReact`
    
    if (navigator.share) {
      navigator.share({
        title: 'ReactQuest Results',
        text: text,
        url: window.location.origin
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!')
      })
    }
  }

  const achievements = [
    {
      title: "First Steps",
      description: "Completed your first challenge",
      earned: completedChallenges.length >= 1,
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Quick Learner",
      description: "Completed 5 challenges",
      earned: completedChallenges.length >= 5,
      icon: <Star className="h-6 w-6" />
    },
    {
      title: "React Expert",
      description: "Completed all challenges",
      earned: completedChallenges.length === totalChallenges,
      icon: <Trophy className="h-6 w-6" />
    },
    {
      title: "Perfectionist",
      description: "Solved challenges with minimal hints",
      earned: hintsUsed <= Math.floor(totalChallenges / 4),
      icon: <Award className="h-6 w-6" />
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`
              }}
              animate={{
                y: ['0vh', '100vh'],
                rotate: [0, 360],
                opacity: [1, 0]
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="mb-6">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {userName ? `Amazing work, ${userName}!` : 'Congratulations!'}
          </h1>
          <p className="text-xl text-gray-600">{getPerformanceMessage()}</p>
        </div>

        {/* Score Card */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card max-w-md mx-auto mb-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-react-blue mb-2">{score}</div>
            <div className="text-gray-600">Total Points</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="card text-center">
          <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{completedChallenges.length}</div>
          <div className="text-sm text-gray-600">Challenges Completed</div>
        </div>

        <div className="card text-center">
          <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{formatTime(startTime, endTime)}</div>
          <div className="text-sm text-gray-600">Time Spent</div>
        </div>

        <div className="card text-center">
          <Lightbulb className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{hintsUsed}</div>
          <div className="text-sm text-gray-600">Hints Used</div>
        </div>

        <div className="card text-center">
          <RotateCcw className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{getTotalAttempts()}</div>
          <div className="text-sm text-gray-600">Total Attempts</div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Achievements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className={`card flex items-center space-x-4 ${
                achievement.earned 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className={`p-2 rounded-full ${
                achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  achievement.earned ? 'text-green-800' : 'text-gray-500'
                }`}>
                  {achievement.title}
                  {achievement.earned && <span className="ml-2">✅</span>}
                </h3>
                <p className={`text-sm ${
                  achievement.earned ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={shareResults}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Results</span>
        </button>

        <button
          onClick={restartGame}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Play Again</span>
        </button>

        <button
          onClick={goHome}
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </button>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 card text-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Your React Journey</h3>
        <p className="text-gray-600 mb-4">
          Ready to take your React skills to the next level? Here are some great next steps:
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">📚 Official Docs</h4>
            <p className="text-blue-600">Dive deeper with React's official documentation</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">🛠️ Build Projects</h4>
            <p className="text-green-600">Apply your skills in real-world projects</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">🔗 Join Community</h4>
            <p className="text-purple-600">Connect with other React developers</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Results 