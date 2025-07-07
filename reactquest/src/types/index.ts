export interface Level {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isUnlocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  concept: ConceptContent;
  quiz: Quiz;
  codingChallenge: CodingChallenge;
}

export interface ConceptContent {
  title: string;
  explanation: string;
  codeExamples: CodeExample[];
  keyPoints: string[];
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  instructions: string;
  startingCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
}

export interface TestCase {
  input: any;
  expectedOutput: string;
  description: string;
}

export interface UserProgress {
  currentLevel: string;
  completedLevels: string[];
  totalXP: number;
  streak: number;
  achievements: string[];
  levelProgress: Record<string, LevelProgress>;
}

export interface LevelProgress {
  quizCompleted?: boolean;
  codingCompleted?: boolean;
  quizScore?: number;
  bestScore?: number;
  attempts?: number;
}

export interface GameState {
  currentScreen: Screen;
  selectedLevel?: Level;
  userProgress: UserProgress;
  isLoading: boolean;
  theme: 'light' | 'dark';
}

export type Screen = 
  | 'welcome'
  | 'levelMap' 
  | 'concept'
  | 'quiz'
  | 'coding'
  | 'progress'
  | 'settings';

export interface LevelMapNode {
  level: Level;
  position: { x: number; y: number };
  connections: string[];
} 