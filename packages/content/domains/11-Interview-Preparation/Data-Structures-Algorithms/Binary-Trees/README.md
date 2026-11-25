# 🌲 Binary Trees

> **Hierarchical data structure - foundation for many algorithms**

---

## 🎯 Binary Tree Basics

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

### Types
- **Full:** Every node has 0 or 2 children
- **Complete:** All levels filled except possibly last
- **Perfect:** All levels completely filled
- **Balanced:** Height difference ≤ 1

---

## 🔥 LeetCode Problems

### 1. Maximum Depth
**Link:** [LeetCode #104](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

```python
def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
```

### 2. Invert Binary Tree
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

### 3. Diameter of Binary Tree
**Link:** [LeetCode #543](https://leetcode.com/problems/diameter-of-binary-tree/)

```python
def diameterOfBinaryTree(root):
    diameter = 0
    
    def height(node):
        nonlocal diameter
        if not node:
            return 0
        
        left = height(node.left)
        right = height(node.right)
        
        diameter = max(diameter, left + right)
        
        return 1 + max(left, right)
    
    height(root)
    return diameter
```

### 4. Balanced Binary Tree
**Link:** [LeetCode #110](https://leetcode.com/problems/balanced-binary-tree/)

```python
def isBalanced(root):
    def height(node):
        if not node:
            return 0
        
        left = height(node.left)
        if left == -1:
            return -1
        
        right = height(node.right)
        if right == -1:
            return -1
        
        if abs(left - right) > 1:
            return -1
        
        return 1 + max(left, right)
    
    return height(root) != -1
```

### 5. Subtree of Another Tree
**Link:** [LeetCode #572](https://leetcode.com/problems/subtree-of-another-tree/)

```python
def isSubtree(root, subRoot):
    if not root:
        return False
    
    if isSameTree(root, subRoot):
        return True
    
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)

def isSameTree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    return p.val == q.val and isSameTree(p.left, q.left) and isSameTree(p.right, q.right)
```

---

**Master binary trees - they're fundamental! 🚀**
