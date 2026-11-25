# 🌳 Trees & Graphs - LeetCode Problems

> **Master tree and graph algorithms - essential for technical interviews**

---

## 🎯 Tree Fundamentals

### Tree Types
1. **Binary Tree** - Each node has at most 2 children
2. **Binary Search Tree (BST)** - Left < Root < Right
3. **Balanced Tree** - Height difference ≤ 1 (AVL, Red-Black)
4. **N-ary Tree** - Each node can have N children
5. **Trie** - Prefix tree for strings

### Tree Traversals

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Inorder (Left, Root, Right) - BST gives sorted order
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# Preorder (Root, Left, Right) - Copy tree
def preorder(root):
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

# Postorder (Left, Right, Root) - Delete tree
def postorder(root):
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]

# Level Order (BFS)
from collections import deque

def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    
    return result
```

---

## ✅ Easy Tree Problems

### 1. Maximum Depth of Binary Tree
**Link:** [LeetCode #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

**Time:** O(n) | **Space:** O(h)

```python
def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
```

---

### 2. Same Tree
**Link:** [LeetCode #100](https://leetcode.com/problems/same-tree/)

```python
def isSameTree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    return (p.val == q.val and 
            isSameTree(p.left, q.left) and 
            isSameTree(p.right, q.right))
```

---

### 3. Invert Binary Tree
**Link:** [LeetCode #226](https://leetcode.com/problems/invert-binary-tree/)

```python
def invertTree(root):
    if not root:
        return None
    
    root.left, root.right = root.right, root.left
    invertTree(root.left)
    invertTree(root.right)
    
    return root
```

---

### 4. Symmetric Tree
**Link:** [LeetCode #101](https://leetcode.com/problems/symmetric-tree/)

```python
def isSymmetric(root):
    def isMirror(left, right):
        if not left and not right:
            return True
        if not left or not right:
            return False
        return (left.val == right.val and
                isMirror(left.left, right.right) and
                isMirror(left.right, right.left))
    
    return isMirror(root, root)
```

---

### 5. Path Sum
**Link:** [LeetCode #112](https://leetcode.com/problems/path-sum/)

```python
def hasPathSum(root, targetSum):
    if not root:
        return False
    
    if not root.left and not root.right:
        return root.val == targetSum
    
    return (hasPathSum(root.left, targetSum - root.val) or
            hasPathSum(root.right, targetSum - root.val))
```

---

## 🔥 Medium Tree Problems

### 1. Binary Tree Level Order Traversal
**Link:** [LeetCode #102](https://leetcode.com/problems/binary-tree-level-order-traversal/)

```python
from collections import deque

def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result
```

---

### 2. Validate Binary Search Tree
**Link:** [LeetCode #98](https://leetcode.com/problems/validate-binary-search-tree/)

```python
def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        
        if node.val <= min_val or node.val >= max_val:
            return False
        
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))
```

---

### 3. Lowest Common Ancestor of BST
**Link:** [LeetCode #235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```python
def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root
```

---

### 4. Kth Smallest Element in BST
**Link:** [LeetCode #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```python
def kthSmallest(root, k):
    stack = []
    current = root
    
    while True:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        k -= 1
        
        if k == 0:
            return current.val
        
        current = current.right
```

---

### 5. Construct Binary Tree from Preorder and Inorder
**Link:** [LeetCode #105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```python
def buildTree(preorder, inorder):
    if not preorder or not inorder:
        return None
    
    root = TreeNode(preorder[0])
    mid = inorder.index(preorder[0])
    
    root.left = buildTree(preorder[1:mid+1], inorder[:mid])
    root.right = buildTree(preorder[mid+1:], inorder[mid+1:])
    
    return root
```

---

## 🌐 Graph Fundamentals

### Graph Representations

```python
# Adjacency List (Most Common)
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

### Graph Traversals

```python
# BFS (Breadth-First Search)
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

# DFS (Depth-First Search) - Recursive
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    result = [node]
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result

# DFS - Iterative
def dfs_iterative(graph, start):
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

## 🔥 Graph Problems

### 1. Number of Islands
**Link:** [LeetCode #200](https://leetcode.com/problems/number-of-islands/)

**Time:** O(m×n) | **Space:** O(m×n)

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
        
        grid[i][j] = '0'  # Mark as visited
        
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

---

### 2. Clone Graph
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

### 3. Course Schedule (Cycle Detection)
**Link:** [LeetCode #207](https://leetcode.com/problems/course-schedule/)

```python
def canFinish(numCourses, prerequisites):
    # Build adjacency list
    graph = {i: [] for i in range(numCourses)}
    for course, prereq in prerequisites:
        graph[course].append(prereq)
    
    # 0 = unvisited, 1 = visiting, 2 = visited
    state = [0] * numCourses
    
    def hasCycle(course):
        if state[course] == 1:  # Cycle detected
            return True
        if state[course] == 2:  # Already processed
            return False
        
        state[course] = 1  # Mark as visiting
        
        for prereq in graph[course]:
            if hasCycle(prereq):
                return True
        
        state[course] = 2  # Mark as visited
        return False
    
    for course in range(numCourses):
        if hasCycle(course):
            return False
    
    return True
