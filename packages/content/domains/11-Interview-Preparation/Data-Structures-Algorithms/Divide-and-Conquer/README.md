# ⚔️ Divide and Conquer

> **Break problem into subproblems - solve recursively**

---

## 🎯 Strategy

1. **Divide:** Break into smaller subproblems
2. **Conquer:** Solve subproblems recursively
3. **Combine:** Merge solutions

---

## 📊 Classic Examples

### Merge Sort

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### Quick Sort

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

---

## 🔥 LeetCode Problems

### 1. Maximum Subarray (Divide & Conquer)
**Link:** [LeetCode #53](https://leetcode.com/problems/maximum-subarray/)

```python
def maxSubArray(nums):
    def helper(left, right):
        if left == right:
            return nums[left]
        
        mid = (left + right) // 2
        
        left_max = helper(left, mid)
        right_max = helper(mid + 1, right)
        
        # Cross max
        left_sum = float('-inf')
        curr_sum = 0
        for i in range(mid, left - 1, -1):
            curr_sum += nums[i]
            left_sum = max(left_sum, curr_sum)
        
        right_sum = float('-inf')
        curr_sum = 0
        for i in range(mid + 1, right + 1):
            curr_sum += nums[i]
            right_sum = max(right_sum, curr_sum)
        
        cross_max = left_sum + right_sum
        
        return max(left_max, right_max, cross_max)
    
    return helper(0, len(nums) - 1)
```

### 2. Merge K Sorted Lists
**Link:** [LeetCode #23](https://leetcode.com/problems/merge-k-sorted-lists/)

```python
def mergeKLists(lists):
    if not lists:
        return None
    
    def merge_two(l1, l2):
        dummy = ListNode(0)
        current = dummy
        
        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next
        
        current.next = l1 if l1 else l2
        return dummy.next
    
    def merge_lists(lists, left, right):
        if left == right:
            return lists[left]
        
        mid = (left + right) // 2
        l1 = merge_lists(lists, left, mid)
        l2 = merge_lists(lists, mid + 1, right)
        
        return merge_two(l1, l2)
    
    return merge_lists(lists, 0, len(lists) - 1)
```

---

## 📊 Complexity

**Time:** Usually O(n log n)  
**Space:** O(log n) for recursion stack

---

**Master divide and conquer for optimization! 🚀**
