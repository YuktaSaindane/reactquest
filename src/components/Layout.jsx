import React from 'react'
import { useGame } from '../context/GameContext'
import { Code, Zap, User } from 'lucide-react'

function Layout({ children }) {
  const { userName, progress, score } = useGame()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-react-blue" />
              <h1 className="text-2xl font-bold text-gray-900">
                React<span className="text-react-blue">Quest</span>
              </h1>
            </div>

            {/* User info and progress */}
            <div className="flex items-center space-x-4">
              {userName && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{userName}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">{score} pts</span>
                  </div>

                  {progress > 0 && (
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-react-blue h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Master React by playing! 🚀</p>
            <p className="mt-1">Built with React, Tailwind CSS, and ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 