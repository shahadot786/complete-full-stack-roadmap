# 💻 JavaScript Fundamentals (ES6+)

> **Master modern JavaScript to build interactive web applications**

## 📚 Table of Contents

- [ES6+ Features](#-es6-features)
- [Async JavaScript](#️-async-javascript)
- [DOM Manipulation](#-dom-manipulation)
- [Browser APIs](#-browser-apis)
- [Best Practices](#-best-practices)
- [Resources](#-resources)

---

## 🚀 ES6+ Features

### Variables: let, const, var

```javascript
// ❌ Avoid var (function-scoped, hoisted)
var oldWay = 'avoid this';

// ✅ Use const for values that won't change
const API_URL = 'https://api.example.com';
const user = { name: 'John' }; // Object reference is constant

// ✅ Use let for values that will change
let count = 0;
count++;
```

### Arrow Functions

```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter (parentheses optional)
const double = x => x * 2;

// With multiple lines
const processUser = (user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return { ...user, fullName };
};

// Arrow functions don't have their own 'this'
class Counter {
    constructor() {
        this.count = 0;
    }
    
    increment() {
        // ✅ Arrow function inherits 'this' from Counter
        setTimeout(() => {
            this.count++;
        }, 1000);
    }
}
```

### Destructuring

```javascript
// Object destructuring
const user = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
};

const { name, age } = user;
console.log(name); // 'John Doe'

// With renaming
const { name: userName, age: userAge } = user;

// With default values
const { role = 'user' } = user;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [primary, secondary] = colors;

// Skip elements
const [first, , third] = colors;

// Rest operator
const [head, ...tail] = colors;
console.log(tail); // ['green', 'blue']
```

### Spread & Rest Operators

```javascript
// Spread operator (...)
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Objects
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { lang: 'es', fontSize: 14 };
const settings = { ...defaults, ...userPrefs };
// { theme: 'light', lang: 'es', fontSize: 14 }

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4); // 10
```

### Template Literals

```javascript
const name = 'John';
const age = 30;

// ✅ Template literals
const greeting = `Hello, ${name}! You are ${age} years old.`;

// Multi-line strings
const html = `
    <div class="card">
        <h2>${name}</h2>
        <p>Age: ${age}</p>
    </div>
`;

// Expression evaluation
const price = 19.99;
const message = `Total: $${(price * 1.1).toFixed(2)}`;
```

### Enhanced Object Literals

```javascript
const name = 'John';
const age = 30;

// Shorthand property names
const user = { name, age };

// Shorthand method names
const calculator = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    }
};

// Computed property names
const key = 'dynamicKey';
const obj = {
    [key]: 'value',
    [`${key}2`]: 'value2'
};
```

### Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - Transform each element
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - Keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce - Reduce to single value
const sum = numbers.reduce((total, n) => total + n, 0);
// 15

// find - Find first matching element
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
];
const user = users.find(u => u.id === 2);

// some - Check if any element passes test
const hasEven = numbers.some(n => n % 2 === 0); // true

// every - Check if all elements pass test
const allPositive = numbers.every(n => n > 0); // true

// includes - Check if array contains value
const hasThree = numbers.includes(3); // true
```

---

## ⏱️ Async JavaScript

### Promises

```javascript
// Creating a Promise
const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: 'John Doe' });
            } else {
                reject(new Error('Invalid ID'));
            }
        }, 1000);
    });
};

// Using Promises
fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error))
    .finally(() => console.log('Done'));

// Chaining Promises
fetchUser(1)
    .then(user => {
        console.log(user);
        return fetchUser(2);
    })
    .then(user2 => console.log(user2))
    .catch(error => console.error(error));
```

### Async/Await

```javascript
// ✅ Modern async/await syntax
async function getUser(id) {
    try {
        const user = await fetchUser(id);
        console.log(user);
        return user;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Parallel requests
async function getMultipleUsers() {
    try {
        // ❌ Sequential (slow)
        const user1 = await fetchUser(1);
        const user2 = await fetchUser(2);
        
        // ✅ Parallel (fast)
        const [user1, user2] = await Promise.all([
            fetchUser(1),
            fetchUser(2)
        ]);
        
        return [user1, user2];
    } catch (error) {
        console.error(error);
    }
}

// Error handling with async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed:', error);
        return null;
    }
}
```

### Fetch API

```javascript
// GET request
async function getUsers() {
    const response = await fetch('https://api.example.com/users');
    const users = await response.json();
    return users;
}

// POST request
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    const newUser = await response.json();
    return newUser;
}

// With error handling
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError') {
            console.error('Network error:', error);
        } else {
            console.error('Fetch error:', error);
        }
        throw error;
    }
}
```

---

## 🎯 DOM Manipulation

### Selecting Elements

```javascript
// Modern selectors
const element = document.querySelector('.my-class');
const elements = document.querySelectorAll('.my-class');

// By ID
const header = document.getElementById('header');

// By class
const buttons = document.getElementsByClassName('btn');

