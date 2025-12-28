# 🔙 Backtracking

> **Explore all possibilities - essential for combinatorial problems**

---

## 🎯 Backtracking Template

```python
def backtrack(path, choices):
    if is_solution(path):
        result.append(path[:])
        return
    
    for choice in choices:
        # Make choice
        path.append(choice)
        
        # Explore
        backtrack(path, get_next_choices())
        
        # Undo choice (backtrack)
        path.pop()
```

---

## 🔥 LeetCode Problems

### 1. Subsets
**Link:** [LeetCode #78](https://leetcode.com/problems/subsets/)

```python
def subsets(nums):
    result = []
    
    def backtrack(start, path):
        result.append(path[:])
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    
    backtrack(0, [])
    return result
```

### 2. Permutations
**Link:** [LeetCode #46](https://leetcode.com/problems/permutations/)

```python
def permute(nums):
    result = []
    
    def backtrack(path):
        if len(path) == len(nums):
            result.append(path[:])
            return
        
        for num in nums:
            if num not in path:
                path.append(num)
                backtrack(path)
                path.pop()
    
    backtrack([])
    return result
```

### 3. N-Queens
**Link:** [LeetCode #51](https://leetcode.com/problems/n-queens/)

```python
def solveNQueens(n):
    result = []
    board = [['.'] * n for _ in range(n)]
    
    def is_valid(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        
        # Check diagonals
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j -= 1
        
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j += 1
        
        return True
    
    def backtrack(row):
        if row == n:
            result.append([''.join(row) for row in board])
            return
        
        for col in range(n):
            if is_valid(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'
    
    backtrack(0)
    return result
```

---

**Master backtracking for combinatorial problems! 🚀**
