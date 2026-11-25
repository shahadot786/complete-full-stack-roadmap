# 🐍 Python Fundamentals

> **Start your backend journey with Python**

## Why Python for Backend?

- Easy to learn and read
- Huge ecosystem
- Great for data science integration
- Fast development
- Strong community support

## Setup

```bash
# Install Python (use pyenv for version management)
curl https://pyenv.run | bash
pyenv install 3.11
pyenv global 3.11

# Verify
python --version
pip --version

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

## Python Basics

### Variables and Data Types

```python
# Variables
name = "John"
age = 30
is_active = True
price = 19.99

# Lists
fruits = ["apple", "banana", "orange"]
fruits.append("grape")

# Dictionaries
user = {
    "name": "John",
    "email": "john@example.com",
    "age": 30
}

# Tuples (immutable)
coordinates = (10, 20)
```

### Functions

```python
def greet(name):
    return f"Hello, {name}!"

# With type hints
def add(a: int, b: int) -> int:
    return a + b

# Default parameters
def create_user(name: str, age: int = 18):
    return {"name": name, "age": age}

# Lambda functions
square = lambda x: x ** 2
```

### Classes

```python
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
    
    def greet(self):
        return f"Hello, I'm {self.name}"

# Usage
user = User("John", "john@example.com")
print(user.greet())
```

## Flask - Lightweight Framework

### Installation

```bash
pip install flask
```

### Basic Flask App

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

users = []

@app.route('/')
def home():
    return {"message": "Hello Flask!"}

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/users', methods=['POST'])
def create_user():
    user = request.get_json()
    users.append(user)
    return jsonify(user), 201

@app.route('/users/<int:user_id>')
def get_user(user_id):
    if user_id < len(users):
        return jsonify(users[user_id])
    return {"error": "User not found"}, 404

if __name__ == '__main__':
    app.run(debug=True)
```

## File Operations

```python
# Read file
with open('file.txt', 'r') as f:
    content = f.read()

# Write file
with open('output.txt', 'w') as f:
    f.write('Hello World')

# JSON operations
import json

# Write JSON
data = {"name": "John", "age": 30}
with open('data.json', 'w') as f:
    json.dump(data, f)

# Read JSON
with open('data.json', 'r') as f:
    data = json.load(f)
```

## Working with APIs

```python
import requests

# GET request
response = requests.get('https://api.example.com/users')
users = response.json()

# POST request
new_user = {"name": "John", "email": "john@example.com"}
response = requests.post('https://api.example.com/users', json=new_user)

# With headers
headers = {"Authorization": "Bearer token"}
response = requests.get('https://api.example.com/profile', headers=headers)
```

## Database with SQLite

```python
import sqlite3

# Connect
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Create table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )
''')

# Insert
cursor.execute('INSERT INTO users (name, email) VALUES (?, ?)', 
               ('John', 'john@example.com'))
conn.commit()

# Query
cursor.execute('SELECT * FROM users')
users = cursor.fetchall()

# Close
conn.close()
```

## Error Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    print("Cleanup code")

# Custom exceptions
class UserNotFoundError(Exception):
    pass

def get_user(user_id):
    if user_id not in users:
        raise UserNotFoundError(f"User {user_id} not found")
    return users[user_id]
```

## List Comprehensions

```python
# Basic
squares = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Dictionary comprehension
user_emails = {user['id']: user['email'] for user in users}
```

## Project Structure

```
my-flask-app/
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   └── utils.py
├── tests/
│   └── test_app.py
├── venv/
├── requirements.txt
└── run.py
```

## Requirements File

```txt
# requirements.txt
Flask==3.0.0
requests==2.31.0
python-dotenv==1.0.0
```

```bash
# Install dependencies
pip install -r requirements.txt

# Generate requirements
pip freeze > requirements.txt
```

## Resources

- [Python Official Docs](https://docs.python.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Real Python](https://realpython.com/)
- Books in the `Books/` folder

**Next:** [Intermediate Python](../02-Intermediate/README.md)
