# 🔗 Linked Lists

> **Master linked list operations - fundamental for interviews**

---

## 🎯 Linked List Basics

### Node Structure
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

### Types of Linked Lists

**1. Singly Linked List:**
```
1 → 2 → 3 → 4 → None
```

**2. Doubly Linked List:**
```
None ← 1 ⇄ 2 ⇄ 3 ⇄ 4 → None
```

**3. Circular Linked List:**
```
1 → 2 → 3 → 4 ↺
```

---

## 📊 Common Operations

### 1. Traversal
```python
def traverse(head):
    current = head
    while current:
        print(current.val)
        current = current.next
```

### 2. Insert at Beginning
```python
def insert_at_beginning(head, val):
    new_node = ListNode(val)
    new_node.next = head
    return new_node
```

### 3. Insert at End
```python
def insert_at_end(head, val):
    new_node = ListNode(val)
    
    if not head:
        return new_node
    
    current = head
    while current.next:
        current = current.next
    
    current.next = new_node
    return head
```

### 4. Delete Node
```python
def delete_node(head, val):
    if not head:
        return None
    
    if head.val == val:
        return head.next
    
    current = head
    while current.next:
        if current.next.val == val:
            current.next = current.next.next
            return head
        current = current.next
    
    return head
```

### 5. Search
```python
def search(head, val):
    current = head
    index = 0
    
    while current:
        if current.val == val:
            return index
        current = current.next
        index += 1
    
    return -1
```

---

## 🔥 LeetCode Problems

### 1. Reverse Linked List
**Link:** [LeetCode #206](https://leetcode.com/problems/reverse-linked-list/)

**Iterative:**
```python
def reverseList(head):
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev
```

**Recursive:**
```python
def reverseList(head):
    if not head or not head.next:
        return head
    
    new_head = reverseList(head.next)
    head.next.next = head
    head.next = None
    
    return new_head
```

---

### 2. Merge Two Sorted Lists
**Link:** [LeetCode #21](https://leetcode.com/problems/merge-two-sorted-lists/)

```python
def mergeTwoLists(l1, l2):
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
```

---

### 3. Linked List Cycle
**Link:** [LeetCode #141](https://leetcode.com/problems/linked-list-cycle/)

**Floyd's Cycle Detection (Tortoise and Hare):**
```python
def hasCycle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False
```

---

### 4. Remove Nth Node From End
**Link:** [LeetCode #19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

**Two Pointers:**
```python
def removeNthFromEnd(head, n):
    dummy = ListNode(0)
    dummy.next = head
    
    first = second = dummy
    
    # Move first n+1 steps ahead
    for _ in range(n + 1):
        first = first.next
    
    # Move both until first reaches end
    while first:
        first = first.next
        second = second.next
    
    # Remove nth node
    second.next = second.next.next
    
    return dummy.next
```

---

### 5. Middle of Linked List
**Link:** [LeetCode #876](https://leetcode.com/problems/middle-of-the-linked-list/)

```python
def middleNode(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow
```

---

### 6. Palindrome Linked List
**Link:** [LeetCode #234](https://leetcode.com/problems/palindrome-linked-list/)

```python
def isPalindrome(head):
    # Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    prev = None
    while slow:
        next_node = slow.next
        slow.next = prev
        prev = slow
        slow = next_node
    
    # Compare
    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    
    return True
```

---

### 7. Intersection of Two Linked Lists
**Link:** [LeetCode #160](https://leetcode.com/problems/intersection-of-two-linked-lists/)

```python
def getIntersectionNode(headA, headB):
    if not headA or not headB:
        return None
    
    a, b = headA, headB
    
    while a != b:
        a = a.next if a else headB
        b = b.next if b else headA
    
    return a
```

---

### 8. Add Two Numbers
**Link:** [LeetCode #2](https://leetcode.com/problems/add-two-numbers/)

```python
def addTwoNumbers(l1, l2):
    dummy = ListNode(0)
    current = dummy
    carry = 0
    
    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        
        total = val1 + val2 + carry
        carry = total // 10
        
        current.next = ListNode(total % 10)
        current = current.next
        
        if l1:
            l1 = l1.next
        if l2:
            l2 = l2.next
    
    return dummy.next
```

---

### 9. Reorder List
**Link:** [LeetCode #143](https://leetcode.com/problems/reorder-list/)

```python
def reorderList(head):
    if not head or not head.next:
        return
    
    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    second = slow.next
    slow.next = None
    prev = None
    
    while second:
        next_node = second.next
        second.next = prev
        prev = second
        second = next_node
    
    # Merge
    first, second = head, prev
    while second:
        temp1, temp2 = first.next, second.next
        first.next = second
        second.next = temp1
        first, second = temp1, temp2
```

---

### 10. Copy List with Random Pointer
**Link:** [LeetCode #138](https://leetcode.com/problems/copy-list-with-random-pointer/)

```python
def copyRandomList(head):
    if not head:
        return None
    
    # Create copy nodes
    current = head
    while current:
        copy = Node(current.val)
        copy.next = current.next
        current.next = copy
        current = copy.next
    
    # Set random pointers
    current = head
    while current:
        if current.random:
            current.next.random = current.random.next
        current = current.next.next
    
    # Separate lists
    current = head
    copy_head = head.next
    while current:
        copy = current.next
        current.next = copy.next
        if copy.next:
            copy.next = copy.next.next
        current = current.next
    
    return copy_head
```

---

## 💡 Common Patterns

### 1. Two Pointers (Fast & Slow)
- Find middle
- Detect cycle
- Find nth from end

### 2. Dummy Node
- Simplify edge cases
- Merge operations
- Insert/delete at head

### 3. Reverse
- Reverse entire list
- Reverse in groups
- Palindrome check

### 4. Runner Technique
- Fast pointer moves 2x speed
- Slow pointer moves 1x speed

---

## 📊 Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Access | O(n) | O(1) |
| Search | O(n) | O(1) |
| Insert (beginning) | O(1) | O(1) |
| Insert (end) | O(n) | O(1) |
| Delete | O(n) | O(1) |

---

## 🎯 Practice Problems (15 total)

**Easy:**
1. Reverse Linked List
2. Merge Two Sorted Lists
3. Linked List Cycle
4. Remove Duplicates from Sorted List
5. Middle of Linked List

**Medium:**
1. Remove Nth Node From End
2. Add Two Numbers
3. Reorder List
4. Odd Even Linked List
5. Swap Nodes in Pairs
6. Rotate List
7. Partition List
8. Copy List with Random Pointer

**Hard:**
1. Reverse Nodes in k-Group
2. Merge k Sorted Lists

---

## 📚 Resources

- [Linked List Visualizer](https://visualgo.net/en/list)
- [LeetCode Linked List Tag](https://leetcode.com/tag/linked-list/)

---

**Master linked lists - they're everywhere! 🚀**
