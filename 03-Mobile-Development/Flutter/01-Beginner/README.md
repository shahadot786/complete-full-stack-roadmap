# 📱 Flutter - Beginner Level

> **Master Dart and Flutter fundamentals**

---

## 📋 Table of Contents

- [Dart Fundamentals](#dart-fundamentals)
- [Flutter Basics](#flutter-basics)
- [Layouts](#layouts)
- [Navigation](#navigation)
- [Exercises](#exercises)

---

## 🎯 Dart Fundamentals

### Variables and Types

```dart
void main() {
  // Variables
  String name = 'Flutter';
  int age = 5;
  double version = 3.16;
  bool isAwesome = true;
  
  // Type inference
  var language = 'Dart'; // Inferred as String
  
  // Constants
  final DateTime now = DateTime.now(); // Runtime constant
  const double pi = 3.14159; // Compile-time constant
  
  // Null safety
  String? nullableName; // Can be null
  String nonNullName = 'Hello'; // Cannot be null
  
  // Null checks
  print(nullableName?.length); // Safe access
  print(nullableName ?? 'Default'); // Default value
  print(nullableName!); // Force unwrap (dangerous)
}
```

### Functions

```dart
// Basic function
int add(int a, int b) {
  return a + b;
}

// Arrow function
int multiply(int a, int b) => a * b;

// Named parameters
void greet({required String name, int? age}) {
  print('Hello, $name! Age: ${age ?? 'Unknown'}');
}

// Optional positional parameters
void log(String message, [String? prefix]) {
  print('${prefix ?? 'LOG'}: $message');
}

// Higher-order functions
List<int> doubleNumbers(List<int> numbers) {
  return numbers.map((n) => n * 2).toList();
}

void main() {
  print(add(2, 3)); // 5
  print(multiply(4, 5)); // 20
  greet(name: 'Alice', age: 25);
  log('Hello'); // LOG: Hello
  log('Hello', 'INFO'); // INFO: Hello
}
```

### Classes and OOP

```dart
// Class definition
class Person {
  String name;
  int age;
  
  // Constructor
  Person(this.name, this.age);
  
  // Named constructor
  Person.guest() : name = 'Guest', age = 0;
  
  // Method
  void introduce() {
    print('Hi, I\'m $name, $age years old.');
  }
  
  // Getter
  bool get isAdult => age >= 18;
  
  // Setter
  set newAge(int value) {
    if (value >= 0) age = value;
  }
}

// Inheritance
class Employee extends Person {
  String company;
  
  Employee(String name, int age, this.company) : super(name, age);
  
  @override
  void introduce() {
    super.introduce();
    print('I work at $company.');
  }
}

// Abstract class
abstract class Shape {
  double get area;
  void draw();
}

class Circle implements Shape {
  final double radius;
  Circle(this.radius);
  
  @override
  double get area => 3.14159 * radius * radius;
  
  @override
  void draw() => print('Drawing circle');
}
```

### Async/Await

```dart
// Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Data loaded!';
}

// Using async/await
void main() async {
  print('Loading...');
  String data = await fetchData();
  print(data);
}

// Stream
Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

// Listening to stream
void listenToStream() async {
  await for (int number in countStream(5)) {
    print('Count: $number');
  }
}
```

### Collections

```dart
void main() {
  // List
  List<String> fruits = ['Apple', 'Banana', 'Orange'];
  fruits.add('Mango');
  fruits.removeAt(0);
  
  // List methods
  var doubled = [1, 2, 3].map((n) => n * 2).toList();
  var evens = [1, 2, 3, 4, 5].where((n) => n % 2 == 0).toList();
  var sum = [1, 2, 3, 4].reduce((a, b) => a + b);
  
  // Map
  Map<String, int> ages = {
    'Alice': 25,
    'Bob': 30,
  };
  ages['Charlie'] = 35;
  
  // Set
  Set<int> numbers = {1, 2, 3, 3, 4};
  print(numbers); // {1, 2, 3, 4} - no duplicates
  
  // Spread operator
  var combined = [...fruits, 'Grape'];
  
  // Collection if/for
  var items = [
    'Always here',
    if (true) 'Conditional item',
    for (var i = 0; i < 3; i++) 'Item $i',
  ];
}
```

---

## 🧩 Flutter Basics

### Hello World

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hello Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('My First App'),
        ),
        body: const Center(
          child: Text(
            'Hello, Flutter!',
            style: TextStyle(fontSize: 24),
          ),
        ),
      ),
    );
  }
}
```

### StatelessWidget

```dart
class GreetingCard extends StatelessWidget {
  final String name;
  
  const GreetingCard({
    super.key,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Text(
          'Hello, $name!',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
      ),
    );
  }
}
```

### StatefulWidget

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  void _increment() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Count: $_count',
          style: const TextStyle(fontSize: 48),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: _increment,
          child: const Text('Increment'),
        ),
      ],
    );
  }
}
```

### Common Widgets