```

---

### 4. Pacific Atlantic Water Flow
**Link:** [LeetCode #417](https://leetcode.com/problems/pacific-atlantic-water-flow/)

```python
def pacificAtlantic(heights):
    if not heights:
        return []
    
    m, n = len(heights), len(heights[0])
    pacific = set()
    atlantic = set()
    
    def dfs(i, j, visited):
        visited.add((i, j))
        
        for di, dj in [(0,1), (0,-1), (1,0), (-1,0)]:
            ni, nj = i + di, j + dj
            if (0 <= ni < m and 0 <= nj < n and 
                (ni, nj) not in visited and
                heights[ni][nj] >= heights[i][j]):
                dfs(ni, nj, visited)
    
    # DFS from Pacific border
    for i in range(m):
        dfs(i, 0, pacific)
    for j in range(n):
        dfs(0, j, pacific)
    
    # DFS from Atlantic border
    for i in range(m):
        dfs(i, n-1, atlantic)
    for j in range(n):
        dfs(m-1, j, atlantic)
    
    return list(pacific & atlantic)
```

---

### 5. Word Ladder
**Link:** [LeetCode #127](https://leetcode.com/problems/word-ladder/)

```python
from collections import deque

def ladderLength(beginWord, endWord, wordList):
    if endWord not in wordList:
        return 0
    
    wordSet = set(wordList)
    queue = deque([(beginWord, 1)])
    
    while queue:
        word, length = queue.popleft()
        
        if word == endWord:
            return length
        
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]
                
                if next_word in wordSet:
                    wordSet.remove(next_word)
                    queue.append((next_word, length + 1))
    
    return 0
```

---

## 💪 Hard Problems

### 1. Binary Tree Maximum Path Sum
**Link:** [LeetCode #124](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

```python
def maxPathSum(root):
    max_sum = float('-inf')
    
    def maxGain(node):
        nonlocal max_sum
        
        if not node:
            return 0
        
        left_gain = max(maxGain(node.left), 0)
        right_gain = max(maxGain(node.right), 0)
        
        current_path = node.val + left_gain + right_gain
        max_sum = max(max_sum, current_path)
        
        return node.val + max(left_gain, right_gain)
    
    maxGain(root)
    return max_sum
```

---

### 2. Serialize and Deserialize Binary Tree
**Link:** [LeetCode #297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

```python
class Codec:
    def serialize(self, root):
        def helper(node):
            if not node:
                return ['null']
            return [str(node.val)] + helper(node.left) + helper(node.right)
        
        return ','.join(helper(root))
    
    def deserialize(self, data):
        def helper(nodes):
            val = next(nodes)
            if val == 'null':
                return None
            node = TreeNode(int(val))
            node.left = helper(nodes)
            node.right = helper(nodes)
            return node
        
        return helper(iter(data.split(',')))
```

---

## 📝 Common Patterns

### Tree Patterns:
1. **DFS (Recursion)** - Most tree problems
2. **BFS (Level Order)** - Level-based problems
3. **BST Properties** - Inorder gives sorted
4. **Path Problems** - Track sum/path

### Graph Patterns:
1. **BFS** - Shortest path, level order
2. **DFS** - Connectivity, cycles
3. **Union-Find** - Connected components
4. **Topological Sort** - Course schedule

---

## 🎯 Must-Solve Problems

**Trees (15 problems):**
- Maximum Depth, Invert Tree, Same Tree
- Level Order Traversal, Validate BST
- Lowest Common Ancestor, Serialize Tree
- Binary Tree Maximum Path Sum

**Graphs (15 problems):**
- Number of Islands, Clone Graph
- Course Schedule, Pacific Atlantic
- Word Ladder, Graph Valid Tree
- Alien Dictionary

---

## 📚 Resources

- [VisuAlgo - Tree Visualizations](https://visualgo.net/en/bst)
- [Graph Algorithms Visualized](https://visualgo.net/en/dfsbfs)
- [NeetCode Trees & Graphs](https://neetcode.io/)

---

**Master trees and graphs - they're everywhere in interviews! 🚀**
