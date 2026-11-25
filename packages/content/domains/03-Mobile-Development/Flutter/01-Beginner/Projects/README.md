# 🚀 Flutter Beginner Projects

> **Build these projects to master Flutter fundamentals**

---

## Project 1: Hello Flutter

### 📋 Description
Your first Flutter app with custom styling.

### 🎯 Learning Objectives
- Project structure
- MaterialApp setup
- Basic widgets
- Styling

### ✨ Features
- [ ] Welcome message
- [ ] Custom fonts
- [ ] Theme colors
- [ ] Centered layout

### 💻 Sample Code
```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Hello Flutter')),
        body: const Center(
          child: Text(
            'Welcome to Flutter!',
            style: TextStyle(fontSize: 24),
          ),
        ),
      ),
    );
  }
}
```

### ⏱️ Estimated Time
1-2 hours

---

## Project 2: Counter App

### 📋 Description
Classic counter with StatefulWidget.

### 🎯 Learning Objectives
- StatefulWidget
- setState()
- Button interactions
- Event handling

### ✨ Features
- [ ] Display count
- [ ] Increment button
- [ ] Decrement button
- [ ] Reset button

### ⏱️ Estimated Time
2-3 hours

---

## Project 3: Profile Card

### 📋 Description
Beautiful profile card with image and details.

### 🎯 Learning Objectives
- Column and Row
- CircleAvatar
- Card widget
- Padding and margins

### ✨ Features
- [ ] Profile image
- [ ] Name and title
- [ ] Bio text
- [ ] Social icons
- [ ] Card shadow

### ⏱️ Estimated Time
3-4 hours

---

## Project 4: Todo List

### 📋 Description
Simple todo app with add/delete.

### 🎯 Learning Objectives
- ListView
- TextField
- List manipulation
- Dismissible widget

### ✨ Features
- [ ] Add todos
- [ ] Display list
- [ ] Check off items
- [ ] Swipe to delete
- [ ] Empty state

### 💻 Sample Code
```dart
class TodoList extends StatefulWidget {
  @override
  _TodoListState createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  final List<String> _todos = [];
  final _controller = TextEditingController();

  void _addTodo() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        _todos.add(_controller.text);
        _controller.clear();
      });
    }
  }

  // ... build method
}
```

### ⏱️ Estimated Time
4-5 hours

---

## Project 5: Quiz App

### 📋 Description
Interactive quiz with score tracking.

### 🎯 Learning Objectives
- Multiple screens
- Navigator
- State across screens
- Result calculation

### ✨ Features
- [ ] Start screen
- [ ] Questions display
- [ ] Multiple choice
- [ ] Score tracking
- [ ] Results screen

### ⏱️ Estimated Time
6-8 hours

---

## Project 6: BMI Calculator

### 📋 Description
Calculate and display BMI with styling.

### 🎯 Learning Objectives
- Slider widget
- Custom widgets
- Calculations
- Result display

### ✨ Features
- [ ] Height input (slider)
- [ ] Weight input (slider)
- [ ] Calculate button
- [ ] BMI result
- [ ] Category display

### ⏱️ Estimated Time
5-6 hours

---

## 📊 Project Tracker

| # | Project | Status |
|---|---------|--------|
| 1 | Hello Flutter | ⬜ |
| 2 | Counter App | ⬜ |
| 3 | Profile Card | ⬜ |
| 4 | Todo List | ⬜ |
| 5 | Quiz App | ⬜ |
| 6 | BMI Calculator | ⬜ |

---

**Next: [Video Tutorials](../Videos/)**
