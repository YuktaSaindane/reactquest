'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, UserProgress, Level, Screen, LevelProgress } from '@/types';
import { levels } from '@/data/levels';

interface GameContextType {
  state: GameState;
  navigateToScreen: (screen: Screen) => void;
  selectLevel: (level: Level) => void;
  completeQuiz: (levelId: string, score: number) => void;
  completeCoding: (levelId: string) => void;
  addXP: (amount: number) => void;
  resetProgress: () => void;
  toggleTheme: () => void;
}

type GameAction =
  | { type: 'NAVIGATE_TO_SCREEN'; screen: Screen }
  | { type: 'SELECT_LEVEL'; level: Level }
  | { type: 'COMPLETE_QUIZ'; levelId: string; score: number }
  | { type: 'COMPLETE_CODING'; levelId: string }
  | { type: 'ADD_XP'; amount: number }
  | { type: 'RESET_PROGRESS' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'LOAD_PROGRESS'; progress: UserProgress };

const initialUserProgress: UserProgress = {
  currentLevel: 'jsx-basics',
  completedLevels: [],
  totalXP: 0,
  streak: 0,
  achievements: [],
  levelProgress: {}
};

const initialState: GameState = {
  currentScreen: 'welcome',
  userProgress: initialUserProgress,
  isLoading: false,
  theme: 'dark'
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'NAVIGATE_TO_SCREEN':
      return {
        ...state,
        currentScreen: action.screen
      };

    case 'SELECT_LEVEL':
      return {
        ...state,
        selectedLevel: action.level,
        currentScreen: 'concept'
      };

    case 'COMPLETE_QUIZ': {
      const levelProgress: LevelProgress = {
        ...state.userProgress.levelProgress[action.levelId],
        quizCompleted: true,
        quizScore: action.score,
        attempts: (state.userProgress.levelProgress[action.levelId]?.attempts || 0) + 1,
        bestScore: Math.max(
          action.score,
          state.userProgress.levelProgress[action.levelId]?.bestScore || 0
        )
      };

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          levelProgress: {
            ...state.userProgress.levelProgress,
            [action.levelId]: levelProgress
          }
        }
      };
    }

    case 'COMPLETE_CODING': {
      const levelProgress: LevelProgress = {
        ...state.userProgress.levelProgress[action.levelId],
        codingCompleted: true
      };

      const isLevelComplete = levelProgress.quizCompleted && levelProgress.codingCompleted;
      const isAlreadyCompleted = state.userProgress.completedLevels.includes(action.levelId);

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          completedLevels: isLevelComplete && !isAlreadyCompleted 
            ? [...state.userProgress.completedLevels, action.levelId]
            : state.userProgress.completedLevels,
          levelProgress: {
            ...state.userProgress.levelProgress,
            [action.levelId]: levelProgress
          }
        }
      };
    }

    case 'ADD_XP':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          totalXP: state.userProgress.totalXP + action.amount
        }
      };

    case 'RESET_PROGRESS':
      return {
        ...state,
        userProgress: initialUserProgress,
        currentScreen: 'welcome'
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };

    case 'LOAD_PROGRESS':
      return {
        ...state,
        userProgress: action.progress
      };

    default:
      return state;
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('reactquest-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        dispatch({ type: 'LOAD_PROGRESS', progress });
      } catch (error) {
        console.error('Failed to load saved progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('reactquest-progress', JSON.stringify(state.userProgress));
  }, [state.userProgress]);

  const navigateToScreen = (screen: Screen) => {
    dispatch({ type: 'NAVIGATE_TO_SCREEN', screen });
  };

  const selectLevel = (level: Level) => {
    dispatch({ type: 'SELECT_LEVEL', level });
  };

  const completeQuiz = (levelId: string, score: number) => {
    dispatch({ type: 'COMPLETE_QUIZ', levelId, score });
    
    // Add XP based on score
    const level = levels.find(l => l.id === levelId);
    if (level) {
      const xpEarned = Math.floor((score / 100) * level.xpReward);
      dispatch({ type: 'ADD_XP', amount: xpEarned });
    }
  };

  const completeCoding = (levelId: string) => {
    dispatch({ type: 'COMPLETE_CODING', levelId });
    
    // Add full XP for completing coding challenge
    const level = levels.find(l => l.id === levelId);
    if (level) {
      dispatch({ type: 'ADD_XP', amount: level.xpReward });
    }
  };

  const addXP = (amount: number) => {
    dispatch({ type: 'ADD_XP', amount });
  };

  const resetProgress = () => {
    dispatch({ type: 'RESET_PROGRESS' });
    localStorage.removeItem('reactquest-progress');
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const value: GameContextType = {
    state,
    navigateToScreen,
    selectLevel,
    completeQuiz,
    completeCoding,
    addXP,
    resetProgress,
    toggleTheme
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 