# 🔤 String Matching Algorithms

> **Find patterns in text - essential for text processing**

---

## 🎯 KMP Algorithm

**Knuth-Morris-Pratt:** O(n + m) pattern matching

```python
def kmp_search(text, pattern):
    def compute_lps(pattern):
        lps = [0] * len(pattern)
        length = 0
        i = 1
        
        while i < len(pattern):
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1
        
        return lps
    
    lps = compute_lps(pattern)
    result = []
    i = j = 0
    
    while i < len(text):
        if pattern[j] == text[i]:
            i += 1
            j += 1
        
        if j == len(pattern):
            result.append(i - j)
            j = lps[j - 1]
        elif i < len(text) and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    
    return result
```

---

## 📊 Rabin-Karp Algorithm

**Rolling hash:** O(n + m) average

```python
def rabin_karp(text, pattern):
    d = 256  # Number of characters
    q = 101  # Prime number
    m = len(pattern)
    n = len(text)
    p = 0  # Hash value for pattern
    t = 0  # Hash value for text
    h = 1
    result = []
    
    # h = d^(m-1) % q
    for i in range(m - 1):
        h = (h * d) % q
    
    # Calculate hash for pattern and first window
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q
    
    # Slide pattern over text
    for i in range(n - m + 1):
        if p == t:
            # Check characters one by one
            if text[i:i+m] == pattern:
                result.append(i)
        
        # Calculate hash for next window
        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q
            if t < 0:
                t += q
    
    return result
```

---

## 🔥 LeetCode Problems

### 1. Implement strStr()
**Link:** [LeetCode #28](https://leetcode.com/problems/implement-strstr/)

```python
def strStr(haystack, needle):
    if not needle:
        return 0
    
    return haystack.find(needle)  # Built-in
    
    # Or KMP
    # return kmp_search(haystack, needle)[0] if kmp_search(haystack, needle) else -1
```

### 2. Repeated Substring Pattern
**Link:** [LeetCode #459](https://leetcode.com/problems/repeated-substring-pattern/)

```python
def repeatedSubstringPattern(s):
    return s in (s + s)[1:-1]
```

---

## 📊 Complexity

| Algorithm | Time | Space |
|-----------|------|-------|
| Naive | O(nm) | O(1) |
| KMP | O(n+m) | O(m) |
| Rabin-Karp | O(n+m) avg | O(1) |

---

**Master string matching for text problems! 🚀**
