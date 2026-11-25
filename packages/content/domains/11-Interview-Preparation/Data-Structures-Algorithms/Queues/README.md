# 📋 Queues

> **FIFO (First In, First Out) - Essential for BFS and scheduling**

---

## 🎯 Queue Basics

### Implementation

**Using List:**
```python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        return None
    
    def front(self):
        if not self.is_empty():
            return self.items[0]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
```

**Circular Queue:**
```python
class CircularQueue:
    def __init__(self, k):
        self.queue = [None] * k
        self.size = k
        self.front = self.rear = -1
    
    def enQueue(self, value):
        if self.isFull():
            return False
        
        if self.isEmpty():
            self.front = 0
        
        self.rear = (self.rear + 1) % self.size
        self.queue[self.rear] = value
        return True
    
    def deQueue(self):
        if self.isEmpty():
            return False
        
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.size
        
        return True
    
    def isEmpty(self):
        return self.front == -1
    
    def isFull(self):
        return (self.rear + 1) % self.size == self.front
```

---

## 🔥 LeetCode Problems

### 1. Implement Queue using Stacks
**Link:** [LeetCode #232](https://leetcode.com/problems/implement-queue-using-stacks/)

```python
class MyQueue:
    def __init__(self):
        self.stack1 = []
        self.stack2 = []
    
    def push(self, x):
        self.stack1.append(x)
    
    def pop(self):
        self._move()
        return self.stack2.pop()
    
    def peek(self):
        self._move()
        return self.stack2[-1]
    
    def empty(self):
        return not self.stack1 and not self.stack2
    
    def _move(self):
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
```

---

### 2. Number of Recent Calls
**Link:** [LeetCode #933](https://leetcode.com/problems/number-of-recent-calls/)

```python
from collections import deque

class RecentCounter:
    def __init__(self):
        self.queue = deque()
    
    def ping(self, t):
        self.queue.append(t)
        
        while self.queue[0] < t - 3000:
            self.queue.popleft()
        
        return len(self.queue)
```

---

### 3. Moving Average from Data Stream
**Link:** [LeetCode #346](https://leetcode.com/problems/moving-average-from-data-stream/)

```python
from collections import deque

class MovingAverage:
    def __init__(self, size):
        self.size = size
        self.queue = deque()
        self.sum = 0
    
    def next(self, val):
        self.queue.append(val)
        self.sum += val
        
        if len(self.queue) > self.size:
            self.sum -= self.queue.popleft()
        
        return self.sum / len(self.queue)
```

---

## 💡 Applications

- BFS traversal
- Task scheduling
- Print queue
- Message queues
- Request handling
- Level order traversal

---

**Time Complexity:** O(1) for all operations  
**Space Complexity:** O(n)

---

**Master queues for BFS! 🚀**
