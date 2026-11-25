# 🚀 Intermediate Node.js

> **Build production-ready APIs with advanced patterns**

## TypeScript with Node.js

### Setup

```bash
npm install -D typescript @types/node @types/express ts-node
npx tsc --init
```

```typescript
// src/app.ts
import express, { Request, Response } from 'express';

const app = express();

app.get('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ id, name: 'User' });
});

export default app;
```

## Authentication & Authorization

### JWT Authentication

```bash
npm install jsonwebtoken bcrypt
```

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save user
    const user = await User.create({
        email,
        password: hashedPassword
    });
    
    res.status(201).json({ message: 'User created' });
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    
    res.json({ token });
});

// Auth middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Protected route
app.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    res.json(user);
});
```

## Validation

```bash
npm install joi
```

```javascript
const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(18).max(100)
});

app.post('/users', async (req, res) => {
    // Validate
    const { error, value } = userSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    // Create user
    const user = await User.create(value);
    res.status(201).json(user);
});
```

## Error Handling

```javascript
// Custom error class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

// Async error wrapper
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// Usage
app.get('/users/:id', catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        throw new AppError('User not found', 404);
    }
    
    res.json(user);
}));

// Global error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
});
```

## Database Relationships

```javascript
// User model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

// Post model
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Populate
const user = await User.findById(id).populate('posts');
const post = await Post.findById(id).populate('author');
```

## File Upload

```bash
npm install multer
```

```javascript
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});
```

## Testing

```bash
npm install --save-dev jest supertest
```

```javascript
// app.test.js
const request = require('supertest');
const app = require('./app');

describe('GET /users', () => {
    it('should return all users', async () => {
        const res = await request(app).get('/users');
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('POST /users', () => {
    it('should create a user', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com'
            });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
    });
});
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JWT.io](https://jwt.io/)
- [Jest Documentation](https://jestjs.io/)

**Next:** [Advanced Node.js](../03-Advanced/README.md)
