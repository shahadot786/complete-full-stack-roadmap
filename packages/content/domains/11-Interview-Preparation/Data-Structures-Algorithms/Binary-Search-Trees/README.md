# 🔍 Binary Search Trees (BST)

> **Ordered binary tree - efficient search, insert, delete**

---

## 🎯 BST Property

**Left < Root < Right** for all nodes

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

---

## 📊 Operations

### Search
```python
def search(root, val):
    if not root or root.val == val:
        return root
    
    if val < root.val:
        return search(root.left, val)
    return search(root.right, val)
```

### Insert
```python
def insert(root, val):
    if not root:
        return TreeNode(val)
    
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    
    return root
```

### Delete
```python
def deleteNode(root, key):
    if not root:
        return None
    
    if key < root.val:
        root.left = deleteNode(root.left, key)
    elif key > root.val:
        root.right = deleteNode(root.right, key)
    else:
        # Node with one or no child
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        
        # Node with two children
        min_node = findMin(root.right)
        root.val = min_node.val
        root.right = deleteNode(root.right, min_node.val)
    
    return root

def findMin(node):
    while node.left:
        node = node.left
    return node
```

---

## 🔥 LeetCode Problems

### 1. Validate BST
**Link:** [LeetCode #98](https://leetcode.com/problems/validate-binary-search-tree/)

```python
def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        
        if node.val <= min_val or node.val >= max_val:
            return False
        
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))
```

### 2. Kth Smallest Element
**Link:** [LeetCode #230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

```python
def kthSmallest(root, k):
    stack = []
    current = root
    
    while True:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        k -= 1
        
        if k == 0:
            return current.val
        
        current = current.right
```

### 3. Lowest Common Ancestor
**Link:** [LeetCode #235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```python
def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root
```

---

## 📊 Complexity

| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |

---

**Master BST for efficient operations! 🚀**
