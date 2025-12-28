# 🛣️ Shortest Path Algorithms

> **Find shortest paths in graphs - essential for navigation**

---

## 🎯 Dijkstra's Algorithm

**Use:** Weighted graphs, non-negative weights

```python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current_dist > distances[current]:
            continue
        
        for neighbor, weight in graph[current]:
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances
```

---

## 🔥 LeetCode Problems

### 1. Network Delay Time
**Link:** [LeetCode #743](https://leetcode.com/problems/network-delay-time/)

```python
import heapq
from collections import defaultdict

def networkDelayTime(times, n, k):
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    
    distances = {i: float('inf') for i in range(1, n + 1)}
    distances[k] = 0
    
    pq = [(0, k)]
    
    while pq:
        curr_dist, node = heapq.heappop(pq)
        
        if curr_dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            distance = curr_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    max_dist = max(distances.values())
    return max_dist if max_dist != float('inf') else -1
```

---

## 📊 Bellman-Ford Algorithm

**Use:** Negative weights, detect negative cycles

```python
def bellman_ford(graph, start, n):
    distances = [float('inf')] * n
    distances[start] = 0
    
    # Relax edges n-1 times
    for _ in range(n - 1):
        for u, v, weight in graph:
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight
    
    # Check for negative cycles
    for u, v, weight in graph:
        if distances[u] + weight < distances[v]:
            return None  # Negative cycle
    
    return distances
```

---

## 📊 Complexity

| Algorithm | Time | Space |
|-----------|------|-------|
| Dijkstra | O((V+E) log V) | O(V) |
| Bellman-Ford | O(VE) | O(V) |
| BFS (unweighted) | O(V+E) | O(V) |

---

**Master shortest path for graph problems! 🚀**
