# 📊 Arrays & Strings - LeetCode Problems

> **Master the fundamentals - Arrays and Strings are the foundation of coding interviews**

---

## 🎯 Learning Path

### Easy Problems (Build Foundation)
### Medium Problems (Interview Standard)
### Hard Problems (Advanced Mastery)

---

## ✅ Easy Problems (20 problems)

### 1. Two Sum
**Difficulty:** Easy  
**Link:** [LeetCode #1](https://leetcode.com/problems/two-sum/)

**Problem:**
Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`.

**Approach:** Hash Map
**Time:** O(n) | **Space:** O(n)

```python
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

---

### 2. Best Time to Buy and Sell Stock
**Difficulty:** Easy  
**Link:** [LeetCode #121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

**Problem:**
Find maximum profit from buying and selling stock once.

**Approach:** Track minimum price
**Time:** O(n) | **Space:** O(1)

```python
def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit
```

---

### 3. Contains Duplicate
**Difficulty:** Easy  
**Link:** [LeetCode #217](https://leetcode.com/problems/contains-duplicate/)

**Approach:** Hash Set
**Time:** O(n) | **Space:** O(n)

```python
def containsDuplicate(nums):
    return len(nums) != len(set(nums))
```

---

### 4. Valid Anagram
**Difficulty:** Easy  
**Link:** [LeetCode #242](https://leetcode.com/problems/valid-anagram/)

**Approach:** Hash Map or Sorting
**Time:** O(n) | **Space:** O(1)

```python
def isAnagram(s, t):
    return sorted(s) == sorted(t)
    
# Or using Counter
from collections import Counter
def isAnagram(s, t):
    return Counter(s) == Counter(t)
```

---

### 5. Valid Parentheses
**Difficulty:** Easy  
**Link:** [LeetCode #20](https://leetcode.com/problems/valid-parentheses/)

**Approach:** Stack
**Time:** O(n) | **Space:** O(n)

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

## 🔥 Medium Problems (15 problems)

### 1. Product of Array Except Self
**Difficulty:** Medium  
**Link:** [LeetCode #238](https://leetcode.com/problems/product-of-array-except-self/)

**Problem:**
Return array where each element is product of all elements except itself (without division).

**Approach:** Left and Right products
**Time:** O(n) | **Space:** O(1)

```python
def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n
    
    # Left products
    left = 1
    for i in range(n):
        result[i] = left
        left *= nums[i]
    
    # Right products
    right = 1
    for i in range(n-1, -1, -1):
        result[i] *= right
        right *= nums[i]
    
    return result
```

---

### 2. Maximum Subarray (Kadane's Algorithm)
**Difficulty:** Medium  
**Link:** [LeetCode #53](https://leetcode.com/problems/maximum-subarray/)

**Approach:** Dynamic Programming
**Time:** O(n) | **Space:** O(1)

```python
def maxSubArray(nums):
    max_sum = current_sum = nums[0]
    
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

---

### 3. 3Sum
**Difficulty:** Medium  
**Link:** [LeetCode #15](https://leetcode.com/problems/3sum/)

**Approach:** Two Pointers
**Time:** O(n²) | **Space:** O(1)

```python
def threeSum(nums):
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
            
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    
    return result
```

---

### 4. Container With Most Water
**Difficulty:** Medium  
**Link:** [LeetCode #11](https://leetcode.com/problems/container-with-most-water/)

**Approach:** Two Pointers
**Time:** O(n) | **Space:** O(1)

```python
def maxArea(height):
    left, right = 0, len(height) - 1
    max_area = 0
    
    while left < right:
        width = right - left
        max_area = max(max_area, min(height[left], height[right]) * width)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_area
```

---

### 5. Longest Substring Without Repeating Characters
**Difficulty:** Medium  
**Link:** [LeetCode #3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

**Approach:** Sliding Window
**Time:** O(n) | **Space:** O(min(m,n))

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

## 💪 Hard Problems (5 problems)

### 1. Trapping Rain Water
**Difficulty:** Hard  
**Link:** [LeetCode #42](https://leetcode.com/problems/trapping-rain-water/)

**Approach:** Two Pointers
**Time:** O(n) | **Space:** O(1)

```python
def trap(height):
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    
    return water
```

---

### 2. Minimum Window Substring
**Difficulty:** Hard  
**Link:** [LeetCode #76](https://leetcode.com/problems/minimum-window-substring/)

**Approach:** Sliding Window
**Time:** O(m + n) | **Space:** O(m + n)

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

---

## 📝 Common Patterns

### 1. Two Pointers
- Used for: Sorted arrays, palindromes, pair finding
- Examples: Two Sum II, 3Sum, Container With Most Water

### 2. Sliding Window
- Used for: Substrings, subarrays with conditions
- Examples: Longest Substring, Minimum Window

### 3. Hash Map/Set
- Used for: Frequency counting, lookups
- Examples: Two Sum, Group Anagrams

### 4. Kadane's Algorithm
- Used for: Maximum subarray problems
- Examples: Maximum Subarray

---

## 🎯 Practice Strategy

1. **Start with Easy:** Build confidence and learn patterns
2. **Move to Medium:** Apply patterns to complex problems
3. **Tackle Hard:** Combine multiple patterns
4. **Time Yourself:** Practice under interview conditions
5. **Review Solutions:** Learn optimal approaches

---

## 📚 Resources

- [LeetCode Patterns](https://seanprashad.com/leetcode-patterns/)
- [NeetCode Roadmap](https://neetcode.io/roadmap)
- [Blind 75](https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU)

---

**Keep practicing! Consistency is key! 🚀**
