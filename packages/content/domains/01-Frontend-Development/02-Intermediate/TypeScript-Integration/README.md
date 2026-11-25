# 📘 TypeScript for React

> **Add type safety to your React applications**

## Why TypeScript?

- ✅ Catch errors at compile time
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring
- ✅ Better team collaboration

## Setup

```bash
# Create new React + TypeScript project
npm create vite@latest my-app -- --template react-ts

# Add TypeScript to existing project
npm install --save-dev typescript @types/react @types/react-dom
```

## Basic Types

```typescript
// Primitives
const name: string = 'John';
const age: number = 30;
const isActive: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ['John', 'Jane'];

// Objects
const user: { name: string; age: number } = {
    name: 'John',
    age: 30
};

// Functions
function greet(name: string): string {
    return `Hello, ${name}`;
}

const add = (a: number, b: number): number => a + b;
```

## React with TypeScript

### Function Components

```typescript
interface Props {
    name: string;
    age?: number; // Optional
    onUpdate: (name: string) => void;
}

function UserCard({ name, age = 18, onUpdate }: Props) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <button onClick={() => onUpdate(name)}>Update</button>
        </div>
    );
}
```

### useState

```typescript
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);
```

### useRef

```typescript
const inputRef = useRef<HTMLInputElement>(null);

function focusInput() {
    inputRef.current?.focus();
}
```

### Custom Hooks

```typescript
function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);
    
    return { data, loading, error };
}

// Usage
interface User {
    id: number;
    name: string;
}

const { data, loading } = useFetch<User>('/api/user');
```

## Common Patterns

### Event Handlers

```typescript
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget);
}

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
}
```

### Children Props

```typescript
interface Props {
    children: React.ReactNode;
}

function Container({ children }: Props) {
    return <div>{children}</div>;
}
```

### Generic Components

```typescript
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
    return <ul>{items.map(renderItem)}</ul>;
}
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
