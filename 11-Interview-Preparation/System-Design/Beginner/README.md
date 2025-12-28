# 🏗️ System Design - Beginner Level

> **Learn the fundamentals of system design for technical interviews**

---

## 📚 What is System Design?

System design is the process of defining the **architecture, components, modules, interfaces, and data** for a system to satisfy specified requirements.

**Why It Matters:**
- Required for senior+ engineering roles
- Tests real-world problem-solving
- Evaluates architectural thinking
- No single "correct" answer

---

## 🎯 Core Concepts

### 1. Client-Server Architecture

**Basic Model:**
```
Client (Browser/App)
    ↓ HTTP Request
Server (Backend)
    ↓ Query
Database
```

**Key Points:**
- Client initiates requests
- Server processes and responds
- Stateless communication (HTTP)
- Can have multiple clients

---

### 2. HTTP/HTTPS

**HTTP Methods:**
- `GET` - Retrieve data
- `POST` - Create data
- `PUT` - Update data (full)
- `PATCH` - Update data (partial)
- `DELETE` - Remove data

**Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

**HTTPS:**
- Encrypted HTTP
- Uses TLS/SSL
- Essential for security

---

### 3. REST APIs

**Principles:**
1. **Stateless:** Each request contains all needed info
2. **Client-Server:** Separation of concerns
3. **Cacheable:** Responses can be cached
4. **Uniform Interface:** Consistent API design

**Example API:**
```
GET    /api/users          # Get all users
GET    /api/users/123      # Get user by ID
POST   /api/users          # Create user
PUT    /api/users/123      # Update user
DELETE /api/users/123      # Delete user
```

---

### 4. Databases

**SQL (Relational):**
- Structured data
- ACID properties
- Examples: PostgreSQL, MySQL
- Use when: Complex queries, transactions

**NoSQL (Non-Relational):**
- Flexible schema
- Horizontal scaling
- Examples: MongoDB, Cassandra
- Use when: Large scale, flexibility

**Comparison:**
| Feature | SQL | NoSQL |
|---------|-----|-------|
| Schema | Fixed | Flexible |
| Scaling | Vertical | Horizontal |
| Transactions | Strong | Eventual |
| Use Case | Banking | Social Media |

---

### 5. Caching

**What is Caching?**
Storing frequently accessed data in fast storage.

**Benefits:**
- Reduces database load
- Faster response times
- Lower costs

**Common Tools:**
- **Redis** - In-memory cache
- **Memcached** - Distributed cache
- **CDN** - Content delivery

**Cache Strategies:**
1. **Cache-Aside:** App checks cache, then DB
2. **Write-Through:** Write to cache and DB together
3. **Write-Back:** Write to cache, async to DB

---

### 6. Load Balancing

**Purpose:**
Distribute traffic across multiple servers.

**Benefits:**
- High availability
- Better performance
- Fault tolerance

**Algorithms:**
- **Round Robin:** Rotate through servers
- **Least Connections:** Send to least busy
- **IP Hash:** Same client → same server

**Example:**
```
        Load Balancer
       /      |      \
   Server1  Server2  Server3
```

---

## 🛠️ Basic System Design Components

### 1. Web Server
- Handles HTTP requests
- Examples: Nginx, Apache
- Can serve static files

### 2. Application Server
- Runs business logic
- Examples: Node.js, Django, Spring Boot
- Processes dynamic requests

### 3. Database
- Stores persistent data
- Primary data source
- Can be replicated

### 4. Cache
- Fast temporary storage
- Reduces latency
- Examples: Redis, Memcached

### 5. Queue
- Async task processing
- Examples: RabbitMQ, Kafka
- Decouples services

---

## 📊 Simple System Design Example

### Design: URL Shortener (like bit.ly)

**Requirements:**
- Shorten long URLs
- Redirect to original URL
- Track click count

**Basic Architecture:**
```
User → Load Balancer → Web Servers → Cache
                                    ↓
                                 Database
```

**Database Schema:**
```sql
CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE,
    original_url TEXT,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP
);
```

**API Design:**
```
POST /api/shorten
Body: { "url": "https://example.com/very/long/url" }
Response: { "short_url": "https://short.ly/abc123" }

GET /abc123
Response: Redirect to original URL
```

**Key Decisions:**
1. **Short Code Generation:** Base62 encoding
2. **Database:** PostgreSQL (ACID for consistency)
3. **Cache:** Redis (for popular URLs)
4. **Scale:** Load balancer for multiple servers

---

## 🎯 Design Interview Framework

### Step 1: Clarify Requirements (5 min)

**Functional:**
- What features are needed?
- Who are the users?
- What's the scale?

**Non-Functional:**
- Availability requirements?
- Latency expectations?
- Consistency needs?

### Step 2: High-Level Design (10 min)

- Draw basic architecture
- Identify main components
- Show data flow

### Step 3: Deep Dive (20 min)

- Database schema
- API design
- Scaling strategy
- Trade-offs

### Step 4: Wrap Up (5 min)

- Bottlenecks
- Monitoring
- Future improvements

---

## 📝 Practice Problems

### Beginner Level:
1. **URL Shortener** - Basic CRUD, caching
2. **Pastebin** - Text storage, expiration
3. **Rate Limiter** - Request throttling
4. **Key-Value Store** - Simple database

### Tips:
- Start simple
- Ask questions
- Think out loud
- Consider trade-offs

---

## 📚 Resources

**Books:**
- "Designing Data-Intensive Applications" by Martin Kleppmann
- "System Design Interview" by Alex Xu

**Websites:**
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Grokking System Design](https://www.educative.io/courses/grokking-the-system-design-interview)

**YouTube:**
- Gaurav Sen
- Tech Dummies Narendra L

---

**Master the basics, then move to intermediate! 🚀**
