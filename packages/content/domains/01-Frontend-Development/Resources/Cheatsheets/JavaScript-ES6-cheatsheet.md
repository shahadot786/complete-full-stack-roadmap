# 📝 JavaScript ES6+ Cheat Sheet

## Variables

```javascript
const name = 'John';        // Constant (cannot reassign)
let age = 30;               // Variable (can reassign)
var old = 'avoid';          // Old way (avoid)
```

## Arrow Functions

```javascript
const add = (a, b) => a + b;
const double = x => x * 2;
const greet = () => 'Hello!';
```

## Destructuring

```javascript
// Object
const { name, age } = user;
const { name: userName } = user;  // Rename

// Array
const [first, second] = array;
const [head, ...tail] = array;    // Rest
```

## Spread & Rest

```javascript
// Spread
const arr = [...arr1, ...arr2];
const obj = { ...obj1, ...obj2 };

// Rest
function sum(...numbers) { }
```

## Template Literals

```javascript
const message = `Hello, ${name}!`;
const html = `
    <div>
        <h1>${title}</h1>
    </div>
`;
```

## Array Methods

```javascript
arr.map(x => x * 2)              // Transform
arr.filter(x => x > 5)           // Filter
arr.reduce((sum, x) => sum + x)  // Reduce
arr.find(x => x.id === 1)        // Find first
arr.some(x => x > 5)             // Any match
arr.every(x => x > 0)            // All match
arr.includes(5)                  // Contains
```

## Promises & Async/Await

```javascript
// Promise
fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

// Async/Await
async function getData() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}
```

## Object Shortcuts

```javascript
const name = 'John';
const age = 30;

// Shorthand properties
const user = { name, age };

// Shorthand methods
const obj = {
    greet() { return 'Hello'; }
};

// Computed properties
const key = 'name';
const obj = { [key]: 'John' };
```

## Optional Chaining & Nullish Coalescing

```javascript
// Optional chaining
const city = user?.address?.city;

// Nullish coalescing
const value = input ?? 'default';
```

## Modules

```javascript
// Export
export const name = 'John';
export default function() { }

// Import
import { name } from './module';
import MyFunc from './module';
import * as utils from './utils';
```

## Classes

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    
    greet() {
        return `Hello, ${this.name}`;
    }
}

class Student extends Person {
    constructor(name, grade) {
        super(name);
        this.grade = grade;
    }
}
```
