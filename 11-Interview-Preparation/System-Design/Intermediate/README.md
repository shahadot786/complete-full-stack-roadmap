# 🏗️ System Design - Intermediate Level

> **Design scalable systems for millions of users**

---

## 🎯 Scalability Principles

### Vertical vs Horizontal Scaling

**Vertical Scaling (Scale Up):**
- Add more power to existing machine
- Increase CPU, RAM, storage
- **Pros:** Simple, no code changes
- **Cons:** Hardware limits, single point of failure
- **Use:** Small to medium applications

**Horizontal Scaling (Scale Out):**
- Add more machines
- Distribute load across servers
- **Pros:** No limits, fault tolerant
- **Cons:** Complex, requires load balancer
- **Use:** Large-scale applications

---

## 🔄 Load Balancing

### What is a Load Balancer?

Distributes incoming traffic across multiple servers.

**Benefits:**
- High availability
- Better performance
- Fault tolerance
- Easier maintenance

### Load Balancing Algorithms

**1. Round Robin**
```
Request 1 → Server 1
Request 2 → Server 2
Request 3 → Server 3
Request 4 → Server 1 (repeat)
```

**2. Least Connections**
- Send to server with fewest active connections
- Good for long-lived connections

**3. IP Hash**
- Hash client IP to determine server
- Same client → same server (session persistence)

**4. Weighted Round Robin**
- Servers have different capacities
- More powerful servers get more requests

### Popular Load Balancers
- **Nginx** - Open source, high performance
- **HAProxy** - Reliable, feature-rich
- **AWS ELB** - Managed service
- **Google Cloud Load Balancing**

---

## 💾 Database Scaling

### 1. Database Replication

**Master-Slave Replication:**
```
Master (Write)
  ↓ Replicate
Slave 1 (Read)
Slave 2 (Read)
Slave 3 (Read)
```

**Benefits:**
- Read scalability
- Backup and disaster recovery
- Analytics without affecting production

**Master-Master Replication:**
- Both databases accept writes
- More complex conflict resolution
- Higher availability

---

### 2. Database Sharding

**Horizontal Partitioning:**
Split data across multiple databases.

**Sharding Strategies:**

**1. Range-Based:**
```
Users 1-1M    → Shard 1
Users 1M-2M   → Shard 2
Users 2M-3M   → Shard 3
```

**2. Hash-Based:**
```
hash(user_id) % num_shards = shard_id
```

**3. Geographic:**
```
US users      → US Shard
EU users      → EU Shard
Asia users    → Asia Shard
```

**Challenges:**
- Complex queries across shards
- Rebalancing when adding shards
- Hotspots (uneven distribution)

---

## 🚀 Caching Strategies

### Cache-Aside (Lazy Loading)

```python
def get_user(user_id):
    # Check cache first
    user = cache.get(f"user:{user_id}")
    
    if user:
        return user  # Cache hit
    
    # Cache miss - fetch from DB
    user = db.query(f"SELECT * FROM users WHERE id = {user_id}")
    
    # Store in cache
    cache.set(f"user:{user_id}", user, ttl=3600)
    
    return user
```

**Pros:** Only cache what's needed  
**Cons:** Cache miss penalty

---

### Write-Through Cache

```python
def update_user(user_id, data):
    # Update database
    db.update(f"UPDATE users SET ... WHERE id = {user_id}")
    
    # Update cache immediately
    cache.set(f"user:{user_id}", data, ttl=3600)
```

**Pros:** Cache always consistent  
**Cons:** Write latency, unnecessary caching

---

### Write-Back (Write-Behind) Cache

```python
def update_user(user_id, data):
    # Update cache immediately
    cache.set(f"user:{user_id}", data)
    
    # Queue for async DB write
    queue.add({
        'operation': 'update_user',
        'user_id': user_id,
        'data': data
    })
```

**Pros:** Fast writes  
**Cons:** Risk of data loss

---

### Cache Eviction Policies

**LRU (Least Recently Used):**
- Remove least recently accessed items
- Most common policy

**LFU (Least Frequently Used):**
- Remove least frequently accessed items

**FIFO (First In First Out):**
- Remove oldest items first

**TTL (Time To Live):**
- Items expire after set time

---

## 📨 Message Queues

### Why Use Message Queues?

**Benefits:**
- **Decoupling:** Services don't need to know about each other
- **Async Processing:** Handle tasks in background
- **Load Leveling:** Smooth out traffic spikes
- **Reliability:** Retry failed operations

### Architecture

```
Producer → Queue → Consumer
           ↓
        Dead Letter Queue (failed messages)
```

### Popular Message Queues

**RabbitMQ:**
- Feature-rich
- Multiple protocols
- Good for complex routing

**Apache Kafka:**
- High throughput
- Distributed streaming
- Good for event sourcing

**AWS SQS:**
- Managed service
- Simple to use
- Integrates with AWS

