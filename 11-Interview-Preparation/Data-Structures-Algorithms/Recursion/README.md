# 🔄 Recursion

> **Master recursive thinking - essential for trees, graphs, and DP**

---

## 🎯 What is Recursion?

A function that calls itself to solve smaller instances of the same problem.

**Key Components:**
1. **Base Case** - Stopping condition
2. **Recursive Case** - Function calls itself
3. **Progress** - Move toward base case

---

## 📊 Basic Examples

### 1. Factorial
```python
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)

# factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
```

**Call Stack:**
```
factorial(5)
  → 5 * factorial(4)
    → 4 * factorial(3)
      → 3 * factorial(2)
        → 2 * factorial(1)
          → 1 (base case)
```

---

### 2. Fibonacci
```python
# Naive recursion - O(2ⁿ)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

# With memoization - O(n)
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
```

---

### 3. Sum of Array
```python
def sum_array(arr):
    # Base case
    if not arr:
        return 0
    
    # Recursive case
    return arr[0] + sum_array(arr[1:])

# sum_array([1, 2, 3, 4, 5]) = 15
```

---

## 🌳 Tree Recursion

### Binary Tree Traversal
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Inorder (Left, Root, Right)
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# Preorder (Root, Left, Right)
def preorder(root):
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

# Postorder (Left, Right, Root)
def postorder(root):
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]

# Tree Height
def height(root):
    if not root:
        return 0
    return 1 + max(height(root.left), height(root.right))
```

---

## 🔙 Backtracking

### Generate All Subsets
```python
def subsets(nums):
    result = []
    
    def backtrack(start, current):
        result.append(current[:])
        
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # Backtrack
    
    backtrack(0, [])
    return result

# subsets([1,2,3]) = [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

### Generate Permutations
```python
def permute(nums):
    result = []
    
    def backtrack(current):
        if len(current) == len(nums):
            result.append(current[:])
            return
        
        for num in nums:
            if num not in current:
                current.append(num)
                backtrack(current)
                current.pop()
    
    backtrack([])
    return result
```

---

## 🎯 LeetCode Problems

### 1. Power(x, n)
**Link:** [LeetCode #50](https://leetcode.com/problems/powx-n/)

```python
def myPow(x, n):
    if n == 0:
        return 1
    if n < 0:
        x = 1 / x
        n = -n
    
    if n % 2 == 0:
        half = myPow(x, n // 2)
        return half * half
    else:
        return x * myPow(x, n - 1)
```

---

### 2. Reverse Linked List
**Link:** [LeetCode #206](https://leetcode.com/problems/reverse-linked-list/)

```python
def reverseList(head):
    if not head or not head.next:
        return head
    
    new_head = reverseList(head.next)
    head.next.next = head
    head.next = None
    
    return new_head
```

---

### 3. Letter Combinations of Phone Number
**Link:** [LeetCode #17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

```python
def letterCombinations(digits):
    if not digits:
        return []
    
    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi',
        '5': 'jkl', '6': 'mno', '7': 'pqrs',
        '8': 'tuv', '9': 'wxyz'
    }
    
    result = []
    
    def backtrack(index, current):
        if index == len(digits):
            result.append(current)
            return
        
        for letter in phone[digits[index]]:
            backtrack(index + 1, current + letter)
    
    backtrack(0, "")
    return result
```

---

## 💡 Recursion vs Iteration

**When to Use Recursion:**
- Tree/graph traversal
- Divide and conquer
- Backtracking
- Natural recursive structure

**When to Use Iteration:**
- Simple loops
- Better performance needed
- Limited stack space

**Convert Recursion to Iteration:**
```python
# Recursive
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

# Iterative
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
```

---

## 📚 Resources

- [Recursion Visualizer](https://recursion.vercel.app/)
- [Think Recursively](https://www.youtube.com/watch?v=ngCos392W4w)

---

**Think recursively - it simplifies complex problems! 🚀**
