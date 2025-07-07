'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, RotateCcw, Download, Upload, Trash2, Info } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SettingsScreen() {
  const { state, navigateToScreen, toggleTheme, resetProgress } = useGame();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    toast.success('Progress reset successfully!');
  };

  const handleExportProgress = () => {
    const data = JSON.stringify(state.userProgress, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reactquest-progress.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Progress exported!');
  };

  const handleImportProgress = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            localStorage.setItem('reactquest-progress', JSON.stringify(data));
            toast.success('Progress imported! Please refresh the page.');
          } catch (error) {
            toast.error('Invalid file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

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
            onClick={() => navigateToScreen('levelMap')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Map
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Settings
          </h1>
          
          <div></div>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Appearance */}
          <motion.div 
            className="bg-gray-800/30 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              {state.theme === 'dark' ? (
                <Moon className="w-6 h-6 text-blue-400" />
              ) : (
                <Sun className="w-6 h-6 text-yellow-400" />
              )}
              Appearance
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white mb-1">Theme</h3>
                  <p className="text-gray-400 text-sm">Choose your preferred color scheme</p>
                </div>
                
                <motion.button
                  onClick={toggleTheme}
                  className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
                    state.theme === 'dark' ? 'bg-blue-600' : 'bg-yellow-500'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                    animate={{
                      x: state.theme === 'dark' ? 0 : 32
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {state.theme === 'dark' ? (
                      <Moon className="w-3 h-3 text-blue-600" />
                    ) : (
                      <Sun className="w-3 h-3 text-yellow-500" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Progress Management */}
          <motion.div 
            className="bg-gray-800/30 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <RotateCcw className="w-6 h-6 text-green-400" />
              Progress Management
            </h2>
            
            <div className="space-y-6">
              {/* Export Progress */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white mb-1">Export Progress</h3>
                  <p className="text-gray-400 text-sm">Download your progress as a backup file</p>
                </div>
                
                <motion.button
                  onClick={handleExportProgress}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Export
                </motion.button>
              </div>

              {/* Import Progress */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white mb-1">Import Progress</h3>
                  <p className="text-gray-400 text-sm">Restore progress from a backup file</p>
                </div>
                
                <motion.button
                  onClick={handleImportProgress}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Upload className="w-4 h-4" />
                  Import
                </motion.button>
              </div>

              {/* Reset Progress */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-600/50">
                <div>
                  <h3 className="font-semibold text-red-400 mb-1">Reset Progress</h3>
                  <p className="text-gray-400 text-sm">Clear all progress and start over</p>
                </div>
                
                <motion.button
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4" />
                  Reset
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* About */}
          <motion.div 
            className="bg-gray-800/30 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-400" />
              About ReactQuest
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                ReactQuest is an interactive, game-based learning platform designed to help developers 
                master React concepts for technical interviews.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Features</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Interactive coding challenges</li>
                    <li>• Real interview questions</li>
                    <li>• Progress tracking</li>
                    <li>• Instant feedback</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">Technologies</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Next.js & React</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                    <li>• Monaco Editor</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Current Stats */}
          <motion.div 
            className="bg-gray-800/30 rounded-xl p-8 backdrop-blur-sm border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Current Progress</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {state.userProgress.completedLevels.length}
                </div>
                <div className="text-sm text-gray-400">Levels Complete</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {state.userProgress.totalXP}
                </div>
                <div className="text-sm text-gray-400">Total XP</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {state.userProgress.streak}
                </div>
                <div className="text-sm text-gray-400">Current Streak</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {Object.keys(state.userProgress.levelProgress).length}
                </div>
                <div className="text-sm text-gray-400">Levels Started</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  Reset All Progress?
                </h3>
                
                <p className="text-gray-300 mb-8">
                  This will permanently delete all your progress, including completed levels, 
                  XP, and achievements. This action cannot be undone.
                </p>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleResetProgress}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Reset Everything
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 