**Redis Pub/Sub:**
- Fast, in-memory
- Simple pub/sub
- No persistence by default

---

## 🌐 CDN (Content Delivery Network)

### What is a CDN?

Network of servers that cache content closer to users.

**Architecture:**
```
User (NYC) → CDN Edge Server (NYC) → Origin Server (California)
```

**Benefits:**
- **Faster load times** - Content served from nearby server
- **Reduced bandwidth** - Less data from origin
- **DDoS protection** - Distributed infrastructure
- **High availability** - Multiple servers

**What to Cache:**
- Static files (images, CSS, JS)
- Videos
- API responses (with short TTL)

**Popular CDNs:**
- Cloudflare
- AWS CloudFront
- Fastly
- Akamai

---

## 🔐 API Gateway

### What is an API Gateway?

Single entry point for all client requests.

**Responsibilities:**
- **Routing:** Direct requests to appropriate service
- **Authentication:** Verify user identity
- **Rate Limiting:** Prevent abuse
- **Caching:** Cache responses
- **Load Balancing:** Distribute requests
- **Logging:** Track all requests

**Example Architecture:**
```
Client → API Gateway → Microservice 1
                    → Microservice 2
                    → Microservice 3
```

**Popular Gateways:**
- Kong
- AWS API Gateway
- Nginx
- Traefik

---

## 📊 Microservices Architecture

### Monolith vs Microservices

**Monolith:**
```
Single Application
├── User Module
├── Product Module
├── Order Module
└── Payment Module
```

**Microservices:**
```
User Service (separate deployment)
Product Service (separate deployment)
Order Service (separate deployment)
Payment Service (separate deployment)
```

**Microservices Benefits:**
- Independent deployment
- Technology flexibility
- Better scalability
- Fault isolation

**Microservices Challenges:**
- Distributed system complexity
- Network latency
- Data consistency
- Testing difficulty

---

## 🎯 Design Example: Instagram

### Requirements

**Functional:**
- Upload photos
- Follow users
- View feed
- Like/comment

**Non-Functional:**
- 500M users
- 100M daily active users
- Low latency (<200ms)
- High availability (99.99%)

### High-Level Design

```
Client
  ↓
Load Balancer
  ↓
API Gateway
  ↓
┌─────────────┬─────────────┬─────────────┐
│   User      │   Feed      │   Media     │
│  Service    │  Service    │  Service    │
└─────────────┴─────────────┴─────────────┘
  ↓              ↓              ↓
PostgreSQL    Redis Cache    S3/CDN
```

### Key Components

**1. User Service:**
- User authentication
- Profile management
- Follow/unfollow

**2. Feed Service:**
- Generate user feed
- Cache recent posts
- Pagination

**3. Media Service:**
- Upload to S3
- Image processing
- CDN distribution

**4. Database:**
- **PostgreSQL:** User data, relationships
- **Redis:** Feed cache, session storage
- **S3:** Photo storage

**5. Caching:**
- User profiles (1 hour TTL)
- Feed (5 minutes TTL)
- CDN for images

### Scaling Strategies

**Database:**
- Read replicas for feed generation
- Shard users by user_id
- Separate DB for analytics

**Feed Generation:**
- Pre-compute feeds for active users
- Cache in Redis
- Fan-out on write for small followings
- Fan-out on read for celebrities

**Media:**
- Upload to S3
- Process asynchronously (resize, thumbnails)
- Serve via CloudFront CDN

---

## 📝 Common Interview Questions

### 1. Design Twitter
- Tweet storage and retrieval
- Timeline generation
- Trending topics

### 2. Design Uber
- Real-time location tracking
- Matching drivers and riders
- Pricing and payments

### 3. Design Netflix
- Video streaming
- Recommendation system
- Content delivery

### 4. Design WhatsApp
- Real-time messaging
- Group chats
- Message delivery guarantees

### 5. Design TinyURL
- URL shortening
- Redirection
- Analytics

---

## 💡 Design Tips

1. **Clarify Requirements** - Ask questions
2. **Estimate Scale** - Calculate QPS, storage
3. **Start Simple** - Basic architecture first
4. **Identify Bottlenecks** - Where will it fail?
5. **Scale Gradually** - Add components as needed
6. **Trade-offs** - Discuss pros/cons
7. **Monitor & Iterate** - Real-world adjustments

---

## 📚 Resources

- **Books:**
  - "Designing Data-Intensive Applications" by Martin Kleppmann
  - "System Design Interview Vol 1 & 2" by Alex Xu

- **Courses:**
  - [Grokking the System Design Interview](https://www.educative.io/courses/grokking-the-system-design-interview)
  - [System Design Primer](https://github.com/donnemartin/system-design-primer)

- **YouTube:**
  - Gaurav Sen
  - Tech Dummies
  - ByteByteGo

---

**Design systems that scale! 🚀**
