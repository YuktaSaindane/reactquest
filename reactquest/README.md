# 🚀 ReactQuest

**Master React for interviews, one challenge at a time**

ReactQuest is an interactive, game-based web application that teaches React from basics to advanced concepts, specifically geared toward interview preparation. It combines concise explanations, real interview-style theory questions, and hands-on coding challenges for each concept.

![ReactQuest](https://img.shields.io/badge/React-Learning-blue) ![Next.js](https://img.shields.io/badge/Next.js-13-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

## 🎯 Why ReactQuest?

Most React learning resources:
- ❌ Are linear, passive, or boring — they read like textbooks or endless videos
- ❌ Don't combine theory + practical coding + interview context in one place
- ❌ Lack interactive quizzes or coding challenges that mirror interview problems
- ❌ Don't engage learners with progression or rewards → motivation drops quickly
- ❌ Often miss real interview patterns (e.g., tricky state updates, keys in lists, lifecycle nuances)

ReactQuest solves these with a **gamified, interview-focused, practical learning journey**.

## ✨ Key Features

### 🎮 Gamified Learning Experience
- **Progressive Level System**: Unlock new concepts by completing previous ones
- **XP & Achievement System**: Earn experience points and unlock achievements
- **Visual Progress Tracking**: See your learning journey with beautiful progress indicators
- **Streak System**: Maintain learning momentum with daily streaks

### 📚 Comprehensive React Curriculum
- **Structured Learning Path**: From JSX basics to advanced patterns
- **Real Interview Questions**: Multiple-choice quizzes based on actual tech interviews
- **Interactive Code Challenges**: Write React code in a real browser-based editor
- **Instant Feedback**: Get immediate explanations for both correct and incorrect answers

### 🛠️ Technical Features
- **Monaco Editor Integration**: Full-featured code editor with syntax highlighting
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **Dark/Light Theme**: Choose your preferred visual experience
- **Progress Persistence**: Your progress is automatically saved locally
- **Export/Import**: Backup and restore your learning progress

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reactquest.git
   cd reactquest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎮 How to Play

### 1. Welcome Screen
- Beautiful animated introduction
- Overview of key features
- Click "Start Your Quest" to begin

### 2. Level Map
- Visual representation of all available levels
- Progress indicators for each level
- Locked levels unlock as you progress
- View your total XP and achievements

### 3. Learning Flow
Each level follows a structured 3-step process:

#### Step 1: Concept Learning
- Clear explanations of React concepts
- Code examples with syntax highlighting
- Key points highlighting interview-relevant details

#### Step 2: Quiz Challenge
- Multiple-choice questions based on real interviews
- Instant feedback with detailed explanations
- Score tracking and performance analytics

#### Step 3: Coding Challenge
- Interactive coding exercises in Monaco Editor
- Real-time test execution
- Hints available when you're stuck
- Multiple test cases to validate your solution

### 4. Progress Tracking
- Detailed statistics and achievement system
- Level completion tracking
- Quiz performance analytics
- Export/import progress for backup

## 📋 Level Curriculum

### Beginner Levels
1. **JSX Basics** - Understanding JSX syntax and compilation
2. **Components & Props** - Creating and using React components
3. **State Management** - useState and state updates
4. **Event Handling** - Handling user interactions
5. **Conditional Rendering** - Dynamic UI based on state

### Intermediate Levels
6. **Lists & Keys** - Rendering lists efficiently
7. **Forms** - Controlled vs uncontrolled components
8. **Lifecycle Methods** - useEffect and lifecycle patterns
9. **Context API** - Sharing state across components
10. **Custom Hooks** - Creating reusable logic

### Advanced Levels
11. **Performance Optimization** - useMemo, useCallback, React.memo
12. **Error Boundaries** - Handling errors gracefully
13. **Portals** - Rendering outside component tree
14. **Refs** - Direct DOM manipulation
15. **Higher-Order Components** - Component composition patterns
16. **Suspense & Lazy Loading** - Code splitting and async components

## 🛠️ Tech Stack

### Frontend
- **Next.js 13** - React framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### UI & Animation
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications

### Code Editor
- **Monaco Editor** - VS Code editor in the browser
- **React Syntax Highlighter** - Code syntax highlighting

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git Hooks** - Pre-commit checks

## 📁 Project Structure

```
reactquest/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main application
│   ├── components/
│   │   └── screens/           # Screen components
│   │       ├── WelcomeScreen.tsx
│   │       ├── LevelMapScreen.tsx
│   │       ├── ConceptScreen.tsx
│   │       ├── QuizScreen.tsx
│   │       ├── CodingScreen.tsx
│   │       ├── ProgressScreen.tsx
│   │       └── SettingsScreen.tsx
│   ├── contexts/
│   │   └── GameContext.tsx    # Global state management
│   ├── data/
│   │   └── levels.ts          # Level definitions and content
│   └── types/
│       └── game.ts            # TypeScript type definitions
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🎨 Design Philosophy

### User Experience
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Performance**: Fast loading with optimized assets and code splitting
- **Visual Appeal**: Modern design with smooth animations

### Learning Approach
- **Progressive Disclosure**: Information revealed at the right time
- **Immediate Feedback**: Learn from mistakes instantly
- **Practical Application**: Theory reinforced with hands-on coding
- **Interview Context**: Every question and challenge relates to real interviews

## 🚧 Upcoming Features

- [ ] **Boss Levels**: Timed challenges simulating real interviews
- [ ] **Community Features**: Share solutions and compete with others
- [ ] **Advanced Analytics**: Detailed learning insights
- [ ] **Custom Challenges**: Create and share your own levels
- [ ] **Video Explanations**: Visual explanations for complex concepts
- [ ] **Interview Simulator**: Mock interview experience

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Areas for Contribution
- 📚 **Content**: Add new levels, questions, or coding challenges
- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **Features**: Implement new functionality
- 🎨 **Design**: Improve UI/UX
- 📖 **Documentation**: Enhance documentation and examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For creating an amazing library
- **Next.js Team** - For the excellent React framework
- **Monaco Editor** - For the powerful in-browser editor
- **Tailwind CSS** - For the utility-first CSS framework
- **All Contributors** - For making ReactQuest better

---

**Ready to master React for your next interview?** 🚀

[Start Your Quest](http://localhost:3000) | [Report Bug](https://github.com/yourusername/reactquest/issues) | [Request Feature](https://github.com/yourusername/reactquest/issues)

*Made with ❤️ for the React community*
