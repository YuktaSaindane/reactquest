'use client';

import { useGame } from '@/contexts/GameContext';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import LevelMapScreen from '@/components/screens/LevelMapScreen';
import ConceptScreen from '@/components/screens/ConceptScreen';
import QuizScreen from '@/components/screens/QuizScreen';
import CodingScreen from '@/components/screens/CodingScreen';
import ProgressScreen from '@/components/screens/ProgressScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';

export default function ReactQuest() {
  const { state } = useGame();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'levelMap':
        return <LevelMapScreen />;
      case 'concept':
        return <ConceptScreen />;
      case 'quiz':
        return <QuizScreen />;
      case 'coding':
        return <CodingScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {renderScreen()}
    </div>
  );
}
