# 📊 Topological Sorting

> **Order tasks with dependencies - DAG ordering**

---

## 🎯 Concept

**Topological Sort:** Linear ordering of vertices in DAG (Directed Acyclic Graph) where for every edge u→v, u comes before v.

**Use Cases:**
- Course prerequisites
- Build systems
- Task scheduling

---

## 📊 Kahn's Algorithm (BFS)

```python
from collections import deque, defaultdict

def topological_sort(n, edges):
    graph = defaultdict(list)
    in_degree = [0] * n
    
    # Build graph
    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1
    
    # Find nodes with no incoming edges
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # Check for cycle
    return result if len(result) == n else []
```

---

## 📊 DFS Approach

```python
def topological_sort_dfs(n, edges):
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
    
    visited = [0] * n  # 0: unvisited, 1: visiting, 2: visited
    result = []
    
    def dfs(node):
        if visited[node] == 1:
            return False  # Cycle detected
        if visited[node] == 2:
            return True
        
        visited[node] = 1
        
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False
        
        visited[node] = 2
        result.append(node)
        return True
    
    for i in range(n):
        if visited[i] == 0:
            if not dfs(i):
                return []
    
    return result[::-1]
```

---

## 🔥 LeetCode Problems

### 1. Course Schedule
**Link:** [LeetCode #207](https://leetcode.com/problems/course-schedule/)

```python
from collections import defaultdict, deque

def canFinish(numCourses, prerequisites):
    graph = defaultdict(list)
    in_degree = [0] * numCourses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1
    
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    count = 0
    
    while queue:
        course = queue.popleft()
        count += 1
        
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)
    
    return count == numCourses
```

### 2. Course Schedule II
**Link:** [LeetCode #210](https://leetcode.com/problems/course-schedule-ii/)

```python
from collections import defaultdict, deque

def findOrder(numCourses, prerequisites):
    graph = defaultdict(list)
    in_degree = [0] * numCourses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1
    
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    result = []
    
    while queue:
        course = queue.popleft()
        result.append(course)
        
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)
    
    return result if len(result) == numCourses else []
```

---

## 📊 Complexity

**Time:** O(V + E)  
**Space:** O(V + E)

---

**Master topological sort for dependency problems! 🚀**
