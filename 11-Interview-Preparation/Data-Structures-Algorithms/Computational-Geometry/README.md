# 📐 Computational Geometry

> **Geometric algorithms - points, lines, polygons**

---

## 🎯 Basic Concepts

### Point & Distance

```python
import math

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def distance(self, other):
        return math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)

def distance(p1, p2):
    return ((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)**0.5
```

### Line Intersection

```python
def ccw(A, B, C):
    return (C[1]-A[1]) * (B[0]-A[0]) > (B[1]-A[1]) * (C[0]-A[0])

def intersect(A, B, C, D):
    return ccw(A,C,D) != ccw(B,C,D) and ccw(A,B,C) != ccw(A,B,D)
```

### Convex Hull (Graham Scan)

```python
def convex_hull(points):
    def cross(O, A, B):
        return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0])
    
    points = sorted(set(points))
    
    if len(points) <= 1:
        return points
    
    # Build lower hull
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    
    # Build upper hull
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    
    return lower[:-1] + upper[:-1]
```

---

## 🔥 LeetCode Problems

### 1. Valid Square
**Link:** [LeetCode #593](https://leetcode.com/problems/valid-square/)

```python
def validSquare(p1, p2, p3, p4):
    def dist(p1, p2):
        return (p1[0] - p2[0])**2 + (p1[1] - p2[1])**2
    
    points = [p1, p2, p3, p4]
    distances = []
    
    for i in range(4):
        for j in range(i + 1, 4):
            distances.append(dist(points[i], points[j]))
    
    distances.sort()
    
    return (distances[0] > 0 and 
            distances[0] == distances[1] == distances[2] == distances[3] and
            distances[4] == distances[5])
```

### 2. Erect the Fence
**Link:** [LeetCode #587](https://leetcode.com/problems/erect-the-fence/)

```python
def outerTrees(trees):
    def cross(O, A, B):
        return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0])
    
    trees = sorted(set(map(tuple, trees)))
    
    if len(trees) <= 1:
        return trees
    
    lower = []
    for p in trees:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) < 0:
            lower.pop()
        lower.append(p)
    
    upper = []
    for p in reversed(trees):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) < 0:
            upper.pop()
        upper.append(p)
    
    return list(set(lower[:-1] + upper[:-1]))
```

---

## 📊 Common Operations

- **Distance:** O(1)
- **Line Intersection:** O(1)
- **Convex Hull:** O(n log n)
- **Closest Pair:** O(n log n)

---

**Master geometry for spatial problems! 🚀**
