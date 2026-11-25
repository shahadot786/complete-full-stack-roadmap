# ⚛️ Advanced React Patterns

> **Master advanced React patterns for scalable applications**

## Compound Components

```jsx
// Tab component with compound pattern
const TabsContext = createContext();

function Tabs({ children, defaultValue }) {
    const [activeTab, setActiveTab] = useState(defaultValue);
    
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
}

Tabs.List = function TabsList({ children }) {
    return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = function Tab({ value, children }) {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    return (
        <button
            className={activeTab === value ? 'active' : ''}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    );
};

Tabs.Panel = function TabPanel({ value, children }) {
    const { activeTab } = useContext(TabsContext);
    return activeTab === value ? <div>{children}</div> : null;
};

// Usage
<Tabs defaultValue="tab1">
    <Tabs.List>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
    <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>
```

## Render Props

```jsx
function DataFetcher({ url, render }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, [url]);
    
    return render({ data, loading });
}

// Usage
<DataFetcher
    url="/api/users"
    render={({ data, loading }) => (
        loading ? <div>Loading...</div> : <UserList users={data} />
    )}
/>
```

## Higher-Order Components (HOCs)

```jsx
function withAuth(Component) {
    return function AuthComponent(props) {
        const { user, loading } = useAuth();
        
        if (loading) return <div>Loading...</div>;
        if (!user) return <Navigate to="/login" />;
        
        return <Component {...props} user={user} />;
    };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

## Custom Hooks Patterns

```jsx
// useToggle
function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(() => setValue(v => !v), []);
    return [value, toggle];
}

// useDebounce
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    
    return debouncedValue;
}

// useLocalStorage
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
```

## Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return <ErrorFallback error={this.state.error} />;
        }
        return this.props.children;
    }
}
```

## Portal Pattern

```jsx
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
    if (!isOpen) return null;
    
    return createPortal(
        <div className="modal-overlay">
            <div className="modal">{children}</div>
        </div>,
        document.body
    );
}
```

## Resources

- [React Patterns](https://reactpatterns.com/)
