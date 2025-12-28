# 🌐 Graph Traversals (BFS & DFS)

> **Explore graphs systematically - foundation for graph algorithms**

---

## 🎯 Graph Representation

```python
# Adjacency List
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

# Adjacency Matrix
graph = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
]
```

---

## 📊 BFS (Breadth-First Search)

**Use:** Shortest path, Level-by-level

```python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result
```

---

## 📊 DFS (Depth-First Search)

**Use:** Connectivity, Cycle detection

```python
# Recursive
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    result = [node]
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result

# Iterative
def dfsIterative(graph, start):
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            result.append(node)
            stack.extend(reversed(graph[node]))
    
    return result
```

---

## 🔥 LeetCode Problems

### 1. Number of Islands (DFS)
**Link:** [LeetCode #200](https://leetcode.com/problems/number-of-islands/)

```python
def numIslands(grid):
    if not grid:
        return 0
    
    count = 0
    
    def dfs(i, j):
        if (i < 0 or i >= len(grid) or 
            j < 0 or j >= len(grid[0]) or 
            grid[i][j] != '1'):
            return
        
        grid[i][j] = '0'
        
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    
    return count
```

### 2. Shortest Path in Binary Matrix (BFS)
**Link:** [LeetCode #1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

```python
from collections import deque

def shortestPathBinaryMatrix(grid):
    if grid[0][0] == 1 or grid[-1][-1] == 1:
        return -1
    
    n = len(grid)
    queue = deque([(0, 0, 1)])
    grid[0][0] = 1
    
    directions = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    
    while queue:
        row, col, dist = queue.popleft()
        
        if row == n-1 and col == n-1:
            return dist
        
        for dr, dc in directions:
            r, c = row + dr, col + dc
            
            if 0 <= r < n and 0 <= c < n and grid[r][c] == 0:
                grid[r][c] = 1
                queue.append((r, c, dist + 1))
    
    return -1
```

### 3. Clone Graph (DFS)
**Link:** [LeetCode #133](https://leetcode.com/problems/clone-graph/)

```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node):
    if not node:
        return None
    
    clones = {}
    
    def dfs(node):
        if node in clones:
            return clones[node]
        
        clone = Node(node.val)
        clones[node] = clone
        
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)
```

---

## 💡 BFS vs DFS

| Aspect | BFS | DFS |
|--------|-----|-----|
| Data Structure | Queue | Stack/Recursion |
| Memory | O(w) width | O(h) height |
| Shortest Path | ✅ Yes | ❌ No |
| Complete | ✅ Yes | ❌ No (infinite) |
| Use Case | Shortest path | Connectivity |

---

**Master BFS & DFS - they're everywhere! 🚀**
