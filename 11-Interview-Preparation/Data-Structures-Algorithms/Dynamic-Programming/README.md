# 💎 Dynamic Programming - LeetCode Problems

> **Master DP - the key to solving complex optimization problems**

---

## 🎯 What is Dynamic Programming?

**Dynamic Programming (DP)** is an optimization technique that solves complex problems by:
1. Breaking them into **overlapping subproblems**
2. Storing results to **avoid recomputation** (memoization)
3. Building solutions **bottom-up** (tabulation)

**When to Use DP:**
- Problem has **optimal substructure**
- Problem has **overlapping subproblems**
- Keywords: "maximum", "minimum", "count ways", "longest", "shortest"

---

## 📊 DP Approaches

### 1. Top-Down (Memoization)
- Recursive approach
- Cache results in dictionary/array
- Easier to write initially

### 2. Bottom-Up (Tabulation)
- Iterative approach
- Fill DP table systematically
- Better space/time complexity

---

## ✅ Easy DP Problems

### 1. Climbing Stairs
**Link:** [LeetCode #70](https://leetcode.com/problems/climbing-stairs/)

**Problem:** How many ways to climb n stairs (1 or 2 steps at a time)?

**Pattern:** Fibonacci

**Top-Down:**
```python
def climbStairs(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 2:
        return n
    
    memo[n] = climbStairs(n-1, memo) + climbStairs(n-2, memo)
    return memo[n]
```

**Bottom-Up:**
```python
def climbStairs(n):
    if n <= 2:
        return n
    
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]
```

**Optimized (O(1) space):**
```python
def climbStairs(n):
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return prev1
```

**Time:** O(n) | **Space:** O(1)

---

### 2. Min Cost Climbing Stairs
**Link:** [LeetCode #746](https://leetcode.com/problems/min-cost-climbing-stairs/)

```python
def minCostClimbingStairs(cost):
    n = len(cost)
    
    for i in range(2, n):
        cost[i] += min(cost[i-1], cost[i-2])
    
    return min(cost[n-1], cost[n-2])
```

**Time:** O(n) | **Space:** O(1)

---

### 3. Fibonacci Number
**Link:** [LeetCode #509](https://leetcode.com/problems/fibonacci-number/)

```python
def fib(n):
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for _ in range(2, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return prev1
```

---

## 🔥 Medium DP Problems

### 1. House Robber
**Link:** [LeetCode #198](https://leetcode.com/problems/house-robber/)

**Problem:** Rob houses to maximize money (can't rob adjacent houses)

**Recurrence:** `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

```python
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2, prev1 = 0, 0
    
    for num in nums:
        current = max(prev1, prev2 + num)
        prev2, prev1 = prev1, current
    
    return prev1
```

**Time:** O(n) | **Space:** O(1)

---

### 2. Coin Change
**Link:** [LeetCode #322](https://leetcode.com/problems/coin-change/)

**Problem:** Minimum coins to make amount

```python
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1
```

**Time:** O(amount × coins) | **Space:** O(amount)

---

### 3. Longest Increasing Subsequence
**Link:** [LeetCode #300](https://leetcode.com/problems/longest-increasing-subsequence/)

**DP Solution:**
```python
def lengthOfLIS(nums):
    if not nums:
        return 0
    
    dp = [1] * len(nums)
    
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)
```

**Time:** O(n²) | **Space:** O(n)

**Optimized (Binary Search):**
```python
def lengthOfLIS(nums):
    sub = []
    
    for num in nums:
        i = bisect_left(sub, num)
        
        if i == len(sub):
            sub.append(num)
        else:
            sub[i] = num
    
    return len(sub)
```

**Time:** O(n log n) | **Space:** O(n)

---

### 4. Word Break
**Link:** [LeetCode #139](https://leetcode.com/problems/word-break/)

```python
def wordBreak(s, wordDict):
    wordSet = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in wordSet:
                dp[i] = True
                break
    
    return dp[len(s)]
```

**Time:** O(n² × m) | **Space:** O(n)

---

### 5. Unique Paths
**Link:** [LeetCode #62](https://leetcode.com/problems/unique-paths/)

**Problem:** Count paths in m×n grid (only right/down moves)

```python
def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]
```

**Space Optimized:**
```python
def uniquePaths(m, n):
    dp = [1] * n
    
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    
    return dp[n-1]
```

**Time:** O(m×n) | **Space:** O(n)

---

### 6. Partition Equal Subset Sum
**Link:** [LeetCode #416](https://leetcode.com/problems/partition-equal-subset-sum/)

**Pattern:** 0/1 Knapsack

```python
def canPartition(nums):
    total = sum(nums)
    
    if total % 2 != 0:
        return False
    
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        for i in range(target, num - 1, -1):
            dp[i] = dp[i] or dp[i - num]
    
    return dp[target]
```

**Time:** O(n × sum) | **Space:** O(sum)

---

### 7. Decode Ways
**Link:** [LeetCode #91](https://leetcode.com/problems/decode-ways/)

```python
def numDecodings(s):
    if not s or s[0] == '0':
        return 0
    
    n = len(s)
    dp = [0] * (n + 1)
    dp[0], dp[1] = 1, 1
    
    for i in range(2, n + 1):
        # One digit
        if s[i-1] != '0':
            dp[i] += dp[i-1]
        
        # Two digits
        two_digit = int(s[i-2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i-2]
    
    return dp[n]
```

---

## 💪 Hard DP Problems

### 1. Edit Distance
**Link:** [LeetCode #72](https://leetcode.com/problems/edit-distance/)

**Problem:** Minimum operations to convert word1 to word2

```python
def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      # Delete
                    dp[i][j-1],      # Insert
                    dp[i-1][j-1]     # Replace
                )
    
    return dp[m][n]
```

**Time:** O(m×n) | **Space:** O(m×n)

---

### 2. Regular Expression Matching
**Link:** [LeetCode #10](https://leetcode.com/problems/regular-expression-matching/)

```python
def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    # Handle patterns like a*, a*b*, a*b*c*
    for j in range(2, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-2]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == s[i-1] or p[j-1] == '.':
                dp[i][j] = dp[i-1][j-1]
            elif p[j-1] == '*':
                dp[i][j] = dp[i][j-2]  # Zero occurrences
                if p[j-2] == s[i-1] or p[j-2] == '.':
                    dp[i][j] = dp[i][j] or dp[i-1][j]
    
    return dp[m][n]
```

---

### 3. Longest Valid Parentheses
**Link:** [LeetCode #32](https://leetcode.com/problems/longest-valid-parentheses/)

```python
def longestValidParentheses(s):
    n = len(s)
    dp = [0] * n
    max_len = 0
    
    for i in range(1, n):
        if s[i] == ')':
            if s[i-1] == '(':
                dp[i] = (dp[i-2] if i >= 2 else 0) + 2
            elif i - dp[i-1] > 0 and s[i - dp[i-1] - 1] == '(':
                dp[i] = dp[i-1] + 2 + (dp[i - dp[i-1] - 2] if i - dp[i-1] >= 2 else 0)
            
            max_len = max(max_len, dp[i])
    
    return max_len
```

---

### 4. Burst Balloons
**Link:** [LeetCode #312](https://leetcode.com/problems/burst-balloons/)

```python
def maxCoins(nums):
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n):
        for left in range(n - length):
            right = left + length
            for i in range(left + 1, right):
                dp[left][right] = max(
                    dp[left][right],
                    nums[left] * nums[i] * nums[right] + 
                    dp[left][i] + dp[i][right]
                )
    
    return dp[0][n-1]
```

---

## 📝 DP Patterns

### 1. Linear DP
- **Examples:** Climbing Stairs, House Robber
- **Formula:** `dp[i] = f(dp[i-1], dp[i-2], ...)`

### 2. 2D DP
- **Examples:** Unique Paths, Edit Distance
- **Formula:** `dp[i][j] = f(dp[i-1][j], dp[i][j-1], ...)`

### 3. Knapsack
- **0/1 Knapsack:** Each item once
- **Unbounded:** Unlimited items
- **Examples:** Coin Change, Partition

### 4. String DP
- **Examples:** Longest Palindrome, Edit Distance
- **Pattern:** Compare characters, build table

### 5. State Machine DP
- **Examples:** Stock problems
- **Pattern:** Different states (buy, sell, cooldown)

---

## 🎯 Must-Solve DP Problems (30 total)

**Easy (5):**
1. Climbing Stairs
2. Min Cost Climbing Stairs
3. Fibonacci Number
4. N-th Tribonacci Number
5. Divisor Game

**Medium (20):**
1. House Robber (I, II, III)
2. Coin Change (I, II)
3. Longest Increasing Subsequence
4. Word Break (I, II)
5. Unique Paths (I, II)
6. Decode Ways
7. Maximum Product Subarray
8. Partition Equal Subset Sum
9. Target Sum
10. Longest Palindromic Substring
11. Palindromic Substrings
12. Longest Common Subsequence
13. Delete Operation for Two Strings
14. Minimum Path Sum
15. Triangle
16. Perfect Squares
17. Combination Sum IV
18. Jump Game (I, II)
19. Best Time to Buy/Sell Stock (all variants)
20. Maximal Square

**Hard (5):**
1. Edit Distance
2. Regular Expression Matching
3. Longest Valid Parentheses
4. Burst Balloons
5. Wildcard Matching

---

## 💡 DP Problem-Solving Steps

1. **Identify if it's DP**
   - Optimization problem?
   - Overlapping subproblems?
   - Optimal substructure?

2. **Define State**
   - What does `dp[i]` represent?
   - What are the dimensions?

3. **Find Recurrence**
   - How to compute `dp[i]` from previous states?
   - What are the base cases?

4. **Implement**
   - Top-down (memoization) or
   - Bottom-up (tabulation)

5. **Optimize**
   - Can you reduce space complexity?
   - Can you optimize time?

---

## 📚 Resources

- [DP Patterns for Coding Interviews](https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns)
- [Dynamic Programming - MIT OCW](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/)
- [Tushar Roy - DP Playlist](https://www.youtube.com/playlist?list=PLrmLmBdmIlpsHaNTPP_jHHDx_os9ItYXr)

---

**DP is a superpower - master it! 🚀**
