# ⚛️ React Cheat Sheet

## Component Basics

```jsx
// Function Component
function Welcome({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// With Props
<Welcome name="John" />
```

## Hooks

### useState

```jsx
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: 'John' });

// Update
setCount(count + 1);
setCount(prev => prev + 1);  // Functional update
```

### useEffect

```jsx
// Run once on mount
useEffect(() => {
    // Code here
}, []);

// Run when deps change
useEffect(() => {
    // Code here
}, [dep1, dep2]);

// Cleanup
useEffect(() => {
    return () => {
        // Cleanup code
    };
}, []);
```

### useContext

```jsx
const ThemeContext = createContext();

// Provider
<ThemeContext.Provider value={theme}>
    {children}
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext);
```

### useReducer

```jsx
const [state, dispatch] = useReducer(reducer, initialState);

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        default:
            return state;
    }
}

dispatch({ type: 'INCREMENT' });
```

### useMemo & useCallback

```jsx
// Memoize value
const value = useMemo(() => expensive(a, b), [a, b]);

// Memoize function
const callback = useCallback(() => {
    doSomething(a, b);
}, [a, b]);
```

### useRef

```jsx
const inputRef = useRef(null);

// Access DOM
inputRef.current.focus();

// Persist value
const countRef = useRef(0);
countRef.current++;
```

## Event Handling

```jsx
<button onClick={handleClick}>Click</button>
<input onChange={(e) => setValue(e.target.value)} />
<form onSubmit={handleSubmit}>
```

## Conditional Rendering

```jsx
{condition && <Component />}
{condition ? <A /> : <B />}
{items.map(item => <Item key={item.id} {...item} />)}
```

## Lists & Keys

```jsx
{items.map(item => (
    <div key={item.id}>
        {item.name}
    </div>
))}
```

## Forms

```jsx
const [value, setValue] = useState('');

<input 
    value={value}
    onChange={(e) => setValue(e.target.value)}
/>
```

## React Router

```jsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<User />} />
    </Routes>
</BrowserRouter>

// Navigation
const navigate = useNavigate();
navigate('/home');

// Params
const { id } = useParams();
```

## Performance

```jsx
// Memoize component
const MemoComponent = memo(Component);

// Lazy loading
const Component = lazy(() => import('./Component'));

<Suspense fallback={<Loading />}>
    <Component />
</Suspense>
```
