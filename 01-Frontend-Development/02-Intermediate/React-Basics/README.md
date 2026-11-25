# ⚛️ React Basics - Modern React Development

> **Master React 18+ and build interactive user interfaces**

## 📚 Table of Contents

- [Getting Started](#-getting-started)
- [React 18+ Features](#-react-18-features)
- [Hooks Deep Dive](#-hooks-deep-dive)
- [Component Patterns](#-component-patterns)
- [React Router v6](#️-react-router-v6)
- [Best Practices](#-best-practices)

---

## 🚀 Getting Started

### Create a New React App

```bash
# Using Vite (Recommended - Fast!)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Using Create React App
npx create-react-app my-app
cd my-app
npm start

# Using Next.js (Full-stack framework)
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Your First Component

```jsx
// App.jsx
function App() {
    return (
        <div className="app">
            <h1>Hello, React!</h1>
            <p>Welcome to modern React development</p>
        </div>
    );
}

export default App;
```

---

## ⚡ React 18+ Features

### Concurrent Rendering

```jsx
import { useState, useTransition } from 'react';

function SearchResults() {
    const [query, setQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    
    const handleChange = (e) => {
        // High priority: Update input immediately
        setQuery(e.target.value);
        
        // Low priority: Update results (can be interrupted)
        startTransition(() => {
            // Expensive operation
            filterResults(e.target.value);
        });
    };
    
    return (
        <div>
            <input value={query} onChange={handleChange} />
            {isPending && <p>Loading...</p>}
            <ResultsList />
        </div>
    );
}
```

### Suspense for Data Fetching

```jsx
import { Suspense } from 'react';

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <UserProfile />
        </Suspense>
    );
}

// Component that fetches data
function UserProfile() {
    const user = use(fetchUser()); // React 19+
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
}
```

### Automatic Batching

```jsx
// React 18 automatically batches these updates
function handleClick() {
    setCount(c => c + 1);
    setFlag(f => !f);
    // Only one re-render!
}

// Even in promises and timeouts
setTimeout(() => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // Still only one re-render!
}, 1000);
```

---

## 🎣 Hooks Deep Dive

### useState

```jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    // Functional update (when new state depends on old)
    const increment = () => setCount(prev => prev + 1);
    
    // Lazy initialization (expensive computation)
    const [data, setData] = useState(() => {
        return computeExpensiveValue();
    });
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}
```

### useEffect

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        // Effect runs after render
        let cancelled = false;
        
        async function fetchUser() {
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();
            
            if (!cancelled) {
                setUser(data);
            }
        }
        
        fetchUser();
        
        // Cleanup function
        return () => {
            cancelled = true;
        };
    }, [userId]); // Dependencies array
    
    if (!user) return <div>Loading...</div>;
    
    return <div>{user.name}</div>;
}
```

### useContext

```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Consumer component
function ThemedButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <button 
            onClick={toggleTheme}
            className={theme === 'light' ? 'btn-light' : 'btn-dark'}
        >
            Toggle Theme
        </button>
    );
}

// Usage
function App() {
    return (
        <ThemeProvider>
            <ThemedButton />
        </ThemeProvider>
    );
}
```

### useReducer

```jsx
import { useReducer } from 'react';

// Reducer function
function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), text: action.text, done: false }];
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

function TodoList() {
    const [todos, dispatch] = useReducer(todoReducer, []);
    
    const addTodo = (text) => {
        dispatch({ type: 'ADD_TODO', text });
    };
    
    const toggleTodo = (id) => {
        dispatch({ type: 'TOGGLE_TODO', id });
    };
    
    return (
        <div>
            {todos.map(todo => (
                <div key={todo.id}>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <span>{todo.text}</span>
                </div>
            ))}
        </div>
    );
}
```

### useMemo & useCallback

```jsx
import { useMemo, useCallback, useState } from 'react';

function ExpensiveComponent({ items, onItemClick }) {
    // Memoize expensive calculation
    const sortedItems = useMemo(() => {
        console.log('Sorting items...');
        return items.sort((a, b) => a.value - b.value);
    }, [items]); // Only recalculate when items change
    
    // Memoize callback function
    const handleClick = useCallback((id) => {
        onItemClick(id);
    }, [onItemClick]);
    
    return (
        <div>
            {sortedItems.map(item => (
                <div key={item.id} onClick={() => handleClick(item.id)}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}
```

### Custom Hooks

```jsx
// useLocalStorage hook
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

// Usage
function App() {
    const [name, setName] = useLocalStorage('name', '');
    
    return (
        <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
        />
    );
}

// useFetch hook
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let cancelled = false;
        
        async function fetchData() {
            try {
                const response = await fetch(url);
                const json = await response.json();
                
                if (!cancelled) {
                    setData(json);
                    setLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                    setLoading(false);
                }
            }
        }
        
        fetchData();
        
        return () => {
            cancelled = true;
        };
    }, [url]);
    
    return { data, loading, error };
}
```

---

## 🎨 Component Patterns

### Composition

```jsx
// Container component
function Card({ children }) {
    return <div className="card">{children}</div>;
}

// Specialized components
Card.Header = ({ children }) => (
    <div className="card-header">{children}</div>
);

Card.Body = ({ children }) => (
    <div className="card-body">{children}</div>
);

Card.Footer = ({ children }) => (
    <div className="card-footer">{children}</div>
);

// Usage
function UserCard() {
    return (
        <Card>
            <Card.Header>
                <h2>John Doe</h2>
            </Card.Header>
            <Card.Body>
                <p>Software Developer</p>
            </Card.Body>
            <Card.Footer>
                <button>Contact</button>
            </Card.Footer>
        </Card>
    );
}
```

### Controlled vs Uncontrolled Components

```jsx
// Controlled (React manages state)
function ControlledInput() {
    const [value, setValue] = useState('');
    
    return (
        <input 
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

// Uncontrolled (DOM manages state)
function UncontrolledInput() {
    const inputRef = useRef();
    
    const handleSubmit = () => {
        console.log(inputRef.current.value);
    };
    
    return (
        <>
            <input ref={inputRef} defaultValue="Initial" />
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
}
```

---

## 🛣️ React Router v6

### Setup

```bash
npm install react-router-dom
```

### Basic Routing

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
```

### Navigation & Params

```jsx
import { useNavigate, useParams } from 'react-router-dom';

function UserDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>User {id}</h1>
            <button onClick={() => navigate('/users')}>
                Back to Users
            </button>
        </div>
    );
}
```

---

## ✅ Best Practices

### 1. Component Organization

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   └── Input.jsx
│   └── features/
│       ├── UserProfile/
│       │   ├── UserProfile.jsx
│       │   └── UserProfile.css
│       └── TodoList/
├── hooks/
│   ├── useAuth.js
│   └── useFetch.js
├── context/
│   └── AuthContext.jsx
└── App.jsx
```

### 2. Props Validation

```jsx
import PropTypes from 'prop-types';

function Button({ text, onClick, variant = 'primary' }) {
    return (
        <button className={`btn btn-${variant}`} onClick={onClick}>
            {text}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};
```

### 3. Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        
        return this.props.children;
    }
}

// Usage
<ErrorBoundary>
    <App />
</ErrorBoundary>
```

---

## 📚 Resources

- [React Official Docs](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)
- [React Patterns](https://reactpatterns.com/)
- [Awesome React](https://github.com/enaqx/awesome-react)

---

**Next:** Explore [State Management](../State-Management/README.md) for complex applications!
