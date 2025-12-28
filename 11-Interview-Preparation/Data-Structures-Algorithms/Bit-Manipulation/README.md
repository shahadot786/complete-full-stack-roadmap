# 🔢 Bit Manipulation

> **Manipulate bits directly - fast and memory-efficient**

---

## 🎯 Bitwise Operators

```python
& (AND)     # Both bits 1
| (OR)      # At least one bit 1
^ (XOR)     # Exactly one bit 1
~ (NOT)     # Flip bits
<< (Left Shift)   # Multiply by 2
>> (Right Shift)  # Divide by 2
```

---

## 💡 Common Tricks

```python
# Check if power of 2
n & (n - 1) == 0

# Get ith bit
(n >> i) & 1

# Set ith bit
n | (1 << i)

# Clear ith bit
n & ~(1 << i)

# Toggle ith bit
n ^ (1 << i)

# Count set bits
bin(n).count('1')

# Swap without temp
a ^= b
b ^= a
a ^= b
```

---

## 🔥 LeetCode Problems

### 1. Single Number
**Link:** [LeetCode #136](https://leetcode.com/problems/single-number/)

```python
def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```

### 2. Number of 1 Bits
**Link:** [LeetCode #191](https://leetcode.com/problems/number-of-1-bits/)

```python
def hammingWeight(n):
    count = 0
    while n:
        n &= n - 1  # Clear rightmost 1
        count += 1
    return count
```

### 3. Reverse Bits
**Link:** [LeetCode #190](https://leetcode.com/problems/reverse-bits/)

```python
def reverseBits(n):
    result = 0
    for i in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result
```

---

**Master bit manipulation for efficiency! 🚀**
