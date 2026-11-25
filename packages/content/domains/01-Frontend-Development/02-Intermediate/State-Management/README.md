# 🔄 State Management

> **Master state management in React applications**

## 📚 Table of Contents

- [When to Use State Management](#-when-to-use-state-management)
- [Context API](#️-context-api)
- [Zustand](#-zustand)
- [Redux Toolkit](#-redux-toolkit)
- [Comparison](#-comparison)

---

## 🤔 When to Use State Management

### Local State (useState)
Use for component-specific data:
- Form inputs
- Toggle states
- Component UI state

### Global State
Use when:
- Multiple components need the same data
- Data needs to persist across routes
- Complex data sharing between distant components

---

## ⚛️ Context API

### Basic Setup

```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
export function ThemeProvider({ children }) {
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

// Custom hook
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// Usage
function App() {
    return (
        <ThemeProvider>
            <Header />
            <Main />
        </ThemeProvider>
    );
}

function Header() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme}>
            Current theme: {theme}
        </button>
    );
}
```

### Advanced Pattern with Reducer

```jsx
import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'LOGIN_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const login = async (credentials) => {
        dispatch({ type: 'LOGIN_START' });
        try {
            const user = await api.login(credentials);
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
            dispatch({ type: 'LOGIN_ERROR', payload: error.message });
        }
    };
    
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };
    
    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
```

---

## 🐻 Zustand

### Installation

```bash
npm install zustand
```

### Basic Store

```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 })
}));

// Usage in component
function Counter() {
    const { count, increment, decrement } = useStore();
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}
```

### Advanced Store with Async

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
    persist(
        (set, get) => ({
            users: [],
            loading: false,
            error: null,
            
            fetchUsers: async () => {
                set({ loading: true });
                try {
                    const response = await fetch('/api/users');
                    const users = await response.json();
                    set({ users, loading: false });
                } catch (error) {
                    set({ error: error.message, loading: false });
                }
            },
            
            addUser: (user) => set((state) => ({
                users: [...state.users, user]
            })),
            
            removeUser: (id) => set((state) => ({
                users: state.users.filter(u => u.id !== id)
            }))
        }),
        {
            name: 'user-storage' // LocalStorage key
        }
    )
);
```

### Slices Pattern

```javascript
const createUserSlice = (set) => ({
    users: [],
    addUser: (user) => set((state) => ({
        users: [...state.users, user]
    }))
});

const createTodoSlice = (set) => ({
    todos: [],
    addTodo: (todo) => set((state) => ({
        todos: [...state.todos, todo]
    }))
});

const useStore = create((...a) => ({
    ...createUserSlice(...a),
    ...createTodoSlice(...a)
}));
```

---

## 🔴 Redux Toolkit

### Installation

```bash
npm install @reduxjs/toolkit react-redux
```

### Store Setup

```javascript
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    }
});
```

### Create Slice

```javascript
// store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1; // Immer allows direct mutation
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### Async Thunks

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await fetch('/api/users');
        return response.json();
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        entities: [],
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.entities = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;
```

### Usage in Components

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/counterSlice';
import { fetchUsers } from './store/userSlice';

function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}

function UserList() {
    const { entities: users, loading } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    
    if (loading === 'pending') return <div>Loading...</div>;
    
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

---

## 📊 Comparison

| Feature | Context API | Zustand | Redux Toolkit |
|---------|-------------|---------|---------------|
| **Setup Complexity** | Simple | Very Simple | Moderate |
| **Boilerplate** | Low | Minimal | Medium |
| **Performance** | Can cause re-renders | Excellent | Excellent |
| **DevTools** | No | Yes | Yes |
| **Middleware** | No | Yes | Yes |
| **Learning Curve** | Easy | Easy | Moderate |
| **Bundle Size** | 0 (built-in) | 1KB | 8KB |
| **Best For** | Simple state | Small-Medium apps | Large apps |

### When to Use Each

**Context API:**
- ✅ Theme, language, auth state
- ✅ Small applications
- ✅ Infrequent updates
- ❌ Frequent updates
- ❌ Complex state logic

**Zustand:**
- ✅ Small to medium applications
- ✅ Simple API preference
- ✅ Minimal boilerplate
- ✅ Good performance
- ❌ Very large applications

**Redux Toolkit:**
- ✅ Large applications
- ✅ Complex state logic
- ✅ Time-travel debugging needed
- ✅ Team familiarity with Redux
- ❌ Small applications (overkill)

---

## ✅ Best Practices

### 1. Keep State Minimal
```javascript
// ❌ Bad - Derived state
const [users, setUsers] = useState([]);
const [userCount, setUserCount] = useState(0);

// ✅ Good - Compute on render
const [users, setUsers] = useState([]);
const userCount = users.length;
```

### 2. Normalize State
```javascript
// ❌ Bad - Nested arrays
const state = {
    posts: [
        { id: 1, author: { id: 1, name: 'John' }, comments: [...] }
    ]
};

// ✅ Good - Normalized
const state = {
    users: { 1: { id: 1, name: 'John' } },
    posts: { 1: { id: 1, authorId: 1, commentIds: [1, 2] } },
    comments: { 1: { id: 1, text: '...' } }
};
```

### 3. Separate Concerns
```javascript
// Separate UI state from server state
const useStore = create((set) => ({
    // UI state
    sidebarOpen: false,
    theme: 'light',
    
    // Server state (consider React Query instead)
    users: [],
    posts: []
}));
```

---

## 📚 Resources

- [Context API Docs](https://react.dev/reference/react/useContext)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query) - For server state

---

**Next:** Learn [TypeScript Integration](../TypeScript-Integration/README.md) for type-safe applications!
