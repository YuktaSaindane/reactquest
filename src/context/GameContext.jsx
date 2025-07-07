import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { challenges } from '../data/challenges'

const GameContext = createContext()

const initialState = {
  currentChallenge: 0,
  completedChallenges: [],
  userName: '',
  score: 0,
  startTime: null,
  endTime: null,
  hintsUsed: 0,
  attempts: {},
  gameStarted: false
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload }
    
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        startTime: new Date(),
        currentChallenge: 0,
        completedChallenges: [],
        score: 0,
        hintsUsed: 0,
        attempts: {}
      }
    
    case 'COMPLETE_CHALLENGE':
      const newCompleted = [...state.completedChallenges, action.payload.challengeId]
      const newScore = state.score + (action.payload.firstTry ? 100 : 50)
      
      return {
        ...state,
        completedChallenges: newCompleted,
        score: newScore,
        currentChallenge: state.currentChallenge + 1
      }
    
    case 'USE_HINT':
      return {
        ...state,
        hintsUsed: state.hintsUsed + 1
      }
    
    case 'ADD_ATTEMPT':
      const challengeId = action.payload.challengeId
      const currentAttempts = state.attempts[challengeId] || 0
      
      return {
        ...state,
        attempts: {
          ...state.attempts,
          [challengeId]: currentAttempts + 1
        }
      }
    
    case 'COMPLETE_GAME':
      return {
        ...state,
        endTime: new Date()
      }
    
    case 'RESET_GAME':
      return {
        ...initialState,
        userName: state.userName
      }
    
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('reactquest-progress')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        // Only restore certain parts of state, not everything
        if (parsed.userName) {
          dispatch({ type: 'SET_USER_NAME', payload: parsed.userName })
        }
      } catch (error) {
        console.error('Error loading saved state:', error)
      }
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    const stateToSave = {
      userName: state.userName,
      completedChallenges: state.completedChallenges
    }
    localStorage.setItem('reactquest-progress', JSON.stringify(stateToSave))
  }, [state.userName, state.completedChallenges])

  const value = {
    ...state,
    dispatch,
    totalChallenges: challenges.length,
    currentChallengeData: challenges[state.currentChallenge] || null,
    isGameComplete: state.currentChallenge >= challenges.length,
    progress: (state.completedChallenges.length / challenges.length) * 100
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
} 