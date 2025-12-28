# ⏱️ Time and Space Complexity

> **Understand algorithm efficiency - critical for interviews**

---

## 🎯 Big O Notation

**Big O** describes the **worst-case** performance of an algorithm as input size grows.

### Common Time Complexities (Best to Worst):

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access, hash table lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search, array traversal |
| O(n log n) | Linearithmic | Merge sort, quick sort (avg) |
| O(n²) | Quadratic | Bubble sort, nested loops |
| O(n³) | Cubic | Triple nested loops |
| O(2ⁿ) | Exponential | Recursive Fibonacci |
| O(n!) | Factorial | Permutations |

---

## 📊 Time Complexity Examples

### O(1) - Constant Time
```python
def get_first(arr):
    return arr[0]  # Always 1 operation

def hash_lookup(dictionary, key):
    return dictionary[key]  # Hash table lookup
```

---

### O(log n) - Logarithmic Time
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Each iteration halves the search space
# n → n/2 → n/4 → n/8 → ... → 1
# Number of steps = log₂(n)
```

---

### O(n) - Linear Time
```python
def linear_search(arr, target):
    for i in range(len(arr)):  # n iterations
        if arr[i] == target:
            return i
    return -1

def sum_array(arr):
    total = 0
    for num in arr:  # n iterations
        total += num
    return total
```

---

### O(n log n) - Linearithmic Time
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])    # log n levels
    right = merge_sort(arr[mid:])
    
    return merge(left, right)  # n work per level

# Total: n work × log n levels = O(n log n)
```

---

### O(n²) - Quadratic Time
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):          # n iterations
        for j in range(n-i-1):  # n iterations
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Nested loops: n × n = n²
```

---

### O(2ⁿ) - Exponential Time
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Each call makes 2 recursive calls
# Tree height = n
# Total nodes = 2⁰ + 2¹ + 2² + ... + 2ⁿ = 2ⁿ⁺¹ - 1 ≈ O(2ⁿ)
```

---

## 💾 Space Complexity

**Space complexity** measures memory usage.

### O(1) - Constant Space
```python
def swap(a, b):
    temp = a  # Only 1 extra variable
    a = b
    b = temp
    return a, b
```

### O(n) - Linear Space
```python
def create_array(n):
    return [0] * n  # Array of size n

def fibonacci_dp(n):
    dp = [0] * (n + 1)  # Array of size n+1
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

### O(log n) - Logarithmic Space
```python
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid+1, right)
    else:
        return binary_search_recursive(arr, target, left, mid-1)

# Recursion depth = log n
# Each call uses O(1) space
# Total space = O(log n)
```

---

## 🔍 Analyzing Complexity

### Rule 1: Drop Constants
```python
# O(2n) → O(n)
def example1(arr):
    for x in arr:  # n
        print(x)
    for x in arr:  # n
        print(x)
# Total: 2n → O(n)
```

### Rule 2: Drop Non-Dominant Terms
```python
# O(n² + n) → O(n²)
def example2(arr):
    for i in range(len(arr)):      # n
        for j in range(len(arr)):  # n
            print(arr[i], arr[j])  # n²
    
    for x in arr:  # n
        print(x)
# Total: n² + n → O(n²)
```

### Rule 3: Different Inputs = Different Variables
```python
# O(a + b), NOT O(n)
def example3(arr1, arr2):
    for x in arr1:  # a iterations
        print(x)
    for y in arr2:  # b iterations
        print(y)

# O(a × b), NOT O(n²)
def example4(arr1, arr2):
    for x in arr1:      # a iterations
        for y in arr2:  # b iterations
            print(x, y)
```

### Rule 4: Amortized Time
```python
# Dynamic array append
# Most appends: O(1)
# Occasional resize: O(n)
# Amortized: O(1)

arr = []
for i in range(n):
    arr.append(i)  # Amortized O(1)
# Total: O(n)
```

---

## 📈 Complexity Comparison

**For n = 1,000,000:**

| Complexity | Operations | Time (1 op = 1μs) |
|------------|-----------|-------------------|
| O(1) | 1 | 1μs |
| O(log n) | 20 | 20μs |
| O(n) | 1,000,000 | 1 second |
| O(n log n) | 20,000,000 | 20 seconds |
| O(n²) | 1,000,000,000,000 | 11.5 days |
| O(2ⁿ) | 2^1000000 | Never finishes |

---

## 🎯 Common Data Structure Complexities

### Array
| Operation | Time |
|-----------|------|
| Access | O(1) |
| Search | O(n) |
| Insert (end) | O(1) |
| Insert (middle) | O(n) |
| Delete | O(n) |

### Hash Table
| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(1) | O(n) |
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |

### Binary Search Tree
| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

### Heap
| Operation | Time |
|-----------|------|
| Find Min/Max | O(1) |
| Insert | O(log n) |
| Delete Min/Max | O(log n) |

---

## 💡 Optimization Strategies

### 1. Use Hash Tables for O(1) Lookup
```python
# Bad: O(n²)
def has_duplicates_slow(arr):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False

# Good: O(n)
def has_duplicates_fast(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False
```

### 2. Use Two Pointers Instead of Nested Loops
```python
# Bad: O(n²)
def two_sum_slow(arr, target):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] + arr[j] == target:
                return [i, j]

# Good: O(n)
def two_sum_fast(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

### 3. Use Binary Search on Sorted Data
```python
# Bad: O(n)
def linear_search(arr, target):
    for i, num in enumerate(arr):
        if num == target:
            return i
    return -1

# Good: O(log n) - if sorted
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

---

## 🎓 Interview Tips

1. **Always analyze complexity** - Interviewers expect it
2. **Explain your reasoning** - Walk through the analysis
3. **Consider both time and space** - Trade-offs matter
4. **Optimize when asked** - Start with brute force, then optimize
5. **Use Big O correctly** - Drop constants and non-dominant terms

---

## 📚 Resources

- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Time Complexity Visualizer](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)
- [Cracking the Coding Interview - Chapter 6](http://www.crackingthecodinginterview.com/)

---

**Master complexity analysis - it's essential for interviews! 🚀**
