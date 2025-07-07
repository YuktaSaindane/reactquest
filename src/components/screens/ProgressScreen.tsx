'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Star, Clock, Target, Award, TrendingUp } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { levels } from '@/data/levels';

export default function ProgressScreen() {
  const { state, navigateToScreen } = useGame();

  const completionPercentage = Math.round((state.userProgress.completedLevels.length / levels.length) * 100);
  const completedCount = state.userProgress.completedLevels.length;
  const totalLevels = levels.length;

  // Calculate statistics
  const totalQuizzes = Object.values(state.userProgress.levelProgress).filter(p => p.quizCompleted).length;
  const totalChallenges = Object.values(state.userProgress.levelProgress).filter(p => p.codingCompleted).length;
  const averageQuizScore = Object.values(state.userProgress.levelProgress)
    .filter(p => p.quizCompleted)
    .reduce((sum, p) => sum + (p.quizScore || 0), 0) / (totalQuizzes || 1);

  const achievements = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete your first level',
      icon: '🚀',
      achieved: completedCount >= 1,
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Score 100% on a quiz',
      icon: '🧠',
      achieved: Object.values(state.userProgress.levelProgress).some(p => (p.quizScore || 0) >= 100),
    },
    {
      id: 'code-warrior',
      title: 'Code Warrior',
      description: 'Complete 5 coding challenges',
      icon: '⚔️',
      achieved: totalChallenges >= 5,
    },
    {
      id: 'halfway-hero',
      title: 'Halfway Hero',
      description: 'Complete 50% of all levels',
      icon: '🏆',
      achieved: completionPercentage >= 50,
    },
    {
      id: 'react-champion',
      title: 'React Champion',
      description: 'Complete all levels',
      icon: '👑',
      achieved: completionPercentage >= 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 p-6">
      <div className="max-w-6xl mx-auto">
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
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Progress
          </h1>
          
          <div></div>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{completedCount}</h3>
            <p className="text-gray-400 text-sm">Levels Completed</p>
          </motion.div>

          <motion.div 
            className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{state.userProgress.totalXP}</h3>
            <p className="text-gray-400 text-sm">Total XP</p>
          </motion.div>

          <motion.div 
            className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{Math.round(averageQuizScore)}%</h3>
            <p className="text-gray-400 text-sm">Avg Quiz Score</p>
          </motion.div>

          <motion.div 
            className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{state.userProgress.streak}</h3>
            <p className="text-gray-400 text-sm">Current Streak</p>
          </motion.div>
        </div>

        {/* Progress Overview */}
        <motion.div 
          className="bg-gray-800/30 rounded-xl p-8 mb-8 backdrop-blur-sm border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Overall Progress
            </h2>
            <span className="text-3xl font-bold text-blue-400">{completionPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
            <motion.div 
              className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </div>
          
          <p className="text-gray-400">
            You've completed {completedCount} out of {totalLevels} levels. Keep going!
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Award className="w-6 h-6 text-purple-400" />
            Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  achievement.achieved 
                    ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/50' 
                    : 'bg-gray-800/20 border-gray-600/30'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-4 ${achievement.achieved ? 'grayscale-0' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-semibold mb-2 ${achievement.achieved ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {achievement.description}
                  </p>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    achievement.achieved 
                      ? 'bg-yellow-500/20 text-yellow-400' 
                      : 'bg-gray-600/20 text-gray-500'
                  }`}>
                    {achievement.achieved ? 'Unlocked' : 'Locked'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Level Details */}
        <motion.div 
          className="bg-gray-800/30 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-400" />
            Level Details
          </h2>
          
          <div className="grid gap-4">
            {levels.map((level, index) => {
              const isCompleted = state.userProgress.completedLevels.includes(level.id);
              const progress = state.userProgress.levelProgress[level.id];
              
              return (
                <motion.div
                  key={level.id}
                  className={`p-4 rounded-lg border ${
                    isCompleted 
                      ? 'bg-green-900/20 border-green-500/50' 
                      : 'bg-gray-800/20 border-gray-600/30'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {isCompleted ? (
                          <Trophy className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-bold">{index + 1}</span>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-white">{level.title}</h3>
                        <p className="text-sm text-gray-400">{level.topic}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {progress && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${progress.quizCompleted ? 'bg-blue-400' : 'bg-gray-600'}`} />
                          <span className="text-xs text-gray-400">Quiz</span>
                          <div className={`w-2 h-2 rounded-full ${progress.codingCompleted ? 'bg-purple-400' : 'bg-gray-600'}`} />
                          <span className="text-xs text-gray-400">Code</span>
                        </div>
                      )}
                      {progress?.quizScore && (
                        <div className="text-sm text-blue-400">{progress.quizScore}% Quiz Score</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 