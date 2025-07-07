'use client';

import { motion } from 'framer-motion';
import { Lock, CheckCircle, Play, Star, Trophy, Settings, BarChart3 } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { levels } from '@/data/levels';

export default function LevelMapScreen() {
  const { state, selectLevel, navigateToScreen } = useGame();

  const isLevelUnlocked = (levelId: string) => {
    if (levelId === 'jsx-basics') return true; // First level is always unlocked
    
    // Check if previous level is completed
    const currentIndex = levels.findIndex(l => l.id === levelId);
    if (currentIndex === 0) return true;
    
    const previousLevel = levels[currentIndex - 1];
    return state.userProgress.completedLevels.includes(previousLevel.id);
  };

  const isLevelCompleted = (levelId: string) => {
    return state.userProgress.completedLevels.includes(levelId);
  };

  const getLevelProgress = (levelId: string) => {
    const progress = state.userProgress.levelProgress[levelId];
    if (!progress) return { quiz: false, coding: false };
    return {
      quiz: progress.quizCompleted || false,
      coding: progress.codingCompleted || false
    };
  };

  const completionPercentage = Math.round((state.userProgress.completedLevels.length / levels.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Level Map
            </h1>
            <p className="text-gray-400">Choose your next challenge</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="bg-gray-800/50 rounded-lg px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-yellow-400">
                <Star className="w-4 h-4" />
                <span className="font-semibold">{state.userProgress.totalXP}</span>
                <span className="text-gray-400 text-sm">XP</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigateToScreen('progress')}
              className="bg-gray-800/50 rounded-lg p-2 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigateToScreen('settings')}
              className="bg-gray-800/50 rounded-lg p-2 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div 
          className="bg-gray-800/30 rounded-xl p-6 mb-8 backdrop-blur-sm border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Your Progress
            </h2>
            <span className="text-2xl font-bold text-blue-400">{completionPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <motion.div 
              className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          
          <p className="text-gray-400 text-sm">
            {state.userProgress.completedLevels.length} of {levels.length} levels completed
          </p>
        </motion.div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = isLevelCompleted(level.id);
            const progress = getLevelProgress(level.id);
            
            return (
              <motion.div
                key={level.id}
                className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  completed 
                    ? 'bg-green-900/20 border-green-500/50 hover:border-green-400' 
                    : unlocked 
                    ? 'bg-gray-800/30 border-gray-600/50 hover:border-blue-400 cursor-pointer' 
                    : 'bg-gray-800/10 border-gray-700/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={unlocked ? { scale: 1.02, y: -5 } : {}}
                onClick={() => unlocked && selectLevel(level)}
              >
                {/* Level Number Badge */}
                <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  completed ? 'bg-green-500 text-white' : unlocked ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'
                }`}>
                  {completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>

                {/* Lock Icon for locked levels */}
                {!unlocked && (
                  <div className="absolute top-3 right-3">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                )}

                <div className="p-6 pt-12">
                  <h3 className={`text-lg font-semibold mb-2 ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {level.title}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                    {level.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      level.difficulty === 'beginner' ? 'bg-green-900/30 text-green-400' :
                      level.difficulty === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {level.difficulty}
                    </div>
                    
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{level.xpReward}</span>
                    </div>
                  </div>

                  {/* Progress indicators */}
                  {unlocked && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`flex items-center gap-1 text-xs ${progress.quiz ? 'text-green-400' : 'text-gray-500'}`}>
                        <div className={`w-2 h-2 rounded-full ${progress.quiz ? 'bg-green-400' : 'bg-gray-600'}`} />
                        Quiz
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${progress.coding ? 'text-green-400' : 'text-gray-500'}`}>
                        <div className={`w-2 h-2 rounded-full ${progress.coding ? 'bg-green-400' : 'bg-gray-600'}`} />
                        Code
                      </div>
                    </div>
                  )}

                  {unlocked && !completed && (
                    <motion.button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-4 h-4" />
                      Start Level
                    </motion.button>
                  )}

                  {completed && (
                    <motion.button
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Replay
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 