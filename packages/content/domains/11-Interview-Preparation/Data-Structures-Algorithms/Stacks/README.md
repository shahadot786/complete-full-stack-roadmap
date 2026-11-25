# 📚 Stacks

> **LIFO (Last In, First Out) - Essential for expression evaluation and backtracking**

---

## 🎯 Stack Basics

### Implementation

**Using List:**
```python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
```

**Using Linked List:**
```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Stack:
    def __init__(self):
        self.top = None
    
    def push(self, data):
        new_node = Node(data)
        new_node.next = self.top
        self.top = new_node
    
    def pop(self):
        if self.top:
            data = self.top.data
            self.top = self.top.next
            return data
        return None
```

---

## 🔥 LeetCode Problems

### 1. Valid Parentheses
**Link:** [LeetCode #20](https://leetcode.com/problems/valid-parentheses/)

```python
def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    
    return len(stack) == 0
```

---

### 2. Min Stack
**Link:** [LeetCode #155](https://leetcode.com/problems/min-stack/)

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        if self.stack[-1] == self.min_stack[-1]:
            self.min_stack.pop()
        self.stack.pop()
    
    def top(self):
        return self.stack[-1]
    
    def getMin(self):
        return self.min_stack[-1]
```

---

### 3. Evaluate Reverse Polish Notation
**Link:** [LeetCode #150](https://leetcode.com/problems/evaluate-reverse-polish-notation/)

```python
def evalRPN(tokens):
    stack = []
    operators = {'+', '-', '*', '/'}
    
    for token in tokens:
        if token in operators:
            b = stack.pop()
            a = stack.pop()
            
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:
                stack.append(int(a / b))
        else:
            stack.append(int(token))
    
    return stack[0]
```

---

### 4. Daily Temperatures
**Link:** [LeetCode #739](https://leetcode.com/problems/daily-temperatures/)

```python
def dailyTemperatures(temperatures):
    n = len(temperatures)
    result = [0] * n
    stack = []  # Store indices
    
    for i in range(n):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev_index = stack.pop()
            result[prev_index] = i - prev_index
        stack.append(i)
    
    return result
```

---

### 5. Largest Rectangle in Histogram
**Link:** [LeetCode #84](https://leetcode.com/problems/largest-rectangle-in-histogram/)

```python
def largestRectangleArea(heights):
    stack = []
    max_area = 0
    heights.append(0)
    
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    
    return max_area
```

---

## 💡 Common Patterns

1. **Monotonic Stack** - Maintain increasing/decreasing order
2. **Expression Evaluation** - Infix, postfix, prefix
3. **Backtracking** - DFS, undo operations
4. **Function Call Stack** - Recursion simulation

---

## 📚 Applications

- Expression evaluation
- Undo/Redo functionality
- Browser history
- Function call stack
- Syntax parsing
- Backtracking algorithms

---

**Time Complexity:** O(1) for all operations  
**Space Complexity:** O(n)

---

**Master stacks - they're fundamental! 🚀**