// By tag
const paragraphs = document.getElementsByTagName('p');
```

### Creating & Modifying Elements

```javascript
// Create element
const div = document.createElement('div');
div.className = 'card';
div.id = 'user-card';

// Set content
div.textContent = 'Hello World'; // Text only
div.innerHTML = '<h2>Title</h2><p>Content</p>'; // HTML

// Set attributes
div.setAttribute('data-id', '123');
div.dataset.userId = '123'; // Same as above

// Add to DOM
document.body.appendChild(div);
document.body.insertBefore(div, document.body.firstChild);

// Remove from DOM
div.remove();
```

### Event Handling

```javascript
// Add event listener
const button = document.querySelector('#myButton');

button.addEventListener('click', (event) => {
    console.log('Button clicked!');
    console.log('Event:', event);
});

// Event delegation (for dynamic elements)
document.addEventListener('click', (event) => {
    if (event.target.matches('.dynamic-button')) {
        console.log('Dynamic button clicked!');
    }
});

// Remove event listener
function handleClick(event) {
    console.log('Clicked!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// Common events
element.addEventListener('click', handler);
element.addEventListener('submit', handler);
element.addEventListener('input', handler);
element.addEventListener('change', handler);
element.addEventListener('keydown', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
```

### Class Manipulation

```javascript
const element = document.querySelector('.box');

// Add class
element.classList.add('active');

// Remove class
element.classList.remove('active');

// Toggle class
element.classList.toggle('active');

// Check if has class
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Replace class
element.classList.replace('old-class', 'new-class');
```

### Style Manipulation

```javascript
const element = document.querySelector('.box');

// Individual styles
element.style.backgroundColor = '#3b82f6';
element.style.padding = '1rem';
element.style.display = 'none';

// Multiple styles
Object.assign(element.style, {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem',
    borderRadius: '8px'
});

// Get computed styles
const styles = window.getComputedStyle(element);
console.log(styles.backgroundColor);
```

---

## 🌐 Browser APIs

### LocalStorage

```javascript
// Save data
localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }));

// Get data
const user = JSON.parse(localStorage.getItem('user'));

// Remove item
localStorage.removeItem('user');

// Clear all
localStorage.clear();

// Check if key exists
if (localStorage.getItem('user')) {
    console.log('User data exists');
}
```

### SessionStorage

```javascript
// Same API as localStorage, but data persists only for the session
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');
```

### Geolocation API

```javascript
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log('Latitude:', position.coords.latitude);
            console.log('Longitude:', position.coords.longitude);
        },
        (error) => {
            console.error('Error:', error.message);
        }
    );
}
```

### Intersection Observer

```javascript
// Lazy loading images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));
```

---

## ✅ Best Practices

### 1. Use Strict Mode

```javascript
'use strict';

// Prevents common mistakes
x = 10; // Error: x is not defined
```

### 2. Avoid Global Variables

```javascript
// ❌ Bad
var globalVar = 'avoid this';

// ✅ Good - Use modules or IIFE
(function() {
    const localVar = 'scoped';
})();
```

### 3. Error Handling

```javascript
// Always handle errors
async function fetchData() {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error appropriately
        return null;
    }
}
```

### 4. Use Optional Chaining

```javascript
// ❌ Old way
const city = user && user.address && user.address.city;

// ✅ New way
const city = user?.address?.city;
```

### 5. Nullish Coalescing

```javascript
// ❌ Falsy values (0, '', false) treated as null
const value = input || 'default';

// ✅ Only null/undefined treated as null
const value = input ?? 'default';
```

---

## 📚 Resources

### Official Documentation
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [ECMAScript Specification](https://tc39.es/ecma262/)

### Interactive Learning
- [freeCodeCamp](https://www.freecodecamp.org/)
- [JavaScript30](https://javascript30.com/)
- [Exercism JavaScript Track](https://exercism.org/tracks/javascript)

### Books
- "You Don't Know JS" by Kyle Simpson (free online)
- "Eloquent JavaScript" by Marijn Haverbeke (free online)
- "JavaScript: The Good Parts" by Douglas Crockford

### Tools
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Babel](https://babeljs.io/) - JavaScript compiler
- [ESLint](https://eslint.org/) - Code linter

---

## 🎯 Practice Exercises

1. **Array Manipulation** - Filter, map, and reduce operations
2. **Async Data Fetching** - Fetch data from an API
3. **DOM Todo List** - Create, read, update, delete items
4. **Local Storage App** - Persist data across sessions
5. **Form Validation** - Validate user input

---

## ✅ Checklist

- [ ] Understand ES6+ syntax (let, const, arrow functions)
- [ ] Master array methods (map, filter, reduce)
- [ ] Work with Promises and async/await
- [ ] Manipulate the DOM effectively
- [ ] Use browser APIs (localStorage, fetch, etc.)
- [ ] Handle errors properly
- [ ] Write clean, maintainable code
- [ ] Practice with real projects

---

**Next Steps:** Learn [Responsive Design](../Responsive-Design/README.md) to make your applications work on all devices!
