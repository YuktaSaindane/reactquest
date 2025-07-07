import { Level } from '@/types';

export const levels: Level[] = [
  {
    id: 'jsx-basics',
    title: 'JSX Fundamentals',
    description: 'Master the basics of JSX syntax and React elements',
    topic: 'JSX',
    difficulty: 'beginner',
    isUnlocked: true,
    isCompleted: false,
    xpReward: 100,
    concept: {
      title: 'JSX - JavaScript XML',
      explanation: 'JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript. It\'s the foundation of React components and makes creating user interfaces intuitive and declarative.',
      codeExamples: [
        {
          title: 'Basic JSX Element',
          code: `const element = <h1>Hello, ReactQuest!</h1>;`,
          language: 'jsx',
          explanation: 'JSX elements look like HTML but are actually JavaScript expressions.'
        },
        {
          title: 'JSX with JavaScript Expressions',
          code: `const name = 'Developer';
const greeting = <h1>Welcome, {name}!</h1>;`,
          language: 'jsx',
          explanation: 'Use curly braces {} to embed JavaScript expressions in JSX.'
        },
        {
          title: 'JSX Attributes',
          code: `const button = (
  <button 
    className="primary-btn" 
    onClick={handleClick}
  >
    Click me!
  </button>
);`,
          language: 'jsx',
          explanation: 'JSX attributes use camelCase and some have different names (className instead of class).'
        }
      ],
      keyPoints: [
        'JSX must return a single parent element',
        'Use className instead of class',
        'Self-closing tags must end with />',
        'JavaScript expressions go inside curly braces {}',
        'JSX is compiled to React.createElement() calls'
      ]
    },
    quiz: {
      questions: [
        {
          id: 'jsx-q1',
          question: 'Which of the following is the correct way to embed a JavaScript variable in JSX?',
          options: [
            '<h1>Hello (name)</h1>',
            '<h1>Hello {name}</h1>',
            '<h1>Hello ${name}</h1>',
            '<h1>Hello [[name]]</h1>'
          ],
          correctAnswer: 1,
          explanation: 'JavaScript expressions in JSX must be wrapped in curly braces {}.',
          difficulty: 'easy'
        },
        {
          id: 'jsx-q2',
          question: 'What will happen if you try to return multiple elements without a wrapper in JSX?',
          options: [
            'It will work fine',
            'It will cause a compilation error',
            'It will only render the first element',
            'It will render all elements side by side'
          ],
          correctAnswer: 1,
          explanation: 'JSX expressions must have exactly one parent element. Use React.Fragment or <></> for multiple elements.',
          difficulty: 'medium'
        },
        {
          id: 'jsx-q3',
          question: 'Which attribute should you use to add CSS classes to a JSX element?',
          options: [
            'class',
            'className',
            'cssClass',
            'classList'
          ],
          correctAnswer: 1,
          explanation: 'In JSX, use className instead of class because class is a reserved word in JavaScript.',
          difficulty: 'easy'
        }
      ]
    },
    codingChallenge: {
      id: 'jsx-challenge',
      title: 'Create a Welcome Component',
      description: 'Build a React component that displays a personalized welcome message',
      instructions: 'Create a functional component called Welcome that takes a name prop and displays "Welcome to ReactQuest, [name]!" in an h1 element with the className "welcome-title".',
      startingCode: `function Welcome() {
  // Your code here
  
}

export default Welcome;`,
      solution: `function Welcome({ name }) {
  return (
    <h1 className="welcome-title">
      Welcome to ReactQuest, {name}!
    </h1>
  );
}

export default Welcome;`,
      testCases: [
        {
          input: { name: 'Alice' },
          expectedOutput: '<h1 class="welcome-title">Welcome to ReactQuest, Alice!</h1>',
          description: 'Should render welcome message with name'
        },
        {
          input: { name: 'Bob' },
          expectedOutput: '<h1 class="welcome-title">Welcome to ReactQuest, Bob!</h1>',
          description: 'Should work with different names'
        }
      ],
      hints: [
        'Remember to destructure the name prop',
        'Use curly braces to embed the name variable',
        'Don\'t forget the className attribute'
      ]
    }
  },
  {
    id: 'props-composition',
    title: 'Props & Component Composition',
    description: 'Learn how to pass data between components using props',
    topic: 'Props',
    difficulty: 'beginner',
    isUnlocked: false,
    isCompleted: false,
    xpReward: 150,
    concept: {
      title: 'Props - Component Communication',
      explanation: 'Props (short for properties) are how you pass data from parent components to child components. They make components reusable and enable component composition.',
      codeExamples: [
        {
          title: 'Passing Props',
          code: `function App() {
  return (
    <UserCard 
      name="John Doe" 
      email="john@example.com" 
      isOnline={true} 
    />
  );
}`,
          language: 'jsx',
          explanation: 'Props are passed as attributes to components and can be strings, numbers, booleans, objects, or functions.'
        },
        {
          title: 'Receiving Props',
          code: `function UserCard({ name, email, isOnline }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  );
}`,
          language: 'jsx',
          explanation: 'Destructure props in the function parameter for cleaner code.'
        },
        {
          title: 'Default Props',
          code: `function Button({ text = 'Click me', variant = 'primary' }) {
  return (
    <button className={variant}>
      {text}
    </button>
  );
}`,
          language: 'jsx',
          explanation: 'Use default parameters to provide fallback values for props.'
        }
      ],
      keyPoints: [
        'Props are read-only and should never be modified',
        'Props can be any JavaScript value',
        'Use destructuring for cleaner prop access',
        'Provide default values for optional props',
        'Props enable component reusability and composition'
      ]
    },
    quiz: {
      questions: [
        {
          id: 'props-q1',
          question: 'How should you access a prop named "title" in a functional component?',
          options: [
            'this.props.title',
            'props.title',
            'Destructure it: function MyComponent({ title })',
            'Both B and C are correct'
          ],
          correctAnswer: 3,
          explanation: 'In functional components, you can either use props.title or destructure the prop in the parameter.',
          difficulty: 'easy'
        },
        {
          id: 'props-q2',
          question: 'What happens if you try to modify props inside a component?',
          options: [
            'It works fine',
            'React will throw an error',
            'The change will be reflected in the parent',
            'Nothing happens, props are immutable'
          ],
          correctAnswer: 1,
          explanation: 'Props are read-only. Attempting to modify them will result in an error.',
          difficulty: 'medium'
        },
        {
          id: 'props-q3',
          question: 'Which is the best way to provide default values for props in functional components?',
          options: [
            'Using defaultProps',
            'Using default parameters',
            'Checking if prop exists with if statement',
            'Using the || operator'
          ],
          correctAnswer: 1,
          explanation: 'Default parameters in the function signature are the modern and cleanest approach.',
          difficulty: 'medium'
        }
      ]
    },
    codingChallenge: {
      id: 'props-challenge',
      title: 'Create a Product Card Component',
      description: 'Build a reusable product card that displays product information',
      instructions: 'Create a ProductCard component that receives name, price, and isOnSale props. Display the name in an h3, price in a span with class "price", and show "ON SALE!" in red if isOnSale is true.',
      startingCode: `function ProductCard() {
  // Your code here
  
}

export default ProductCard;`,
      solution: `function ProductCard({ name, price, isOnSale = false }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <span className="price">${price}</span>
      {isOnSale && <span style={{color: 'red'}}>ON SALE!</span>}
    </div>
  );
}

export default ProductCard;`,
      testCases: [
        {
          input: { name: 'Laptop', price: 999, isOnSale: true },
          expectedOutput: 'Should show laptop with sale indicator',
          description: 'Product on sale should show sale indicator'
        },
        {
          input: { name: 'Mouse', price: 29, isOnSale: false },
          expectedOutput: 'Should show mouse without sale indicator',
          description: 'Product not on sale should not show sale indicator'
        }
      ],
      hints: [
        'Use destructuring with a default value for isOnSale',
        'Use conditional rendering for the sale indicator',
        'Remember to wrap the price with a $ sign'
      ]
    }
  },
  {
    id: 'state-management',
    title: 'State Management with useState',
    description: 'Master React state management and component re-rendering',
    topic: 'State',
    difficulty: 'intermediate',
    isUnlocked: false,
    isCompleted: false,
    xpReward: 200,
    concept: {
      title: 'useState Hook - Managing Component State',
      explanation: 'State allows components to store and manage data that can change over time. When state changes, React re-renders the component to reflect the new data.',
      codeExamples: [
        {
          title: 'Basic useState',
          code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
          language: 'jsx',
          explanation: 'useState returns an array with the current state value and a setter function.'
        },
        {
          title: 'State with Objects',
          code: `const [user, setUser] = useState({
  name: '',
  email: '',
  age: 0
});

const updateUser = (field, value) => {
  setUser(prevUser => ({
    ...prevUser,
    [field]: value
  }));
};`,
          language: 'jsx',
          explanation: 'When updating object state, always create a new object to ensure React detects the change.'
        },
        {
          title: 'Functional State Updates',
          code: `const [count, setCount] = useState(0);

const handleMultipleUpdates = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};`,
          language: 'jsx',
          explanation: 'Use functional updates when the new state depends on the previous state.'
        }
      ],
      keyPoints: [
        'State is local to the component instance',
        'setState triggers a re-render',
        'State updates are asynchronous',
        'Always treat state as immutable',
        'Use functional updates when new state depends on previous state'
      ]
    },
    quiz: {
      questions: [
        {
          id: 'state-q1',
          question: 'What does useState return?',
          options: [
            'Just the current state value',
            'Just the setter function',
            'An array with [currentState, setterFunction]',
            'An object with {value, setValue}'
          ],
          correctAnswer: 2,
          explanation: 'useState returns an array where the first element is the current state and the second is the setter function.',
          difficulty: 'easy'
        },
        {
          id: 'state-q2',
          question: 'Why should you use functional updates when the new state depends on the previous state?',
          options: [
            'It\'s faster',
            'It looks cleaner',
            'State updates are batched and async',
            'It\'s required by React'
          ],
          correctAnswer: 2,
          explanation: 'React batches state updates, so using the previous value directly might not give you the latest state.',
          difficulty: 'medium'
        },
        {
          id: 'state-q3',
          question: 'When updating an object in state, what should you do?',
          options: [
            'Mutate the existing object',
            'Create a new object with spread operator',
            'Use Object.assign()',
            'Both B and C are correct'
          ],
          correctAnswer: 3,
          explanation: 'You should create a new object to ensure React detects the change. Both spread operator and Object.assign() work.',
          difficulty: 'medium'
        }
      ]
    },
    codingChallenge: {
      id: 'state-challenge',
      title: 'Build a Todo App',
      description: 'Create a simple todo app with add and toggle functionality',
      instructions: 'Build a TodoApp component that manages a list of todos. Each todo should have an id, text, and completed status. Include an input to add new todos and ability to toggle completion.',
      startingCode: `import { useState } from 'react';

function TodoApp() {
  // Your code here
  
}

export default TodoApp;`,
      solution: `import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: inputText,
        completed: false
      }]);
      setInputText('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a todo..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;`,
      testCases: [
        {
          input: 'Add "Buy milk" todo',
          expectedOutput: 'Should add todo to list',
          description: 'Adding todos should work correctly'
        },
        {
          input: 'Toggle todo completion',
          expectedOutput: 'Should toggle completed status',
          description: 'Clicking todos should toggle completion'
        }
      ],
      hints: [
        'Use an array of objects for todos state',
        'Each todo needs a unique id (use Date.now())',
        'Use map() to update specific todos',
        'Don\'t forget to clear input after adding'
      ]
    }
  },
  {
    id: 'event-handling',
    title: 'Event Handling',
    description: 'Master React event handling patterns and best practices',
    topic: 'Events',
    difficulty: 'beginner',
    isUnlocked: false,
    isCompleted: false,
    xpReward: 120,
    concept: {
      title: 'React Event Handling',
      explanation: 'React uses SyntheticEvents to provide consistent event handling across browsers. Learn how to handle user interactions effectively.',
      codeExamples: [
        {
          title: 'Basic Event Handling',
          code: `function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}`,
          language: 'jsx',
          explanation: 'Event handlers receive a SyntheticEvent object with useful methods like preventDefault().'
        },
        {
          title: 'Form Events',
          code: `function LoginForm() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}`,
          language: 'jsx',
          explanation: 'Form events allow you to capture user input and handle form submissions.'
        }
      ],
      keyPoints: [
        'React events are SyntheticEvents, not native DOM events',
        'Event handlers receive the event object as first parameter',
        'Use e.preventDefault() to prevent default browser behavior',
        'Event handlers should be functions, not function calls',
        'Pass parameters using arrow functions or bind'
      ]
    },
    quiz: {
      questions: [
        {
          id: 'events-q1',
          question: 'How do you prevent the default behavior of an event in React?',
          options: [
            'return false',
            'e.stopPropagation()',
            'e.preventDefault()',
            'event.cancel()'
          ],
          correctAnswer: 2,
          explanation: 'Use e.preventDefault() to prevent the default browser behavior.',
          difficulty: 'easy'
        },
        {
          id: 'events-q2',
          question: 'What is a SyntheticEvent in React?',
          options: [
            'A fake event for testing',
            'React\'s cross-browser event wrapper',
            'An event that doesn\'t bubble',
            'A custom event type'
          ],
          correctAnswer: 1,
          explanation: 'SyntheticEvent is React\'s wrapper around native events for cross-browser compatibility.',
          difficulty: 'medium'
        }
      ]
    },
    codingChallenge: {
      id: 'events-challenge',
      title: 'Interactive Form',
      description: 'Create a form with validation and event handling',
      instructions: 'Build a ContactForm with name and email inputs. Show validation errors and handle form submission.',
      startingCode: `import { useState } from 'react';

function ContactForm() {
  // Your code here
  
}

export default ContactForm;`,
      solution: `import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
      </div>
      <div>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;`,
      testCases: [
        {
          input: 'Valid form data',
          expectedOutput: 'Should submit successfully',
          description: 'Valid form should submit without errors'
        },
        {
          input: 'Empty form',
          expectedOutput: 'Should show validation errors',
          description: 'Empty form should show validation errors'
        }
      ],
      hints: [
        'Use object destructuring in handleChange',
        'Validate on form submission',
        'Clear errors when user starts typing',
        'Use preventDefault() to handle form submission'
      ]
    }
  }
];

// Helper function to unlock next level
export function unlockNextLevel(completedLevelId: string): void {
  const currentIndex = levels.findIndex(level => level.id === completedLevelId);
  if (currentIndex !== -1 && currentIndex < levels.length - 1) {
    levels[currentIndex + 1].isUnlocked = true;
  }
}

export function getLevelById(id: string): Level | undefined {
  return levels.find(level => level.id === id);
}

export function getUnlockedLevels(): Level[] {
  return levels.filter(level => level.isUnlocked);
}

export function getCompletedLevels(): Level[] {
  return levels.filter(level => level.isCompleted);
} 