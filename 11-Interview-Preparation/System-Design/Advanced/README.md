# 🏗️ System Design - Advanced Level

> **Design distributed systems at scale - senior engineer level**

---

## 🎯 Advanced Concepts

### 1. CAP Theorem

**You can only choose 2 out of 3:**

- **C**onsistency - All nodes see same data
- **A**vailability - Every request gets response
- **P**artition Tolerance - System works despite network failures

**Real-World Examples:**
- **CP Systems:** MongoDB, HBase, Redis (strong consistency)
- **AP Systems:** Cassandra, DynamoDB, Riak (high availability)
- **CA Systems:** Traditional RDBMS (no partition tolerance)

**Trade-offs:**
```
Network Partition Occurs
    ↓
Choose: Consistency OR Availability

Consistency (CP):
- Block writes until partition heals
- Ensure all nodes agree
- Example: Banking systems

Availability (AP):
- Accept writes on both sides
- Resolve conflicts later
- Example: Social media feeds
```

---

### 2. Consistency Models

**Strong Consistency:**
- Read always returns latest write
- Linearizability
- Example: Bank account balance

**Eventual Consistency:**
- Reads may return stale data
- Eventually all nodes converge
- Example: DNS, social media

**Causal Consistency:**
- Related operations ordered
- Unrelated can be concurrent
- Example: Comment threads

---

### 3. Distributed Transactions

**Two-Phase Commit (2PC):**
```
Coordinator
    ↓
Phase 1: Prepare
  → Ask all nodes: "Can you commit?"
  → Nodes vote Yes/No

Phase 2: Commit/Abort
  → If all Yes: Commit
  → If any No: Abort
```

**Problems:**
- Blocking protocol
- Single point of failure
- Not partition tolerant

**Saga Pattern (Alternative):**
```
Service A → Service B → Service C
    ↓           ↓           ↓
Compensate ← Compensate ← Compensate (if failure)
```

---

### 4. Consensus Algorithms

**Paxos:**
- Theoretical foundation
- Complex to implement
- Used in Google Chubby

**Raft:**
- Easier to understand
- Leader election
- Log replication
- Used in etcd, Consul

**Leader Election:**
```
1. Nodes start as followers
2. Timeout → Become candidate
3. Request votes
4. Majority → Become leader
5. Send heartbeats
```

---

### 5. Data Partitioning Strategies

**Horizontal Partitioning (Sharding):**

**1. Range-Based:**
```
Users 1-1M    → Shard 1
Users 1M-2M   → Shard 2
Users 2M-3M   → Shard 3
```
**Pros:** Simple, range queries easy  
**Cons:** Hotspots, uneven distribution

**2. Hash-Based:**
```
shard_id = hash(user_id) % num_shards
```
**Pros:** Even distribution  
**Cons:** Range queries hard, rebalancing difficult

**3. Consistent Hashing:**
```
Hash Ring:
    Node A (0-90°)
    Node B (90-180°)
    Node C (180-270°)
    Node D (270-360°)

Add/Remove node: Only affects neighbors
```
**Pros:** Minimal data movement  
**Cons:** Complex implementation

---

### 6. Replication Strategies

**Master-Slave:**
```
Master (Writes)
    ↓ Replicate
Slave 1 (Reads)
Slave 2 (Reads)
```

**Master-Master:**
```
Master 1 ⇄ Master 2
(Both accept writes)
```

**Quorum-Based:**
```
W + R > N
W = Write quorum
R = Read quorum
N = Total replicas

Example: N=3, W=2, R=2
Write to 2 nodes
Read from 2 nodes
Guaranteed overlap
```

---

### 7. Event Sourcing

**Traditional:**
```
UPDATE users SET balance = 100 WHERE id = 1
(Only current state stored)
```

**Event Sourcing:**
```
Events:
1. AccountCreated(id=1, balance=0)
2. MoneyDeposited(id=1, amount=50)
3. MoneyWithdrawn(id=1, amount=20)
4. MoneyDeposited(id=1, amount=70)

Current State = Replay all events
balance = 0 + 50 - 20 + 70 = 100
```

**Benefits:**
- Complete audit trail
- Time travel (replay to any point)
- Event replay for debugging

**Challenges:**
- Storage overhead
- Query complexity
- Event schema evolution

---

### 8. CQRS (Command Query Responsibility Segregation)

**Separate Read and Write Models:**

