export const challenges = [
  {
    id: 1,
    title: "JSX Basics",
    description: "Create a heading element that displays 'Hello, React!'",
    topic: "JSX",
    difficulty: "beginner",
    initialCode: "// Write your JSX here\n",
    expectedCode: "<h1>Hello, React!</h1>",
    hint: "Remember: JSX looks like HTML but you're actually writing JavaScript. Use angle brackets to create elements.",
    explanation: "JSX allows you to write HTML-like syntax in JavaScript. It gets compiled to React.createElement() calls.",
    testCases: [
      {
        description: "Should render an h1 element",
        test: (code) => code.includes('<h1>') && code.includes('</h1>')
      },
      {
        description: "Should contain the text 'Hello, React!'",
        test: (code) => code.includes('Hello, React!')
      }
    ]
  },
  {
    id: 2,
    title: "Creating Components",
    description: "Create a functional component called 'Greeting' that returns a welcome message",
    topic: "Components",
    difficulty: "beginner",
    initialCode: "// Create your component here\nfunction Greeting() {\n  \n}",
    expectedCode: "function Greeting() {\n  return <h1>Welcome to ReactQuest!</h1>\n}",
    hint: "Functional components are just JavaScript functions that return JSX. Don't forget the return statement!",
    explanation: "Components are the building blocks of React apps. They let you split the UI into independent, reusable pieces.",
    testCases: [
      {
        description: "Should be a function named Greeting",
        test: (code) => code.includes('function Greeting')
      },
      {
        description: "Should return JSX",
        test: (code) => code.includes('return') && code.includes('<')
      }
    ]
  },
  {
    id: 3,
    title: "Props Basics",
    description: "Create a component that accepts a 'name' prop and displays 'Hello, [name]!'",
    topic: "Props",
    difficulty: "beginner",
    initialCode: "function PersonalGreeting(props) {\n  // Use the name prop here\n  \n}",
    expectedCode: "function PersonalGreeting(props) {\n  return <h1>Hello, {props.name}!</h1>\n}",
    hint: "Props are passed to components like function parameters. Use curly braces {} to embed JavaScript expressions in JSX.",
    explanation: "Props allow you to pass data to components, making them dynamic and reusable.",
    testCases: [
      {
        description: "Should use props.name",
        test: (code) => code.includes('props.name')
      },
      {
        description: "Should use curly braces for JavaScript expression",
        test: (code) => code.includes('{') && code.includes('}')
      }
    ]
  },
  {
    id: 4,
    title: "Destructuring Props",
    description: "Rewrite the component to use destructuring to extract the 'name' prop",
    topic: "Props",
    difficulty: "beginner",
    initialCode: "function PersonalGreeting(props) {\n  return <h1>Hello, {props.name}!</h1>\n}",
    expectedCode: "function PersonalGreeting({ name }) {\n  return <h1>Hello, {name}!</h1>\n}",
    hint: "You can destructure props directly in the function parameters: function Component({ propName }) { ... }",
    explanation: "Destructuring makes your code cleaner by extracting specific props without the 'props.' prefix.",
    testCases: [
      {
        description: "Should use destructuring in parameters",
        test: (code) => code.includes('{ name }')
      },
      {
        description: "Should use name directly (not props.name)",
        test: (code) => code.includes('{name}') && !code.includes('props.name')
      }
    ]
  },
  {
    id: 5,
    title: "useState Hook",
    description: "Create a counter component with a button that increments the count when clicked",
    topic: "State",
    difficulty: "intermediate",
    initialCode: "import { useState } from 'react'\n\nfunction Counter() {\n  // Add state here\n  \n  return (\n    <div>\n      <p>Count: {/* show count here */}</p>\n      <button>Increment</button>\n    </div>\n  )\n}",
    expectedCode: "import { useState } from 'react'\n\nfunction Counter() {\n  const [count, setCount] = useState(0)\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  )\n}",
    hint: "useState returns an array with two elements: the current state value and a function to update it. Use array destructuring to name them.",
    explanation: "useState is a Hook that lets you add state to functional components. It returns the current state and a setter function.",
    testCases: [
      {
        description: "Should use useState hook",
        test: (code) => code.includes('useState')
      },
      {
        description: "Should have onClick handler",
        test: (code) => code.includes('onClick')
      },
      {
        description: "Should display count in JSX",
        test: (code) => code.includes('{count}')
      }
    ]
  },
  {
    id: 6,
    title: "Event Handling",
    description: "Create a button that shows an alert with 'Hello!' when clicked",
    topic: "Events",
    difficulty: "beginner",
    initialCode: "function AlertButton() {\n  // Add click handler here\n  \n  return <button>Click me!</button>\n}",
    expectedCode: "function AlertButton() {\n  const handleClick = () => {\n    alert('Hello!')\n  }\n  \n  return <button onClick={handleClick}>Click me!</button>\n}",
    hint: "Create a function to handle the click event, then pass it to the onClick prop of the button.",
    explanation: "Event handlers in React are functions that get called when events occur. They're passed as props to JSX elements.",
    testCases: [
      {
        description: "Should have onClick prop",
        test: (code) => code.includes('onClick')
      },
      {
        description: "Should call alert function",
        test: (code) => code.includes('alert')
      }
    ]
  },
  {
    id: 7,
    title: "Conditional Rendering",
    description: "Show 'Logged in' if user is true, otherwise show 'Please log in'",
    topic: "Conditional Rendering",
    difficulty: "intermediate",
    initialCode: "function LoginStatus({ user }) {\n  // Add conditional rendering here\n  \n}",
    expectedCode: "function LoginStatus({ user }) {\n  return (\n    <div>\n      {user ? 'Logged in' : 'Please log in'}\n    </div>\n  )\n}",
    hint: "Use the ternary operator (condition ? true : false) inside curly braces to conditionally render content.",
    explanation: "Conditional rendering allows you to show different content based on certain conditions, just like if statements in JavaScript.",
    testCases: [
      {
        description: "Should use ternary operator",
        test: (code) => code.includes('?') && code.includes(':')
      },
      {
        description: "Should check user condition",
        test: (code) => code.includes('user')
      }
    ]
  },
  {
    id: 8,
    title: "Rendering Lists",
    description: "Render a list of fruits using the map function. Each fruit should be in a <li> element.",
    topic: "Lists",
    difficulty: "intermediate",
    initialCode: "function FruitList() {\n  const fruits = ['apple', 'banana', 'orange']\n  \n  return (\n    <ul>\n      {/* map over fruits here */}\n    </ul>\n  )\n}",
    expectedCode: "function FruitList() {\n  const fruits = ['apple', 'banana', 'orange']\n  \n  return (\n    <ul>\n      {fruits.map((fruit, index) => (\n        <li key={index}>{fruit}</li>\n      ))}\n    </ul>\n  )\n}",
    hint: "Use the map function to transform each fruit into a <li> element. Don't forget to add a key prop!",
    explanation: "When rendering lists in React, use the map function to transform data into JSX elements. Each element needs a unique key prop.",
    testCases: [
      {
        description: "Should use map function",
        test: (code) => code.includes('.map(')
      },
      {
        description: "Should include key prop",
        test: (code) => code.includes('key=')
      },
      {
        description: "Should render li elements",
        test: (code) => code.includes('<li>')
      }
    ]
  },
  {
    id: 9,
    title: "Controlled Components",
    description: "Create an input field that updates state as the user types",
    topic: "Forms",
    difficulty: "intermediate",
    initialCode: "import { useState } from 'react'\n\nfunction TextInput() {\n  const [text, setText] = useState('')\n  \n  return (\n    <div>\n      <input type=\"text\" /* add props here */ />\n      <p>You typed: {text}</p>\n    </div>\n  )\n}",
    expectedCode: "import { useState } from 'react'\n\nfunction TextInput() {\n  const [text, setText] = useState('')\n  \n  return (\n    <div>\n      <input \
        type=\"text\" \
        value={text} \
        onChange={(e) => setText(e.target.value)} \
      />\n      <p>You typed: {text}</p>\n    </div>\n  )\n}",
    hint: "Controlled components have their value controlled by React state. Set the value prop and handle onChange events.",
    explanation: "Controlled components are form elements whose value is controlled by React state, giving you full control over user input.",
    testCases: [
      {
        description: "Should have value prop",
        test: (code) => code.includes('value=')
      },
      {
        description: "Should have onChange handler",
        test: (code) => code.includes('onChange')
      },
      {
        description: "Should use e.target.value",
        test: (code) => code.includes('e.target.value')
      }
    ]
  },
  {
    id: 10,
    title: "useEffect Hook",
    description: "Use useEffect to update the document title when the count changes",
    topic: "Effects",
    difficulty: "intermediate",
    initialCode: "import { useState, useEffect } from 'react'\n\nfunction TitleUpdater() {\n  const [count, setCount] = useState(0)\n  \n  // Add useEffect here\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  )\n}",
    expectedCode: "import { useState, useEffect } from 'react'\n\nfunction TitleUpdater() {\n  const [count, setCount] = useState(0)\n  \n  useEffect(() => {\n    document.title = `Count: ${count}`\n  }, [count])\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  )\n}",
    hint: "useEffect runs after the component renders. Pass count in the dependency array to run the effect when count changes.",
    explanation: "useEffect lets you perform side effects in function components. It's like componentDidMount, componentDidUpdate, and componentWillUnmount combined.",
    testCases: [
      {
        description: "Should use useEffect hook",
        test: (code) => code.includes('useEffect')
      },
      {
        description: "Should update document.title",
        test: (code) => code.includes('document.title')
      },
      {
        description: "Should have dependency array with count",
        test: (code) => code.includes('[count]')
      }
    ]
  },
  {
    id: 11,
    title: "Lifting State Up",
    description: "Move the shared state to the parent component and pass it down as props",
    topic: "State Management",
    difficulty: "advanced",
    initialCode: "function Parent() {\n  return (\n    <div>\n      <ChildA />\n      <ChildB />\n    </div>\n  )\n}\n\nfunction ChildA() {\n  const [sharedValue, setSharedValue] = useState('')\n  return <input value={sharedValue} onChange={(e) => setSharedValue(e.target.value)} />\n}\n\nfunction ChildB() {\n  const [sharedValue, setSharedValue] = useState('')\n  return <p>Shared: {sharedValue}</p>\n}",
    expectedCode: "function Parent() {\n  const [sharedValue, setSharedValue] = useState('')\n  \n  return (\n    <div>\n      <ChildA value={sharedValue} onChange={setSharedValue} />\n      <ChildB value={sharedValue} />\n    </div>\n  )\n}\n\nfunction ChildA({ value, onChange }) {\n  return <input value={value} onChange={(e) => onChange(e.target.value)} />\n}\n\nfunction ChildB({ value }) {\n  return <p>Shared: {value}</p>\n}",
    hint: "When two components need to share state, move it to their closest common parent and pass it down as props.",
    explanation: "Lifting state up is a pattern where you move state to the common parent of components that need to share it.",
    testCases: [
      {
        description: "Parent should have useState",
        test: (code) => code.includes('function Parent') && code.includes('useState')
      },
      {
        description: "Children should receive props",
        test: (code) => code.includes('ChildA({ value') && code.includes('ChildB({ value')
      }
    ]
  },
  {
    id: 12,
    title: "React Context",
    description: "Create a theme context that provides dark/light mode to child components",
    topic: "Context",
    difficulty: "advanced",
    initialCode: "import { createContext, useContext } from 'react'\n\n// Create context here\n\nfunction App() {\n  return (\n    <div>\n      <ThemeButton />\n      <ThemedText />\n    </div>\n  )\n}\n\nfunction ThemeButton() {\n  // Use context here\n  return <button>Toggle Theme</button>\n}\n\nfunction ThemedText() {\n  // Use context here  \n  return <p>This text changes with theme</p>\n}",
    expectedCode: "import { createContext, useContext, useState } from 'react'\n\nconst ThemeContext = createContext()\n\nfunction App() {\n  const [theme, setTheme] = useState('light')\n  \n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <div>\n        <ThemeButton />\n        <ThemedText />\n      </div>\n    </ThemeContext.Provider>\n  )\n}\n\nfunction ThemeButton() {\n  const { setTheme } = useContext(ThemeContext)\n  return <button onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>Toggle Theme</button>\n}\n\nfunction ThemedText() {\n  const { theme } = useContext(ThemeContext)\n  return <p style={{ color: theme === 'dark' ? 'white' : 'black' }}>This text changes with theme</p>\n}",
    hint: "Context lets you pass data through the component tree without manually passing props. Create context, provide it, then consume it with useContext.",
    explanation: "React Context provides a way to share values between components without explicitly passing props through every level of the tree.",
    testCases: [
      {
        description: "Should create context",
        test: (code) => code.includes('createContext')
      },
      {
        description: "Should use Provider",
        test: (code) => code.includes('.Provider')
      },
      {
        description: "Should use useContext",
        test: (code) => code.includes('useContext')
      }
    ]
  }
] 