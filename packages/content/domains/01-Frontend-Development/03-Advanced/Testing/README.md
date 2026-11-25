# 🧪 Testing React Applications

> **Write tests to ensure code quality and prevent bugs**

## Testing Tools

- **Jest** - Test runner and assertion library
- **React Testing Library** - Test React components
- **Vitest** - Fast Vite-native test runner
- **Playwright/Cypress** - End-to-end testing

## Setup

```bash
# Vite + Vitest
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Jest (CRA includes this)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## Unit Testing

### Basic Component Test

```jsx
// Button.jsx
export function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}

// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing Hooks

```jsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
        result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
});
```

### Async Testing

```jsx
import { render, screen, waitFor } from '@testing-library/react';

test('loads and displays user', async () => {
    render(<UserProfile userId={1} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
});
```

## E2E Testing with Playwright

```javascript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
});
```

## Best Practices

1. **Test behavior, not implementation**
2. **Use data-testid sparingly**
3. **Mock external dependencies**
4. **Keep tests simple and focused**
5. **Aim for 70-80% coverage**

## Resources

- [React Testing Library](https://testing-library.com/react)
- [Jest Docs](https://jestjs.io/)
- [Playwright Docs](https://playwright.dev/)
