# 🔤 Tries (Prefix Trees)

> **Efficient string operations - autocomplete, spell check**

---

## 🎯 Trie Structure

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def startsWith(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

---

## 🔥 LeetCode Problems

### 1. Implement Trie
**Link:** [LeetCode #208](https://leetcode.com/problems/implement-trie-prefix-tree/)

```python
class Trie:
    def __init__(self):
        self.root = {}
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node:
                node[char] = {}
            node = node[char]
        node['#'] = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node:
                return False
            node = node[char]
        return '#' in node
    
    def startsWith(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node:
                return False
            node = node[char]
        return True
```

### 2. Word Search II
**Link:** [LeetCode #212](https://leetcode.com/problems/word-search-ii/)

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

def findWords(board, words):
    # Build trie
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word
    
    result = []
    
    def dfs(i, j, node):
        char = board[i][j]
        if char not in node.children:
            return
        
        next_node = node.children[char]
        
        if next_node.word:
            result.append(next_node.word)
            next_node.word = None
        
        board[i][j] = '#'
        
        for di, dj in [(0,1), (0,-1), (1,0), (-1,0)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < len(board) and 0 <= nj < len(board[0]):
                dfs(ni, nj, next_node)
        
        board[i][j] = char
    
    for i in range(len(board)):
        for j in range(len(board[0])):
            dfs(i, j, root)
    
    return result
```

---

## 📊 Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(m) | O(m) |
| Search | O(m) | O(1) |
| Prefix | O(m) | O(1) |

*m = word length*

---

**Master tries for string problems! 🚀**
