import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { motion } from 'framer-motion'
import { Play, Code, Lightbulb, Trophy, User } from 'lucide-react'

function Home() {
  const [inputName, setInputName] = useState('')
  const { userName, dispatch } = useGame()
  const navigate = useNavigate()

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (inputName.trim()) {
      dispatch({ type: 'SET_USER_NAME', payload: inputName.trim() })
    }
  }

  const startGame = () => {
    dispatch({ type: 'START_GAME' })
    navigate('/challenge/1')
  }

  const features = [
    {
      icon: <Code className="h-8 w-8 text-react-blue" />,
      title: "Interactive Coding",
      description: "Write real React code with live feedback and syntax highlighting"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "Smart Hints",
      description: "Get helpful hints when you're stuck, without giving away the answer"
    },
    {
      icon: <Trophy className="h-8 w-8 text-green-500" />,
      title: "Track Progress",
      description: "Earn points, track your progress, and celebrate your achievements"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-react-blue">ReactQuest</span>! 🚀
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Master React concepts through interactive challenges. Write real code, get instant feedback, 
          and level up your React skills in a fun, engaging way!
        </p>
        
        <div className="inline-block bg-gradient-to-r from-react-blue to-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-8">
          ✨ Learn JSX, Hooks, State, Props, Context & More!
        </div>
      </motion.div>

      {/* Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="card text-center"
          >
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* User Input & Start Game */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card max-w-md mx-auto text-center"
      >
        {!userName ? (
          <form onSubmit={handleNameSubmit}>
            <div className="flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-gray-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Let's Get Started!</h2>
            </div>
            <p className="text-gray-600 mb-4">Enter your name to personalize your learning experience</p>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-react-blue focus:border-transparent mb-4"
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputName.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Continue
            </button>
          </form>
        ) : (
          <div>
            <div className="flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-react-blue mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Welcome back, {userName}! 👋
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Ready to master React through interactive challenges?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Start ReactQuest</span>
            </motion.button>
            <button
              onClick={() => dispatch({ type: 'SET_USER_NAME', payload: '' })}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Change name
            </button>
          </div>
        )}
      </motion.div>

      {/* Learning Path Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Your Learning Journey</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {['JSX', 'Components', 'Props', 'State', 'Hooks', 'Events', 'Forms', 'Context'].map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3"
            >
              <span className="text-sm font-medium text-blue-700">{topic}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Home 