# 🌳 Fenwick Trees (Binary Indexed Tree)

> **Efficient prefix sums - simpler than segment trees**

---

## 🎯 Implementation

```python
class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)
    
    def update(self, idx, delta):
        idx += 1  # 1-indexed
        while idx <= self.n:
            self.tree[idx] += delta
            idx += idx & (-idx)
    
    def query(self, idx):
        idx += 1  # 1-indexed
        result = 0
        while idx > 0:
            result += self.tree[idx]
            idx -= idx & (-idx)
        return result
    
    def range_query(self, left, right):
        return self.query(right) - (self.query(left - 1) if left > 0 else 0)
```

---

## 🔥 LeetCode Problems

### Range Sum Query - Mutable
**Link:** [LeetCode #307](https://leetcode.com/problems/range-sum-query-mutable/)

```python
class NumArray:
    def __init__(self, nums):
        self.nums = nums
        self.tree = FenwickTree(len(nums))
        for i, num in enumerate(nums):
            self.tree.update(i, num)
    
    def update(self, index, val):
        delta = val - self.nums[index]
        self.nums[index] = val
        self.tree.update(index, delta)
    
    def sumRange(self, left, right):
        return self.tree.range_query(left, right)
```

---

## 📊 Complexity

**Update:** O(log n)  
**Query:** O(log n)  
**Space:** O(n)

---

**Master Fenwick trees for efficient updates! 🚀**
