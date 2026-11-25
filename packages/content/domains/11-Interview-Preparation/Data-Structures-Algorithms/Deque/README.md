# 🔄 Deque (Double-Ended Queue)

> **Insert/delete from both ends - O(1) operations**

---

## 🎯 Deque Basics

```python
from collections import deque

# Create deque
dq = deque([1, 2, 3])

# Add to right
dq.append(4)        # [1, 2, 3, 4]

# Add to left
dq.appendleft(0)    # [0, 1, 2, 3, 4]

# Remove from right
dq.pop()            # [0, 1, 2, 3]

# Remove from left
dq.popleft()        # [1, 2, 3]

# Peek
dq[0]   # Left end
dq[-1]  # Right end
```

---

## 🔥 LeetCode Problems

### 1. Sliding Window Maximum
**Link:** [LeetCode #239](https://leetcode.com/problems/sliding-window-maximum/)

```python
from collections import deque

def maxSlidingWindow(nums, k):
    dq = deque()
    result = []
    
    for i in range(len(nums)):
        # Remove elements outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result
```

---

## 📊 Complexity

All operations: **O(1)**

---

**Master deque for sliding window problems! 🚀**
