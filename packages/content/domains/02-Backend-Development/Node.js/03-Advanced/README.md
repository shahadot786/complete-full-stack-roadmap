# 🔥 Advanced Node.js

> **Master microservices, GraphQL, and performance optimization**

## Microservices Architecture

### Service Structure

```
microservices/
├── api-gateway/
├── user-service/
├── product-service/
├── order-service/
└── shared/
    ├── middleware/
    └── utils/
```

### API Gateway Pattern

```javascript
// api-gateway/server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Route to services
app.use('/users', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true
}));

app.use('/products', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true
}));

app.listen(3000);
```

## GraphQL

```bash
npm install apollo-server-express graphql
```

```javascript
const { ApolloServer, gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }
    
    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
    }
    
    type Query {
        users: [User!]!
        user(id: ID!): User
        posts: [Post!]!
    }
    
    type Mutation {
        createUser(name: String!, email: String!): User!
        createPost(title: String!, content: String!, authorId: ID!): Post!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        users: () => User.find(),
        user: (_, { id }) => User.findById(id),
        posts: () => Post.find()
    },
    Mutation: {
        createUser: (_, { name, email }) => {
            return User.create({ name, email });
        },
        createPost: (_, { title, content, authorId }) => {
            return Post.create({ title, content, author: authorId });
        }
    },
    User: {
        posts: (user) => Post.find({ author: user.id })
    },
    Post: {
        author: (post) => User.findById(post.author)
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });
```

## WebSockets & Real-time

```bash
npm install socket.io
```

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('User connected');
    
    socket.on('message', (data) => {
        // Broadcast to all clients
        io.emit('message', data);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000);
```

## Caching with Redis

```bash
npm install redis
```

```javascript
const redis = require('redis');
const client = redis.createClient();

await client.connect();

// Cache middleware
const cacheMiddleware = (duration) => {
    return async (req, res, next) => {
        const key = req.originalUrl;
        const cached = await client.get(key);
        
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        
        // Store original send
        res.sendResponse = res.json;
        res.json = (body) => {
            client.setEx(key, duration, JSON.stringify(body));
            res.sendResponse(body);
        };
        
        next();
    };
};

// Usage
app.get('/users', cacheMiddleware(60), async (req, res) => {
    const users = await User.find();
    res.json(users);
});
```

## Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests'
});

app.use('/api/', limiter);
```

## Performance Optimization

### Clustering

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Worker process
    require('./app');
}
```

### Database Query Optimization

```javascript
// Indexing
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Lean queries (returns plain objects)
const users = await User.find().lean();

// Select specific fields
const users = await User.find().select('name email');

// Pagination
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const users = await User.find()
    .skip(skip)
    .limit(limit);
```

## Message Queues

```bash
npm install bull
```

```javascript
const Queue = require('bull');

const emailQueue = new Queue('email', {
    redis: { host: 'localhost', port: 6379 }
});

// Add job
emailQueue.add({
    to: 'user@example.com',
    subject: 'Welcome',
    body: 'Welcome to our app!'
});

// Process job
emailQueue.process(async (job) => {
    const { to, subject, body } = job.data;
    await sendEmail(to, subject, body);
});
```

## Monitoring & Logging

```bash
npm install winston morgan
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Usage
logger.info('Server started');
logger.error('Error occurred', { error: err.message });
```

## Deployment

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_URL=mongodb://mongo:27017/myapp
    depends_on:
      - mongo
  
  mongo:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## Resources

- [Microservices Patterns](https://microservices.io/patterns/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)

**Congratulations!** You've mastered advanced Node.js concepts!
