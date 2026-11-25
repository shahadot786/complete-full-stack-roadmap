# 🟢 Node.js Fundamentals

> **Learn server-side JavaScript with Node.js**

## What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server.

## Setup

```bash
# Install Node.js (use nvm for version management)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts

# Verify installation
node --version
npm --version
```

## Node.js Basics

### Creating Your First Server

```javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Node.js!');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

### File System Operations

```javascript
const fs = require('fs');

// Read file
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Write file
fs.writeFile('output.txt', 'Hello World', (err) => {
    if (err) throw err;
    console.log('File written!');
});

// Async/await version
const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

## Express.js Basics

### Installation

```bash
npm init -y
npm install express
```

### Basic Express Server

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello Express!' });
});

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
    ]);
});

app.post('/users', (req, res) => {
    const user = req.body;
    res.status(201).json(user);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### Route Parameters

```javascript
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id, name: 'User ' + id });
});

// Query parameters
app.get('/search', (req, res) => {
    const { q } = req.query;
    res.json({ query: q });
});
```

### Middleware

```javascript
// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
```

## MongoDB Integration

```bash
npm install mongodb mongoose
```

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');

// Define schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    age: Number
});

const User = mongoose.model('User', userSchema);

// Create
const user = new User({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
});
await user.save();

// Read
const users = await User.find();
const user = await User.findById(id);

// Update
await User.findByIdAndUpdate(id, { age: 31 });

// Delete
await User.findByIdAndDelete(id);
```

## Environment Variables

```bash
npm install dotenv
```

```javascript
// .env
PORT=3000
DB_URL=mongodb://localhost:27017/myapp

// app.js
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
```

## Project Structure

```
my-app/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Resources

- [Node.js Official Docs](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Docs](https://mongoosejs.com/docs/)

**Next:** [Intermediate Node.js](../02-Intermediate/README.md)
