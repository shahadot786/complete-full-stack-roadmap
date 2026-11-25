# 💚 Greedy Algorithms

> **Make locally optimal choices - works for specific problem types**

---

## 🎯 Greedy Strategy

**Concept:** Make the best choice at each step, hoping to find global optimum.

**When to Use:**
- Problem has optimal substructure
- Greedy choice property
- No need to reconsider past choices

**Common Patterns:**
1. Activity Selection
2. Interval Scheduling
3. Huffman Coding
4. Minimum Spanning Tree
5. Shortest Path (Dijkstra)

---

## 🔥 LeetCode Problems

### 1. Jump Game
**Link:** [LeetCode #55](https://leetcode.com/problems/jump-game/)

```python
def canJump(nums):
    max_reach = 0
    
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
    
    return True
```

### 2. Gas Station
**Link:** [LeetCode #134](https://leetcode.com/problems/gas-station/)

```python
def canCompleteCircuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1
    
    total = 0
    start = 0
    
    for i in range(len(gas)):
        total += gas[i] - cost[i]
        
        if total < 0:
            total = 0
            start = i + 1
    
    return start
```

### 3. Partition Labels
**Link:** [LeetCode #763](https://leetcode.com/problems/partition-labels/)

```python
def partitionLabels(s):
    last = {c: i for i, c in enumerate(s)}
    result = []
    start = end = 0
    
    for i, c in enumerate(s):
        end = max(end, last[c])
        
        if i == end:
            result.append(end - start + 1)
            start = i + 1
    
    return result
```

---

**Master greedy for optimization! 🚀**
