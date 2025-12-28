# 🪟 Sliding Window

> **Optimize substring/subarray problems - powerful technique**

---

## 🎯 Sliding Window Patterns

### 1. Fixed Size Window
```python
def maxSumSubarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum
```

### 2. Variable Size Window
```python
def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

---

## 🔥 LeetCode Problems

### 1. Maximum Average Subarray
**Link:** [LeetCode #643](https://leetcode.com/problems/maximum-average-subarray-i/)

```python
def findMaxAverage(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum / k
```

### 2. Longest Substring Without Repeating Characters
**Link:** [LeetCode #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

```python
def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

### 3. Minimum Window Substring
**Link:** [LeetCode #76](https://leetcode.com/problems/minimum-window-substring/)

```python
from collections import Counter

def minWindow(s, t):
    if not s or not t:
        return ""
    
    dict_t = Counter(t)
    required = len(dict_t)
    left, right = 0, 0
    formed = 0
    window_counts = {}
    
    ans = float("inf"), None, None
    
    while right < len(s):
        char = s[right]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in dict_t and window_counts[char] == dict_t[char]:
            formed += 1
        
        while left <= right and formed == required:
            char = s[left]
            
            if right - left + 1 < ans[0]:
                ans = (right - left + 1, left, right)
            
            window_counts[char] -= 1
            if char in dict_t and window_counts[char] < dict_t[char]:
                formed -= 1
            
            left += 1
        
        right += 1
    
    return "" if ans[0] == float("inf") else s[ans[1]:ans[2] + 1]
```

### 4. Longest Repeating Character Replacement
**Link:** [LeetCode #424](https://leetcode.com/problems/longest-repeating-character-replacement/)

```python
def characterReplacement(s, k):
    count = {}
    left = 0
    max_count = 0
    max_length = 0
    
    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_count = max(max_count, count[s[right]])
        
        while (right - left + 1) - max_count > k:
            count[s[left]] -= 1
            left += 1
        
        max_length = max(max_length, right - left + 1)
    
    return max_length
```

### 5. Permutation in String
**Link:** [LeetCode #567](https://leetcode.com/problems/permutation-in-string/)

```python
from collections import Counter

def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False
    
    s1_count = Counter(s1)
    window_count = Counter(s2[:len(s1)])
    
    if s1_count == window_count:
        return True
    
    for i in range(len(s1), len(s2)):
        window_count[s2[i]] += 1
        window_count[s2[i - len(s1)]] -= 1
        
        if window_count[s2[i - len(s1)]] == 0:
            del window_count[s2[i - len(s1)]]
        
        if s1_count == window_count:
            return True
    
    return False
```

---

## 💡 Template

```python
def sliding_window(arr):
    left = 0
    window = {}  # or set, or variables
    result = 0
    
    for right in range(len(arr)):
        # Expand window
        window[arr[right]] = window.get(arr[right], 0) + 1
        
        # Shrink window if needed
        while condition_not_met:
            window[arr[left]] -= 1
            left += 1
        
        # Update result
        result = max(result, right - left + 1)
    
    return result
```

---

## 📊 Complexity

**Time:** O(n) - Each element visited at most twice  
**Space:** O(k) - Window size

---

**Master sliding window for substring problems! 🚀**