```dart
class WidgetShowcase extends StatelessWidget {
  const WidgetShowcase({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Widgets')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Text
            const Text(
              'Hello World',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.blue,
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Image
            Image.network(
              'https://picsum.photos/200',
              width: 200,
              height: 200,
              fit: BoxFit.cover,
            ),
            
            const SizedBox(height: 16),
            
            // Buttons
            ElevatedButton(
              onPressed: () {},
              child: const Text('Elevated'),
            ),
            
            TextButton(
              onPressed: () {},
              child: const Text('Text Button'),
            ),
            
            OutlinedButton(
              onPressed: () {},
              child: const Text('Outlined'),
            ),
            
            IconButton(
              icon: const Icon(Icons.favorite),
              onPressed: () {},
            ),
            
            const SizedBox(height: 16),
            
            // TextField
            const TextField(
              decoration: InputDecoration(
                labelText: 'Enter name',
                border: OutlineInputBorder(),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Card
            Card(
              child: ListTile(
                leading: const Icon(Icons.person),
                title: const Text('John Doe'),
                subtitle: const Text('Software Developer'),
                trailing: const Icon(Icons.arrow_forward),
                onTap: () {},
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

## 📐 Layouts

### Row and Column

```dart
class LayoutExample extends StatelessWidget {
  const LayoutExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Row
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildBox(Colors.red),
            _buildBox(Colors.green),
            _buildBox(Colors.blue),
          ],
        ),
        
        const SizedBox(height: 20),
        
        // Expanded
        Row(
          children: [
            Expanded(
              flex: 2,
              child: Container(
                height: 50,
                color: Colors.orange,
              ),
            ),
            Expanded(
              flex: 1,
              child: Container(
                height: 50,
                color: Colors.purple,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildBox(Color color) {
    return Container(
      width: 60,
      height: 60,
      color: color,
    );
  }
}
```

### Stack

```dart
class StackExample extends StatelessWidget {
  const StackExample({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        // Background
        Container(
          width: 200,
          height: 200,
          color: Colors.blue,
        ),
        
        // Middle layer
        Container(
          width: 150,
          height: 150,
          color: Colors.green,
        ),
        
        // Top layer
        const Text(
          'Stacked!',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        
        // Positioned widget
        Positioned(
          top: 10,
          right: 10,
          child: IconButton(
            icon: const Icon(Icons.close),
            onPressed: () {},
          ),
        ),
      ],
    );
  }
}
```

### ListView

```dart
class ListViewExample extends StatelessWidget {
  final List<String> items = List.generate(100, (i) => 'Item $i');

  ListViewExample({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        return ListTile(
          leading: CircleAvatar(
            child: Text('${index + 1}'),
          ),
          title: Text(items[index]),
          subtitle: Text('Description for ${items[index]}'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {
            print('Tapped ${items[index]}');
          },
        );
      },
    );
  }
}
```

### GridView

```dart
class GridViewExample extends StatelessWidget {
  const GridViewExample({super.key});

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
      ),
      itemCount: 20,
      itemBuilder: (context, index) {
        return Card(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.image,
                size: 48,
                color: Colors.grey[400],
              ),
              const SizedBox(height: 8),
              Text('Item $index'),
            ],
          ),
        );
      },
    );
  }
}
```

---

## 🧭 Navigation

### Basic Navigation

```dart
// Navigate to new screen
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => const SecondScreen()),
);

// Go back
Navigator.pop(context);

// Navigate and remove previous screen
Navigator.pushReplacement(
  context,
  MaterialPageRoute(builder: (context) => const HomeScreen()),
);

// Clear all and navigate
Navigator.pushAndRemoveUntil(
  context,
  MaterialPageRoute(builder: (context) => const LoginScreen()),
  (route) => false,
);
```

### Named Routes

```dart
// Define routes in MaterialApp
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => const HomeScreen(),
    '/details': (context) => const DetailsScreen(),
    '/settings': (context) => const SettingsScreen(),
  },
);

// Navigate using named route
Navigator.pushNamed(context, '/details');

// With arguments
Navigator.pushNamed(
  context,
  '/details',
  arguments: {'id': 123, 'title': 'Item'},
);

// Receive arguments
final args = ModalRoute.of(context)!.settings.arguments as Map;
```

### Passing Data

```dart
class DetailScreen extends StatelessWidget {
  final String title;
  final int id;

  const DetailScreen({
    super.key,
    required this.title,
    required this.id,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(
        child: Text('ID: $id'),
      ),
    );
  }
}

// Navigate with data
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => const DetailScreen(
      title: 'Product Details',
      id: 123,
    ),
  ),
);
```

---

## 🏋️ Exercises

### Exercise 1: Profile Card
Create a profile card with:
- Circular avatar image
- Name and title
- Bio text
- Social media icons

### Exercise 2: Counter App
Build a counter with:
- Display count
- Increment/Decrement buttons
- Reset button
- Custom styling

### Exercise 3: Todo List
Create a todo app with:
- Add new todos
- Mark as complete
- Delete todos
- Use ListView

### Exercise 4: Multi-Screen App
Build an app with:
- Home screen with list
- Detail screen
- Settings screen
- Navigation between screens

---

## ✅ Checklist

- [ ] Understand Dart basics
- [ ] Master null safety
- [ ] Create StatelessWidget
- [ ] Create StatefulWidget
- [ ] Use Row, Column, Stack
- [ ] Implement ListView/GridView
- [ ] Navigate between screens
- [ ] Pass data between screens
- [ ] Complete all exercises

---

**Next: [Intermediate Level](../02-Intermediate/) →**
