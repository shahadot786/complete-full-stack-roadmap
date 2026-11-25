# 🔍 Sorting & Searching Algorithms

> **Master fundamental algorithms - the building blocks of computer science**

---

## 📊 Sorting Algorithms

### 1. Bubble Sort
**Time:** O(n²) | **Space:** O(1) | **Stable:** Yes

```python
def bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
```

---

### 2. Selection Sort
**Time:** O(n²) | **Space:** O(1) | **Stable:** No

```python
def selectionSort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```

---

### 3. Insertion Sort
**Time:** O(n²) | **Space:** O(1) | **Stable:** Yes

```python
def insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
```

---

### 4. Merge Sort ⭐
**Time:** O(n log n) | **Space:** O(n) | **Stable:** Yes

```python
def mergeSort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = mergeSort(arr[:mid])
    right = mergeSort(arr[mid:])
    
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

---

### 5. Quick Sort ⭐
**Time:** O(n log n) avg, O(n²) worst | **Space:** O(log n) | **Stable:** No

```python
def quickSort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)
    
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

### 6. Heap Sort
**Time:** O(n log n) | **Space:** O(1) | **Stable:** No

```python
def heapSort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
```

---

### 7. Counting Sort
**Time:** O(n + k) | **Space:** O(k) | **Stable:** Yes

```python
def countingSort(arr):
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    count = [0] * range_val
    output = [0] * len(arr)
    
    # Count occurrences
    for num in arr:
        count[num - min_val] += 1
    
    # Cumulative count
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    # Build output
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output
```

---

## 🔍 Searching Algorithms

### 1. Linear Search
**Time:** O(n) | **Space:** O(1)

```python
def linearSearch(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

---

### 2. Binary Search ⭐
**Time:** O(log n) | **Space:** O(1)

**Iterative:**
```python
def binarySearch(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

**Recursive:**
```python
def binarySearchRecursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = left + (right - left) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binarySearchRecursive(arr, target, mid + 1, right)
    else:
        return binarySearchRecursive(arr, target, left, mid - 1)
```

---

### 3. Binary Search Variations

**Find First Occurrence:**
```python
def findFirst(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

**Find Last Occurrence:**
```python
def findLast(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # Continue searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

**Find Insert Position:**
```python
def searchInsert(nums, target):
    left, right = 0, len(nums)
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left
```

---

## 🔥 LeetCode Problems

### Sorting Problems

**1. Sort Colors (Dutch National Flag)**
**Link:** [LeetCode #75](https://leetcode.com/problems/sort-colors/)

```python
def sortColors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
```

---

**2. Merge Intervals**
**Link:** [LeetCode #56](https://leetcode.com/problems/merge-intervals/)

```python
def merge(intervals):
    if not intervals:
        return []
    
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        if current[0] <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], current[1])
        else:
            merged.append(current)
    
    return merged
```

---

**3. Kth Largest Element**
**Link:** [LeetCode #215](https://leetcode.com/problems/kth-largest-element-in-an-array/)

**Using Heap:**
```python
import heapq

def findKthLargest(nums, k):
    return heapq.nlargest(k, nums)[-1]
```

**Using QuickSelect:**
```python
def findKthLargest(nums, k):
    k = len(nums) - k
    
    def quickSelect(l, r):
        pivot = nums[r]
        p = l
        
        for i in range(l, r):
            if nums[i] <= pivot:
                nums[p], nums[i] = nums[i], nums[p]
                p += 1
        
        nums[p], nums[r] = nums[r], nums[p]
        
        if p < k:
            return quickSelect(p + 1, r)
        elif p > k:
            return quickSelect(l, p - 1)
        else:
            return nums[p]
    
    return quickSelect(0, len(nums) - 1)
```

---

### Binary Search Problems

**1. Search in Rotated Sorted Array**
**Link:** [LeetCode #33](https://leetcode.com/problems/search-in-rotated-sorted-array/)

```python
def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1
```

---

**2. Find Minimum in Rotated Sorted Array**
**Link:** [LeetCode #153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

```python
def findMin(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    
    return nums[left]
```

---

**3. Search a 2D Matrix**
**Link:** [LeetCode #74](https://leetcode.com/problems/search-a-2d-matrix/)

```python
def searchMatrix(matrix, target):
    if not matrix or not matrix[0]:
        return False
    
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        mid_val = matrix[mid // n][mid % n]
        
        if mid_val == target:
            return True
        elif mid_val < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return False
```

---

**4. Find Peak Element**
**Link:** [LeetCode #162](https://leetcode.com/problems/find-peak-element/)

```python
def findPeakElement(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] > nums[mid + 1]:
            right = mid
        else:
            left = mid + 1
    
    return left
```

---

**5. Median of Two Sorted Arrays**
**Link:** [LeetCode #4](https://leetcode.com/problems/median-of-two-sorted-arrays/)

```python
def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    
    while left <= right:
        partition1 = (left + right) // 2
        partition2 = (m + n + 1) // 2 - partition1
        
        maxLeft1 = float('-inf') if partition1 == 0 else nums1[partition1 - 1]
        minRight1 = float('inf') if partition1 == m else nums1[partition1]
        
        maxLeft2 = float('-inf') if partition2 == 0 else nums2[partition2 - 1]
        minRight2 = float('inf') if partition2 == n else nums2[partition2]
        
        if maxLeft1 <= minRight2 and maxLeft2 <= minRight1:
            if (m + n) % 2 == 0:
                return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2
            else:
                return max(maxLeft1, maxLeft2)
        elif maxLeft1 > minRight2:
            right = partition1 - 1
        else:
            left = partition1 + 1
```

---

## 📊 Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |

---

## 🎯 When to Use Which?

**Merge Sort:**
- Need stable sort
- Linked lists
- External sorting

**Quick Sort:**
- Average case performance
- In-place sorting
- Cache-friendly

**Heap Sort:**
- Guaranteed O(n log n)
- Limited memory
- Priority queues

**Binary Search:**
- Sorted array
- O(log n) lookup
- Find boundaries

---

## 📚 Resources

- [Sorting Algorithm Animations](https://www.toptal.com/developers/sorting-algorithms)
- [VisuAlgo - Sorting](https://visualgo.net/en/sorting)
- [Binary Search Patterns](https://leetcode.com/discuss/general-discussion/786126/python-powerful-ultimate-binary-search-template-solved-many-problems)

---

**Master sorting and searching - they're fundamental! 🚀**
