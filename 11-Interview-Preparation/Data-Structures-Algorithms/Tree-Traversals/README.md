# 🌳 Tree Traversals

> **Visit all nodes systematically - essential for tree problems**

---

## 🎯 Traversal Types

### 1. Inorder (Left, Root, Right)
**Use:** BST → Sorted order

```python
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# Iterative
def inorderIterative(root):
    result = []
    stack = []
    current = root
    
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        result.append(current.val)
        current = current.right
    
    return result
```

### 2. Preorder (Root, Left, Right)
**Use:** Copy tree, Prefix expression

```python
def preorder(root):
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

# Iterative
def preorderIterative(root):
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result
```

### 3. Postorder (Left, Right, Root)
**Use:** Delete tree, Postfix expression

```python
def postorder(root):
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]

# Iterative
def postorderIterative(root):
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
    
    return result[::-1]
```

### 4. Level Order (BFS)
**Use:** Level-by-level processing

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

## 🔥 LeetCode Problems

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

### 2. Zigzag Level Order
**Link:** [LeetCode #103](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)

```python
from collections import deque

def zigzagLevelOrder(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    left_to_right = True
    
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        if not left_to_right:
            level.reverse()
        
        result.append(level)
        left_to_right = not left_to_right
    
    return result
```

### 3. Vertical Order Traversal
**Link:** [LeetCode #314](https://leetcode.com/problems/binary-tree-vertical-order-traversal/)

```python
from collections import defaultdict, deque

def verticalOrder(root):
    if not root:
        return []
    
    columns = defaultdict(list)
    queue = deque([(root, 0)])
    
    while queue:
        node, col = queue.popleft()
        columns[col].append(node.val)
        
        if node.left:
            queue.append((node.left, col - 1))
        if node.right:
            queue.append((node.right, col + 1))
    
    return [columns[col] for col in sorted(columns.keys())]
```

---

**Master all traversals - they're essential! 🚀**