```
Write Side (Commands):
    ↓
Command Handler
    ↓
Event Store
    ↓ Publish Events
    ↓
Read Side (Queries):
    ↓
Denormalized Views
(Optimized for reads)
```

**Benefits:**
- Independent scaling
- Optimized data models
- Better performance

---

## 🎯 Advanced Design Patterns

### 1. Circuit Breaker

**Prevent cascading failures:**

```python
class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
        self.last_failure_time = None
    
    def call(self, func):
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = func()
            if self.state == "HALF_OPEN":
                self.state = "CLOSED"
                self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()
            
            if self.failure_count >= self.failure_threshold:
                self.state = "OPEN"
            
            raise e
```

---

### 2. Rate Limiting

**Token Bucket Algorithm:**
```python
class TokenBucket:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate  # tokens per second
        self.last_refill = time.time()
    
    def allow_request(self):
        self._refill()
        
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
    
    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        tokens_to_add = elapsed * self.refill_rate
        
        self.tokens = min(self.capacity, self.tokens + tokens_to_add)
        self.last_refill = now
```

---

### 3. Bulkhead Pattern

**Isolate resources to prevent total failure:**

```
Thread Pool 1 (Critical Service)
Thread Pool 2 (Non-Critical Service)
Thread Pool 3 (Background Jobs)

If Pool 2 exhausted → Pools 1 & 3 unaffected
```

---

## 🌐 Real-World System Designs

### Design: Distributed Cache (Redis Cluster)

**Requirements:**
- 100M keys
- 1M QPS
- <1ms latency
- High availability

**Architecture:**
```
Client
    ↓
Consistent Hashing
    ↓
┌─────────┬─────────┬─────────┐
│ Node 1  │ Node 2  │ Node 3  │
│ Master  │ Master  │ Master  │
│   ↓     │   ↓     │   ↓     │
│ Slave   │ Slave   │ Slave   │
└─────────┴─────────┴─────────┘
```

**Key Decisions:**
1. **Partitioning:** Consistent hashing
2. **Replication:** Master-slave per shard
3. **Failover:** Sentinel for automatic failover
4. **Persistence:** AOF + RDB snapshots

---

### Design: Distributed Message Queue (Kafka)

**Architecture:**
```
Producers
    ↓
Topic (Partitioned)
    ├─ Partition 0 → Broker 1
    ├─ Partition 1 → Broker 2
    └─ Partition 2 → Broker 3
    ↓
Consumer Groups
```

**Key Features:**
- **Partitioning:** Parallel processing
- **Replication:** Fault tolerance
- **Offset Management:** Exactly-once delivery
- **Retention:** Time or size-based

---

### Design: Global CDN

**Architecture:**
```
User (Tokyo)
    ↓
Edge Server (Tokyo) ← Cache
    ↓ (Cache Miss)
Regional Server (Asia)
    ↓ (Cache Miss)
Origin Server (US)
```

**Optimization:**
- **Anycast Routing:** Route to nearest server
- **Cache Invalidation:** Purge on update
- **Compression:** Gzip, Brotli
- **HTTP/2:** Multiplexing

---

## 📊 Monitoring & Observability

### The Three Pillars:

**1. Metrics:**
```
- Latency (p50, p95, p99)
- Throughput (QPS, RPS)
- Error Rate
- Saturation (CPU, Memory, Disk)
```

**2. Logs:**
```
- Structured logging (JSON)
- Centralized (ELK, Splunk)
- Correlation IDs
- Log levels
```

**3. Traces:**
```
Distributed Tracing (Jaeger, Zipkin)
Request ID → Span across services
```

---

## 💡 Interview Tips

1. **Start with requirements** - Functional + Non-functional
2. **Estimate scale** - QPS, storage, bandwidth
3. **High-level design first** - Components and data flow
4. **Deep dive** - Specific components
5. **Discuss trade-offs** - CAP, consistency, latency
6. **Bottlenecks** - Identify and solve
7. **Monitoring** - How to detect issues

---

## 📚 Resources

- **Books:**
  - "Designing Data-Intensive Applications" by Martin Kleppmann
  - "System Design Interview Vol 2" by Alex Xu
  - "Database Internals" by Alex Petrov

- **Papers:**
  - Google File System (GFS)
  - MapReduce
  - Bigtable
  - Dynamo (Amazon)
  - Raft Consensus

- **Courses:**
  - [Grokking Advanced System Design](https://www.educative.io/courses/grokking-adv-system-design-intvw)

---

**Design systems that scale to billions! 🚀**
