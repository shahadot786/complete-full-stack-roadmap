# ➕ Prefix Sum

> **Precompute cumulative sums - answer range queries in O(1)**

---

## 🎯 Concept

**Prefix Sum:** `prefix[i] = sum of elements from 0 to i`

```python
# Original array
arr = [1, 2, 3, 4, 5]

# Prefix sum
prefix = [1, 3, 6, 10, 15]

# Range sum [left, right]
range_sum = prefix[right] - prefix[left - 1]
```

---

## 📊 Implementation

```python
def build_prefix_sum(arr):
    n = len(arr)
    prefix = [0] * n
    prefix[0] = arr[0]
    
    for i in range(1, n):
        prefix[i] = prefix[i-1] + arr[i]
    
    return prefix

def range_sum(prefix, left, right):
    if left == 0:
        return prefix[right]
    return prefix[right] - prefix[left - 1]
```

---

## 🔥 LeetCode Problems

### 1. Range Sum Query - Immutable
**Link:** [LeetCode #303](https://leetcode.com/problems/range-sum-query-immutable/)

```python
class NumArray:
    def __init__(self, nums):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)
    
    def sumRange(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]
```

### 2. Subarray Sum Equals K
**Link:** [LeetCode #560](https://leetcode.com/problems/subarray-sum-equals-k/)

```python
def subarraySum(nums, k):
    count = 0
    prefix_sum = 0
    sum_count = {0: 1}
    
    for num in nums:
        prefix_sum += num
        
        if prefix_sum - k in sum_count:
            count += sum_count[prefix_sum - k]
        
        sum_count[prefix_sum] = sum_count.get(prefix_sum, 0) + 1
    
    return count
```

### 3. Contiguous Array
**Link:** [LeetCode #525](https://leetcode.com/problems/contiguous-array/)

```python
def findMaxLength(nums):
    count = 0
    max_length = 0
    count_map = {0: -1}
    
    for i, num in enumerate(nums):
        count += 1 if num == 1 else -1
        
        if count in count_map:
            max_length = max(max_length, i - count_map[count])
        else:
            count_map[count] = i
    
    return max_length
```

### 4. Product of Array Except Self
**Link:** [LeetCode #238](https://leetcode.com/problems/product-of-array-except-self/)

```python
def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n
    
    # Left products
    left = 1
    for i in range(n):
        result[i] = left
        left *= nums[i]
    
    # Right products
    right = 1
    for i in range(n-1, -1, -1):
        result[i] *= right
        right *= nums[i]
    
    return result
```

---

## 💡 2D Prefix Sum

```python
def build_2d_prefix(matrix):
    m, n = len(matrix), len(matrix[0])
    prefix = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            prefix[i][j] = (matrix[i-1][j-1] + 
                           prefix[i-1][j] + 
                           prefix[i][j-1] - 
                           prefix[i-1][j-1])
    
    return prefix

def range_sum_2d(prefix, r1, c1, r2, c2):
    return (prefix[r2+1][c2+1] - 
            prefix[r1][c2+1] - 
            prefix[r2+1][c1] + 
            prefix[r1][c1])
```

---

## 📊 Complexity

**Build:** O(n)  
**Query:** O(1)  
**Space:** O(n)

---

**Master prefix sum for range queries! 🚀**
