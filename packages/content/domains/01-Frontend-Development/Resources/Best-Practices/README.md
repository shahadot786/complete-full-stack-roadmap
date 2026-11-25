# 💡 Frontend Best Practices

## Code Organization

### Component Structure
```
components/
├── common/          # Reusable UI components
│   ├── Button/
│   ├── Input/
│   └── Modal/
├── features/        # Feature-specific components
│   ├── Auth/
│   ├── Dashboard/
│   └── Profile/
└── layouts/         # Layout components
    ├── Header.jsx
    └── Footer.jsx
```

### File Naming
- Components: `PascalCase.jsx`
- Utilities: `camelCase.js`
- Constants: `UPPER_SNAKE_CASE.js`
- Styles: `kebab-case.css`

## Performance

### 1. Code Splitting
```jsx
const LazyComponent = lazy(() => import('./Component'));
```

### 2. Memoization
```jsx
const MemoComponent = memo(Component);
const value = useMemo(() => expensive(a, b), [a, b]);
const callback = useCallback(() => {}, []);
```

### 3. Virtual Lists
Use `react-window` for long lists

### 4. Image Optimization
- Use WebP format
- Lazy load images
- Responsive images with srcset

## Security

### 1. XSS Prevention
```jsx
// ❌ Dangerous
<div dangerouslySetInnerHTML={{__html: userInput}} />

// ✅ Safe
<div>{userInput}</div>
```

### 2. HTTPS Only
Always use HTTPS in production

### 3. Environment Variables
Never commit secrets to Git

## Accessibility

### 1. Semantic HTML
```jsx
<nav>, <main>, <article>, <section>
```

### 2. ARIA Labels
```jsx
<button aria-label="Close modal">×</button>
```

### 3. Keyboard Navigation
Test with Tab, Enter, Escape keys

### 4. Color Contrast
Minimum 4.5:1 ratio for text

## SEO

### 1. Meta Tags
```html
<meta name="description" content="...">
<meta property="og:title" content="...">
```

### 2. Semantic HTML
Use proper heading hierarchy (h1 → h6)

### 3. Alt Text
Always provide alt text for images

## Git Workflow

### Commit Messages
```
feat: add user authentication
fix: resolve login bug
docs: update README
style: format code
refactor: simplify user service
test: add login tests
```

### Branch Naming
```
feature/user-auth
bugfix/login-error
hotfix/security-patch
```

## Resources

- [Web.dev Best Practices](https://web.dev/learn)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
