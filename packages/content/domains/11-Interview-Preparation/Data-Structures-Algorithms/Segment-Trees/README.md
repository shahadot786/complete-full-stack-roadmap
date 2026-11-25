# 🌲 Segment Trees

> **Range queries and updates - O(log n) operations**

---

## 🎯 Implementation

```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2*node+1, start, mid)
            self.build(arr, 2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def update(self, idx, val, node=0, start=0, end=None):
        if end is None:
            end = self.n - 1
        
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self.update(idx, val, 2*node+1, start, mid)
            else:
                self.update(idx, val, 2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def query(self, left, right, node=0, start=0, end=None):
        if end is None:
            end = self.n - 1
        
        if right < start or left > end:
            return 0
        
        if left <= start and end <= right:
            return self.tree[node]
        
        mid = (start + end) // 2
        left_sum = self.query(left, right, 2*node+1, start, mid)
        right_sum = self.query(left, right, 2*node+2, mid+1, end)
        
        return left_sum + right_sum
```

---

## 📊 Complexity

**Build:** O(n)  
**Query:** O(log n)  
**Update:** O(log n)

---

**Master segment trees for range queries! 🚀**
