# 🔗 Disjoint Set Union (Union-Find)

> **Track connected components - efficient union and find**

---

## 🎯 Implementation

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return False
        
        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

---

## 🔥 LeetCode Problems

### 1. Number of Connected Components
**Link:** [LeetCode #323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

```python
def countComponents(n, edges):
    uf = UnionFind(n)
    
    for u, v in edges:
        uf.union(u, v)
    
    return len(set(uf.find(i) for i in range(n)))
```

### 2. Redundant Connection
**Link:** [LeetCode #684](https://leetcode.com/problems/redundant-connection/)

```python
def findRedundantConnection(edges):
    uf = UnionFind(len(edges) + 1)
    
    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]
```

---

## 📊 Complexity

**Time:** O(α(n)) ≈ O(1) amortized  
**Space:** O(n)

---

**Master Union-Find for connectivity! 🚀**
