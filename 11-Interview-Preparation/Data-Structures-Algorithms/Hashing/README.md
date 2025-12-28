# #️⃣ Hashing

> **O(1) lookups - essential for frequency counting and fast access**

---

## 🎯 Hash Table Basics

**Hash Function:** Maps keys to indices  
**Collision Resolution:** Chaining or Open Addressing

```python
# Python Dictionary (Hash Table)
hash_map = {}
hash_map['key'] = 'value'
value = hash_map.get('key', default_value)

# Python Set (Hash Set)
hash_set = set()
hash_set.add(element)
if element in hash_set:
    # O(1) lookup
```

---

## 🔥 LeetCode Problems

### 1. Two Sum
**Link:** [LeetCode #1](https://leetcode.com/problems/two-sum/)

```python
def twoSum(nums, target):
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

### 2. Group Anagrams
**Link:** [LeetCode #49](https://leetcode.com/problems/group-anagrams/)

```python
from collections import defaultdict

def groupAnagrams(strs):
    anagrams = defaultdict(list)
    
    for s in strs:
        key = ''.join(sorted(s))
        anagrams[key].append(s)
    
    return list(anagrams.values())
```

### 3. Longest Consecutive Sequence
**Link:** [LeetCode #128](https://leetcode.com/problems/longest-consecutive-sequence/)

```python
def longestConsecutive(nums):
    num_set = set(nums)
    max_length = 0
    
    for num in num_set:
        if num - 1 not in num_set:
            current = num
            length = 1
            
            while current + 1 in num_set:
                current += 1
                length += 1
            
            max_length = max(max_length, length)
    
    return max_length
```

### 4. Valid Anagram
**Link:** [LeetCode #242](https://leetcode.com/problems/valid-anagram/)

```python
from collections import Counter

def isAnagram(s, t):
    return Counter(s) == Counter(t)
```

### 5. First Unique Character
**Link:** [LeetCode #387](https://leetcode.com/problems/first-unique-character-in-a-string/)

```python
from collections import Counter

def firstUniqChar(s):
    count = Counter(s)
    
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    
    return -1
```

---

## 💡 Common Patterns

1. **Frequency Counting** - Counter
2. **Fast Lookup** - Set
3. **Key-Value Mapping** - Dictionary
4. **Grouping** - defaultdict
5. **Seen/Visited** - Set

---

## 📊 Complexity

**Average:**
- Insert: O(1)
- Delete: O(1)
- Search: O(1)

**Worst (rare):**
- All operations: O(n)

---

**Master hashing for fast lookups! 🚀**
