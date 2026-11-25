# 📚 Programming Fundamentals

> **Master the basics - the foundation of all programming**

---

## 🎯 Core Concepts

### 1. Variables and Data Types

**Primitive Types:**
```python
# Integer
age = 25
count = -10

# Float
price = 19.99
pi = 3.14159

# String
name = "John Doe"
message = 'Hello, World!'

# Boolean
is_active = True
has_permission = False

# None/Null
result = None
```

**Type Conversion:**
```python
# String to Integer
num = int("123")  # 123

# Integer to String
text = str(456)  # "456"

# String to Float
decimal = float("3.14")  # 3.14

# Check type
type(variable)
isinstance(variable, int)
```

---

### 2. Operators

**Arithmetic:**
```python
a + b   # Addition
a - b   # Subtraction
a * b   # Multiplication
a / b   # Division (float)
a // b  # Floor division
a % b   # Modulo
a ** b  # Exponentiation
```

**Comparison:**
```python
a == b  # Equal
a != b  # Not equal
a > b   # Greater than
a < b   # Less than
a >= b  # Greater or equal
a <= b  # Less or equal
```

**Logical:**
```python
and  # Both conditions true
or   # At least one true
not  # Negation
```

---

### 3. Control Flow

**If-Else:**
```python
if condition:
    # code
elif another_condition:
    # code
else:
    # code
```

**Ternary Operator:**
```python
result = value_if_true if condition else value_if_false
```

---

### 4. Loops

**For Loop:**
```python
# Iterate over range
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# Iterate over list
for item in my_list:
    print(item)

# Enumerate (index + value)
for index, value in enumerate(my_list):
    print(f"{index}: {value}")
```

**While Loop:**
```python
while condition:
    # code
    # update condition to avoid infinite loop
```

**Loop Control:**
```python
break     # Exit loop
continue  # Skip to next iteration
pass      # Do nothing (placeholder)
```

---

### 5. Functions

**Basic Function:**
```python
def greet(name):
    return f"Hello, {name}!"

result = greet("Alice")
```

**Default Parameters:**
```python
def power(base, exponent=2):
    return base ** exponent

power(3)     # 9
power(3, 3)  # 27
```

**Variable Arguments:**
```python
def sum_all(*args):
    return sum(args)

sum_all(1, 2, 3, 4)  # 10

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="John", age=25)
```

**Lambda Functions:**
```python
square = lambda x: x ** 2
add = lambda a, b: a + b

# With map, filter
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
```

---

### 6. Data Structures

**Lists (Arrays):**
```python
# Create
my_list = [1, 2, 3, 4, 5]
empty = []

# Access
first = my_list[0]
last = my_list[-1]

# Slice
subset = my_list[1:4]  # [2, 3, 4]

# Methods
my_list.append(6)
my_list.insert(0, 0)
my_list.remove(3)
my_list.pop()
my_list.sort()
my_list.reverse()

# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
```

**Tuples (Immutable):**
```python
point = (10, 20)
x, y = point  # Unpacking

# Named tuples
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
```

**Dictionaries (Hash Maps):**
```python
# Create
person = {
    "name": "John",
    "age": 25,
    "city": "NYC"
}

# Access
name = person["name"]
age = person.get("age", 0)  # Default value

# Methods
person["email"] = "john@example.com"
del person["city"]
keys = person.keys()
values = person.values()
items = person.items()

# Dict comprehension
squares = {x: x**2 for x in range(5)}
```

**Sets:**
```python
# Create
my_set = {1, 2, 3, 4, 5}
empty_set = set()

# Operations
my_set.add(6)
my_set.remove(3)
my_set.discard(10)  # No error if not exists

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}
union = a | b
intersection = a & b
difference = a - b
```

---

### 7. Strings

**String Operations:**
```python
s = "Hello, World!"

# Length
len(s)

# Case
s.upper()
s.lower()
s.title()

# Search
s.find("World")  # Index or -1
s.index("World")  # Index or error
"Hello" in s     # Boolean

# Replace
s.replace("World", "Python")

# Split/Join
words = s.split(", ")
joined = "-".join(words)

# Strip
s.strip()   # Remove whitespace
s.lstrip()
s.rstrip()

# Format
name = "Alice"
age = 25
f"Name: {name}, Age: {age}"
"Name: {}, Age: {}".format(name, age)
```

---

### 8. Input/Output

**Console I/O:**
```python
# Input
name = input("Enter your name: ")
age = int(input("Enter your age: "))

# Output
print("Hello, World!")
print(f"Name: {name}, Age: {age}")
print(name, age, sep=", ", end="\n")
```

**File I/O:**
```python
# Read
with open("file.txt", "r") as f:
    content = f.read()
    lines = f.readlines()

# Write
with open("file.txt", "w") as f:
    f.write("Hello, World!\n")
    f.writelines(["Line 1\n", "Line 2\n"])

# Append
with open("file.txt", "a") as f:
    f.write("New line\n")
```

---

### 9. Exception Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Error: {e}")
else:
    print("No errors")
finally:
    print("Always executes")

# Raise exceptions
raise ValueError("Invalid value")

# Custom exceptions
class CustomError(Exception):
    pass
```

---

### 10. Common Patterns

**Swap Variables:**
```python
a, b = b, a
```

**Multiple Assignment:**
```python
x = y = z = 0
a, b, c = 1, 2, 3
```

**Check Multiple Conditions:**
```python
if x in [1, 2, 3, 4, 5]:
    # code

if any([cond1, cond2, cond3]):
    # code

if all([cond1, cond2, cond3]):
    # code
```

**Default Dictionary:**
```python
from collections import defaultdict

count = defaultdict(int)
count['a'] += 1  # No KeyError
```

**Counter:**
```python
from collections import Counter

words = ['apple', 'banana', 'apple']
count = Counter(words)
# Counter({'apple': 2, 'banana': 1})
```

---

## 🎯 Practice Problems

1. **FizzBuzz** - Print numbers 1-100, "Fizz" for multiples of 3, "Buzz" for 5, "FizzBuzz" for both
2. **Palindrome Check** - Check if string reads same forwards/backwards
3. **Anagram Check** - Check if two strings are anagrams
4. **Find Duplicates** - Find duplicate elements in array
5. **Reverse String** - Reverse a string in-place
6. **Count Vowels** - Count vowels in a string
7. **Prime Numbers** - Check if number is prime
8. **Factorial** - Calculate factorial recursively and iteratively
9. **Fibonacci** - Generate Fibonacci sequence
10. **Array Rotation** - Rotate array by k positions

---

## 📚 Resources

- [Python Official Tutorial](https://docs.python.org/3/tutorial/)
- [JavaScript.info](https://javascript.info/)
- [Java Tutorial](https://docs.oracle.com/javase/tutorial/)
- [Learn Python the Hard Way](https://learnpythonthehardway.org/)

---

**Master the fundamentals - everything builds on this! 🚀**
