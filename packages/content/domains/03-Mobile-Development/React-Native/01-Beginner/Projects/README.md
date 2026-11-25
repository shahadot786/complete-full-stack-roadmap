# 🚀 React Native Beginner Projects

> **Build these projects to solidify your React Native fundamentals**

---

## Project 1: Hello World App

### 📋 Description
Create your first React Native app with basic components and styling.

### 🎯 Learning Objectives
- Set up development environment
- Understand project structure
- Use basic components (View, Text)
- Apply styles with StyleSheet

### ✨ Features
- [ ] Welcome message
- [ ] Styled text with custom fonts
- [ ] Background color
- [ ] Centered layout

### 📝 Code Structure
```
HelloWorld/
├── App.tsx
├── components/
│   └── WelcomeMessage.tsx
└── styles/
    └── theme.ts
```

### ⏱️ Estimated Time
1-2 hours

---

## Project 2: Counter App

### 📋 Description
Build a counter with increment, decrement, and reset functionality.

### 🎯 Learning Objectives
- useState hook
- Event handling
- Button components
- State updates

### ✨ Features
- [ ] Display current count
- [ ] Increment button (+)
- [ ] Decrement button (-)
- [ ] Reset button
- [ ] Styled buttons with feedback

### 💻 Sample Code
```tsx
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttons}>
        <Button title="-" onPress={() => setCount(c => c - 1)} />
        <Button title="Reset" onPress={() => setCount(0)} />
        <Button title="+" onPress={() => setCount(c => c + 1)} />
      </View>
    </View>
  );
}
```

### ⏱️ Estimated Time
2-3 hours

---

## Project 3: Profile Card

### 📋 Description
Create a professional profile card component with avatar and details.

### 🎯 Learning Objectives
- Image component
- Flexbox layouts
- Props passing
- Component composition

### ✨ Features
- [ ] Circular avatar image
- [ ] Name and title
- [ ] Bio text
- [ ] Social media icons
- [ ] Card shadow/elevation

### 📝 Code Structure
```
ProfileCard/
├── App.tsx
├── components/
│   ├── ProfileCard.tsx
│   ├── Avatar.tsx
│   ├── SocialLinks.tsx
│   └── Badge.tsx
└── data/
    └── profile.ts
```

### ⏱️ Estimated Time
3-4 hours

---

## Project 4: Todo List (Simple)

### 📋 Description
Build a basic todo list with add and delete functionality.

### 🎯 Learning Objectives
- TextInput component
- FlatList component
- Array state management
- Keyboard handling

### ✨ Features
- [ ] Add new todos
- [ ] Display todo list
- [ ] Delete todos
- [ ] Empty state message
- [ ] Keyboard dismiss

### 💻 Sample Code
```tsx
const [todos, setTodos] = useState<string[]>([]);
const [input, setInput] = useState('');

const addTodo = () => {
  if (input.trim()) {
    setTodos([...todos, input.trim()]);
    setInput('');
  }
};

const deleteTodo = (index: number) => {
  setTodos(todos.filter((_, i) => i !== index));
};
```

### ⏱️ Estimated Time
4-5 hours

---

## Project 5: Quiz App

### 📋 Description
Create an interactive quiz with multiple choice questions.

### 🎯 Learning Objectives
- Screen navigation basics
- Conditional rendering
- Score tracking
- Result screen

### ✨ Features
- [ ] Start screen
- [ ] Question display
- [ ] Multiple choice options
- [ ] Answer feedback
- [ ] Score tracking
- [ ] Results screen
- [ ] Restart quiz

### 📝 Data Structure
```tsx
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
```

### ⏱️ Estimated Time
6-8 hours

---

## Project 6: Color Palette Generator

### 📋 Description
Generate random color palettes with copy-to-clipboard.

### 🎯 Learning Objectives
- Random color generation
- Clipboard API
- Alert/Toast feedback
- TouchableOpacity

### ✨ Features
- [ ] Generate random colors
- [ ] Display 5-color palette
- [ ] Show hex codes
- [ ] Copy color on tap
- [ ] Refresh button

### ⏱️ Estimated Time
3-4 hours

---

## 📊 Project Completion Tracker

| # | Project | Status | Time Spent |
|---|---------|--------|------------|
| 1 | Hello World | ⬜ | - |
| 2 | Counter App | ⬜ | - |
| 3 | Profile Card | ⬜ | - |
| 4 | Todo List | ⬜ | - |
| 5 | Quiz App | ⬜ | - |
| 6 | Color Palette | ⬜ | - |

---

## 💡 Tips

1. **Start simple** - Get it working first, then improve
2. **Use TypeScript** - Catch errors early
3. **Test on device** - Simulators miss some issues
4. **Read error messages** - They're usually helpful
5. **Commit often** - Track your progress with Git

---

**Next: [Video Tutorials](../Videos/)**
