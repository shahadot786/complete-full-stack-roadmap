# ↔️ Two Pointers

> **Optimize array/string problems - reduce O(n²) to O(n)**

---

## 🎯 Two Pointers Patterns

### 1. Opposite Direction (Start & End)
```python
def isPalindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    
    return True
```

### 2. Same Direction (Fast & Slow)
```python
def removeDuplicates(nums):
    slow = 0
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1
```

### 3. Two Arrays
```python
def merge(nums1, m, nums2, n):
    p1, p2, p = m - 1, n - 1, m + n - 1
    
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
```

---

## 🔥 LeetCode Problems

### 1. Two Sum II (Sorted Array)
**Link:** [LeetCode #167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

```python
def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1
    
    while left < right:
        total = numbers[left] + numbers[right]
        
        if total == target:
            return [left + 1, right + 1]
        elif total < target:
            left += 1
        else:
            right -= 1
```

### 2. Container With Most Water
**Link:** [LeetCode #11](https://leetcode.com/problems/container-with-most-water/)

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

### 3. 3Sum
**Link:** [LeetCode #15](https://leetcode.com/problems/3sum/)

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

### 4. Remove Duplicates from Sorted Array
**Link:** [LeetCode #26](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

```python
def removeDuplicates(nums):
    if not nums:
        return 0
    
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1
```

### 5. Move Zeroes
**Link:** [LeetCode #283](https://leetcode.com/problems/move-zeroes/)

```python
def moveZeroes(nums):
    slow = 0
    
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1
```

---

## 💡 When to Use

- **Sorted array** - Opposite direction
- **Remove duplicates** - Fast & slow
- **Palindrome check** - Opposite direction
- **Merge sorted arrays** - Two arrays
- **Find pairs** - Opposite direction

---

## 📊 Complexity

**Time:** O(n) - Single pass  
**Space:** O(1) - No extra space

---

**Master two pointers for array optimization! 🚀**
