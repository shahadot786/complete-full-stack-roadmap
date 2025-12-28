# 🔢 Mathematical Foundations

> **Number theory and combinatorics - essential for problem-solving**

---

## 🎯 Core Concepts

### Prime Numbers

```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# Sieve of Eratosthenes
def sieve_of_eratosthenes(n):
    primes = [True] * (n + 1)
    primes[0] = primes[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if primes[i]:
            for j in range(i*i, n + 1, i):
                primes[j] = False
    
    return [i for i in range(n + 1) if primes[i]]
```

### GCD & LCM

```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return (a * b) // gcd(a, b)
```

### Factorial & Combinations

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def combinations(n, r):
    return factorial(n) // (factorial(r) * factorial(n - r))

def permutations(n, r):
    return factorial(n) // factorial(n - r)
```

### Power & Modulo

```python
def power(base, exp, mod=None):
    result = 1
    base = base % mod if mod else base
    
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod if mod else result * base
        exp = exp >> 1
        base = (base * base) % mod if mod else base * base
    
    return result
```

---

## 🔥 LeetCode Problems

### 1. Count Primes
**Link:** [LeetCode #204](https://leetcode.com/problems/count-primes/)

```python
def countPrimes(n):
    if n < 2:
        return 0
    
    primes = [True] * n
    primes[0] = primes[1] = False
    
    for i in range(2, int(n**0.5) + 1):
        if primes[i]:
            for j in range(i*i, n, i):
                primes[j] = False
    
    return sum(primes)
```

### 2. Pow(x, n)
**Link:** [LeetCode #50](https://leetcode.com/problems/powx-n/)

```python
def myPow(x, n):
    if n == 0:
        return 1
    if n < 0:
        x = 1 / x
        n = -n
    
    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    
    return result
```

---

**Master math for competitive programming! 🚀**
