export const challenges = [
  {
    id: 1,
    title: "JSX Basics",
    topic: "JSX",
    difficulty: "beginner",
    
    // Concept explanation with examples
    conceptExplanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your React components. It makes creating user interfaces intuitive and readable.",
    
    examples: [
      {
        title: "Basic JSX Element",
        code: "<h1>Hello, World!</h1>",
        explanation: "Creates a heading element"
      },
      {
        title: "JSX with Text",
        code: "<p>Welcome to React!</p>",
        explanation: "Paragraph element with text content"
      },
      {
        title: "Self-closing Tags",
        code: "<img src='logo.png' />",
        explanation: "Self-closing tags need a forward slash"
      }
    ],
    
    // Practice challenge
    description: "Now it's your turn! Create a heading element that displays 'Hello, React!'",
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
    topic: "Components",
    difficulty: "beginner",
    
    // Concept explanation with examples
    conceptExplanation: "React components are like JavaScript functions that return JSX. They are the building blocks of React applications, allowing you to split your UI into reusable pieces.",
    
    examples: [
      {
        title: "Simple Component",
        code: "function Welcome() {\n  return <h1>Hello!</h1>\n}",
        explanation: "A basic functional component that returns JSX"
      },
      {
        title: "Component with Multiple Elements",
        code: "function Card() {\n  return (\n    <div>\n      <h2>Title</h2>\n      <p>Content</p>\n    </div>\n  )\n}",
        explanation: "Components can return multiple elements wrapped in a parent"
      },
      {
        title: "Component Usage",
        code: "<Welcome />",
        explanation: "How to use a component in JSX"
      }
    ],
    
    // Practice challenge
    description: "Create a functional component called 'Greeting' that returns a welcome message",
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
    topic: "Props",
    difficulty: "beginner",
    
    // Concept explanation with examples
    conceptExplanation: "Props (short for properties) are how you pass data from parent components to child components in React. They make components dynamic and reusable by allowing different data to be passed in.",
    
    examples: [
      {
        title: "Passing Props",
        code: "<Greeting name=\"Alice\" age={25} />",
        explanation: "Pass data to components like HTML attributes"
      },
      {
        title: "Using Props in Component",
        code: "function Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>\n}",
        explanation: "Access props data using props.propertyName"
      },
      {
        title: "Multiple Props",
        code: "function UserCard(props) {\n  return (\n    <div>\n      <h2>{props.name}</h2>\n      <p>Age: {props.age}</p>\n    </div>\n  )\n}",
        explanation: "Components can receive multiple props"
      }
    ],
    
    // Practice challenge
    description: "Create a component that accepts a 'name' prop and displays 'Hello, [name]!'",
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
    topic: "Props",
    difficulty: "beginner",
    
    // Concept explanation with examples
    conceptExplanation: "Destructuring allows you to extract specific properties from props directly in the function parameters, making your code cleaner and more readable.",
    
    examples: [
      {
        title: "Without Destructuring",
        code: "function Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>\n}",
        explanation: "Using props.name - works but verbose"
      },
      {
        title: "With Destructuring",
        code: "function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>\n}",
        explanation: "Extract name directly from props - cleaner!"
      },
      {
        title: "Multiple Props Destructuring",
        code: "function UserCard({ name, age, email }) {\n  return (\n    <div>\n      <h2>{name}</h2>\n      <p>Age: {age}</p>\n      <p>Email: {email}</p>\n    </div>\n  )\n}",
        explanation: "Destructure multiple props at once"
      }
    ],
    
    // Practice challenge
    description: "Rewrite the component to use destructuring to extract the 'name' prop",
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
    topic: "State",
    difficulty: "intermediate",
    
    // Concept explanation with examples
    conceptExplanation: "The useState Hook allows functional components to have state. State is data that can change over time and causes the component to re-render when updated.",
    
    examples: [
      {
        title: "Basic useState",
        code: "const [count, setCount] = useState(0)",
        explanation: "Creates state with initial value of 0"
      },
      {
        title: "Using State in JSX",
        code: "<p>Current count: {count}</p>",
        explanation: "Display state value in your component"
      },
      {
        title: "Updating State",
        code: "setCount(count + 1)",
        explanation: "Update state using the setter function"
      },
      {
        title: "Complete Example",
        code: "function Counter() {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  )\n}",
        explanation: "A complete counter component with state"
      }
    ],
    
    // Practice challenge
    description: "Create a counter component with a button that increments the count when clicked",
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
    topic: "Events",
    difficulty: "beginner",
    
    // Concept explanation with examples
    conceptExplanation: "Event handling in React allows components to respond to user interactions like clicks, form submissions, or keyboard input. Event handlers are functions that get called when specific events occur.",
    
    examples: [
      {
        title: "Click Event Handler",
        code: "function Button() {\n  const handleClick = () => {\n    alert('Button clicked!')\n  }\n  return <button onClick={handleClick}>Click me</button>\n}",
        explanation: "Handle button clicks with onClick"
      },
      {
        title: "Inline Event Handler",
        code: "<button onClick={() => alert('Hello!')}>Click</button>",
        explanation: "You can also use inline functions"
      },
      {
        title: "Event Object",
        code: "const handleSubmit = (event) => {\n  event.preventDefault()\n  console.log('Form submitted')\n}",
        explanation: "Event handlers receive an event object"
      }
    ],
    
    // Practice challenge
    description: "Create a button that shows an alert with 'Hello!' when clicked",
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
    topic: "Conditional Rendering",
    difficulty: "intermediate",
    
    // Concept explanation with examples
    conceptExplanation: "Conditional rendering in React allows you to show different content based on certain conditions, just like if statements in JavaScript. This makes your UI dynamic and responsive to data changes.",
    
    examples: [
      {
        title: "Ternary Operator",
        code: "{isLoggedIn ? 'Welcome back!' : 'Please log in'}",
        explanation: "Use ternary operator for simple conditions"
      },
      {
        title: "Logical AND",
        code: "{isLoggedIn && <UserDashboard />}",
        explanation: "Use && to conditionally render components"
      },
      {
        title: "If Statement (outside JSX)",
        code: "function Greeting({ user }) {\n  if (user) {\n    return <h1>Hello, {user.name}!</h1>\n  }\n  return <h1>Hello, stranger!</h1>\n}",
        explanation: "Use regular if statements outside JSX return"
      }
    ],
    
    // Practice challenge
    description: "Show 'Logged in' if user is true, otherwise show 'Please log in'",
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
    topic: "Lists",
    difficulty: "intermediate",
    
    // Concept explanation with examples
    conceptExplanation: "Rendering lists in React involves using JavaScript's map() function to transform arrays of data into arrays of JSX elements. Each element in the list needs a unique 'key' prop for React's optimization.",
    
    examples: [
      {
        title: "Basic List Rendering",
        code: "const fruits = ['apple', 'banana', 'orange']\nreturn (\n  <ul>\n    {fruits.map(fruit => <li key={fruit}>{fruit}</li>)}\n  </ul>\n)",
        explanation: "Map over an array to create list items"
      },
      {
        title: "Objects in Lists",
        code: "const users = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}]\nreturn (\n  <ul>\n    {users.map(user => \n      <li key={user.id}>{user.name}</li>\n    )}\n  </ul>\n)",
        explanation: "Use object properties as keys for complex data"
      },
      {
        title: "Index as Key (last resort)",
        code: "{items.map((item, index) => \n  <li key={index}>{item}</li>\n)}",
        explanation: "Use index only when items don't have unique IDs"
      }
    ],
    
    // Practice challenge
    description: "Render a list of fruits using the map function. Each fruit should be in a <li> element.",
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
    topic: "Forms",
    difficulty: "intermediate",
    
    // Concept explanation with examples
    conceptExplanation: "Controlled components are form elements whose value is controlled by React state. This gives you full control over user input and makes form validation and submission much easier.",
    
    examples: [
      {
        title: "Controlled Input",
        code: "const [text, setText] = useState('')\nreturn (\n  <input \n    value={text} \n    onChange={(e) => setText(e.target.value)} \n  />\n)",
        explanation: "Input value is controlled by state"
      },
      {
        title: "Multiple Inputs",
        code: "const [form, setForm] = useState({name: '', email: ''})\nconst updateForm = (field, value) => {\n  setForm({...form, [field]: value})\n}",
        explanation: "Managing multiple form fields with state"
      },
      {
        title: "Form Submission",
        code: "const handleSubmit = (e) => {\n  e.preventDefault()\n  console.log('Submitted:', text)\n}",
        explanation: "Handle form submission with controlled values"
      }
    ],
    
    // Practice challenge
    description: "Create an input field that updates state as the user types",
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
    topic: "Effects",
    difficulty: "intermediate",
    
    // Concept explanation with examples
    conceptExplanation: "useEffect lets you perform side effects in functional components. It's like componentDidMount, componentDidUpdate, and componentWillUnmount combined from class components.",
    
    examples: [
      {
        title: "Effect on Every Render",
        code: "useEffect(() => {\n  console.log('Component rendered')\n})",
        explanation: "Runs after every render (no dependency array)"
      },
      {
        title: "Effect Only Once",
        code: "useEffect(() => {\n  fetchData()\n}, [])",
        explanation: "Runs only once after first render (empty dependency array)"
      },
      {
        title: "Effect When Dependencies Change",
        code: "useEffect(() => {\n  document.title = `Count: ${count}`\n}, [count])",
        explanation: "Runs when 'count' changes (dependency array with count)"
      },
      {
        title: "Cleanup Function",
        code: "useEffect(() => {\n  const timer = setInterval(() => {}, 1000)\n  return () => clearInterval(timer)\n}, [])",
        explanation: "Return cleanup function to prevent memory leaks"
      }
    ],
    
    // Practice challenge
    description: "Use useEffect to update the document title when the count changes",
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
    topic: "State Management",
    difficulty: "advanced",
    
    // Concept explanation with examples
    conceptExplanation: "Lifting state up is a pattern where you move state to the closest common parent of components that need to share it. This allows sibling components to share and synchronize state.",
    
    examples: [
      {
        title: "Problem: Separate States",
        code: "function InputA() {\n  const [value, setValue] = useState('')\n  return <input value={value} onChange={...} />\n}\nfunction DisplayB() {\n  const [value, setValue] = useState('')\n  return <p>{value}</p>\n}",
        explanation: "Components can't share state this way"
      },
      {
        title: "Solution: Lift State Up",
        code: "function Parent() {\n  const [shared, setShared] = useState('')\n  return (\n    <div>\n      <InputA value={shared} onChange={setShared} />\n      <DisplayB value={shared} />\n    </div>\n  )\n}",
        explanation: "Move state to parent and pass down as props"
      },
      {
        title: "Child Components",
        code: "function InputA({ value, onChange }) {\n  return <input value={value} onChange={(e) => onChange(e.target.value)} />\n}\nfunction DisplayB({ value }) {\n  return <p>{value}</p>\n}",
        explanation: "Children receive state and update functions as props"
      }
    ],
    
    // Practice challenge
    description: "Move the shared state to the parent component and pass it down as props",
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
    topic: "Context",
    difficulty: "advanced",
    
    // Concept explanation with examples
    conceptExplanation: "React Context provides a way to share values between components without explicitly passing props through every level of the tree. It's perfect for global data like themes, user info, or language preferences.",
    
    examples: [
      {
        title: "Create Context",
        code: "const ThemeContext = createContext()",
        explanation: "Create a context object"
      },
      {
        title: "Provide Context",
        code: "<ThemeContext.Provider value={{theme, setTheme}}>\n  <App />\n</ThemeContext.Provider>",
        explanation: "Wrap components with Provider to share data"
      },
      {
        title: "Consume Context",
        code: "function Button() {\n  const {theme, setTheme} = useContext(ThemeContext)\n  return <button onClick={() => setTheme('dark')}>{theme}</button>\n}",
        explanation: "Use useContext hook to access shared data"
      },
      {
        title: "Complete Example",
        code: "const UserContext = createContext()\n\nfunction App() {\n  const [user, setUser] = useState(null)\n  return (\n    <UserContext.Provider value={{user, setUser}}>\n      <Header />\n      <Profile />\n    </UserContext.Provider>\n  )\n}",
        explanation: "Context avoids prop drilling through many components"
      }
    ],
    
    // Practice challenge
    description: "Create a theme context that provides dark/light mode to child components",
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