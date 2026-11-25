# 🏔️ Heaps & Priority Queues

> **Efficiently find min/max elements - essential for scheduling and optimization**

---

## 🎯 Heap Basics

### What is a Heap?

A **complete binary tree** where:
- **Min Heap:** Parent ≤ Children
- **Max Heap:** Parent ≥ Children

**Properties:**
- Root is min/max element
- Insert: O(log n)
- Extract min/max: O(log n)
- Peek: O(1)

---

## 📊 Implementation

**Using Python heapq (Min Heap):**
```python
import heapq

# Create heap
heap = []

# Push elements
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
heapq.heappush(heap, 7)

# Pop minimum
min_val = heapq.heappop(heap)  # 3

# Peek minimum
min_val = heap[0]  # 5

# Heapify list
nums = [5, 3, 7, 1, 9]
heapq.heapify(nums)  # [1, 3, 7, 5, 9]

# N largest/smallest
heapq.nlargest(3, nums)   # [9, 7, 5]
heapq.nsmallest(3, nums)  # [1, 3, 5]
```

**Max Heap (negate values):**
```python
import heapq

max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -7)

max_val = -heapq.heappop(max_heap)  # 7
```

---

## 🔥 LeetCode Problems

### 1. Kth Largest Element in Array
**Link:** [LeetCode #215](https://leetcode.com/problems/kth-largest-element-in-an-array/)

```python
import heapq

def findKthLargest(nums, k):
    return heapq.nlargest(k, nums)[-1]

# Or using min heap
def findKthLargest(nums, k):
    heap = nums[:k]
    heapq.heapify(heap)
    
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)
    
    return heap[0]
```

---

### 2. Top K Frequent Elements
**Link:** [LeetCode #347](https://leetcode.com/problems/top-k-frequent-elements/)

```python
from collections import Counter
import heapq

def topKFrequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)
```

---

### 3. Merge K Sorted Lists
**Link:** [LeetCode #23](https://leetcode.com/problems/merge-k-sorted-lists/)

```python
import heapq

def mergeKLists(lists):
    heap = []
    
    # Add first node from each list
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    
    dummy = ListNode(0)
    current = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next
```

---

### 4. Find Median from Data Stream
**Link:** [LeetCode #295](https://leetcode.com/problems/find-median-from-data-stream/)

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max heap (negated)
        self.large = []  # Min heap
    
    def addNum(self, num):
        heapq.heappush(self.small, -num)
        
        # Balance heaps
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        
        # Size balance
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)
    
    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2
```

---

### 5. Task Scheduler
**Link:** [LeetCode #621](https://leetcode.com/problems/task-scheduler/)

```python
from collections import Counter
import heapq

def leastInterval(tasks, n):
    count = Counter(tasks)
    max_heap = [-cnt for cnt in count.values()]
    heapq.heapify(max_heap)
    
    time = 0
    queue = []  # (count, available_time)
    
    while max_heap or queue:
        time += 1
        
        if max_heap:
            cnt = heapq.heappop(max_heap) + 1
            if cnt < 0:
                queue.append((cnt, time + n))
        
        if queue and queue[0][1] == time:
            heapq.heappush(max_heap, queue.pop(0)[0])
    
    return time
```

---

## 💡 Common Patterns

1. **K-th Element** - Use heap of size k
2. **Merge K Lists** - Min heap with first elements
3. **Running Median** - Two heaps (max + min)
4. **Top K Frequent** - Heap with frequency
5. **Scheduling** - Priority queue

---

## 📊 Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(log n) | O(n) |
| Extract Min/Max | O(log n) | O(n) |
| Peek | O(1) | O(n) |
| Heapify | O(n) | O(n) |

---

## 🎯 Practice Problems (10 total)

**Medium:**
1. Kth Largest Element
2. Top K Frequent Elements
3. Merge K Sorted Lists
4. Find Median from Data Stream
5. Task Scheduler
6. Reorganize String
7. K Closest Points to Origin
8. Last Stone Weight
9. Kth Smallest Element in Sorted Matrix
10. Ugly Number II

---

**Master heaps for optimization problems! 🚀**
