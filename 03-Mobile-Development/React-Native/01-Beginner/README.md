# 📱 React Native - Beginner Level

> **Master the fundamentals of React Native development**

---

## 📋 Table of Contents

- [Environment Setup](#environment-setup)
- [Core Components](#core-components)
- [Styling](#styling)
- [Navigation](#navigation)
- [Exercises](#exercises)

---

## 🔧 Environment Setup

### Using Expo (Recommended)

Expo is the easiest way to get started with React Native.

```bash
# Create a new Expo project
npx create-expo-app@latest MyFirstApp --template blank-typescript

# Navigate to project
cd MyFirstApp

# Start the development server
npx expo start
```

**Scan the QR code with:**
- iOS: Camera app → Expo Go
- Android: Expo Go app

### Project Structure

```
MyFirstApp/
├── App.tsx           # Entry point
├── app.json          # App configuration
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript config
├── assets/           # Images, fonts
└── node_modules/     # Dependencies
```

---

## 🧩 Core Components

### View - The Container Component

```tsx
import { View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#3498db',
  },
});
```

### Text - Displaying Text

```tsx
import { Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <Text style={styles.title}>
      Hello, React Native! 👋
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});
```

### Image - Displaying Images

```tsx
import { Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <>
      {/* Local image */}
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.image}
      />
      
      {/* Remote image */}
      <Image 
        source={{ uri: 'https://picsum.photos/200' }}
        style={styles.image}
      />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
```

### ScrollView - Scrollable Content

```tsx
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {[...Array(20)].map((_, i) => (
        <Text key={i} style={styles.item}>
          Item {i + 1}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    fontSize: 18,
    backgroundColor: '#ecf0f1',
    marginBottom: 10,
  },
});
```

### FlatList - Optimized Lists

```tsx
import { FlatList, Text, View, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', title: 'First Item' },
  { id: '2', title: 'Second Item' },
  { id: '3', title: 'Third Item' },
];

export default function App() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
});
```

### TextInput - User Input

```tsx
import { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default function App() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={text}
        onChangeText={setText}
      />
      <Text style={styles.greeting}>
        Hello, {text || 'Stranger'}!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center',
  },
});
```

### Pressable - Touch Handling

```tsx
import { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed
      ]}
      onPress={() => setCount(c => c + 1)}
    >
      <Text style={styles.buttonText}>
        Count: {count}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9b59b6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

---

## 🎨 Styling

### Flexbox Layout

React Native uses Flexbox for layout, with some differences from web:

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function FlexboxDemo() {
  return (
    <View style={styles.container}>
      {/* Row layout */}
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#e74c3c' }]} />
        <View style={[styles.box, { backgroundColor: '#3498db' }]} />
        <View style={[styles.box, { backgroundColor: '#2ecc71' }]} />
      </View>
      
      {/* Space between */}
      <View style={styles.spaceBetween}>
        <Text>Left</Text>
        <Text>Right</Text>
      </View>
      
      {/* Centered content */}
      <View style={styles.centered}>
        <Text>Centered!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    width: 50,
    height: 50,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ecf0f1',
    marginTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f39c12',
  },
});
```

### Platform-Specific Styles

```tsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
```

### Common Style Properties

```tsx
const styles = StyleSheet.create({
  // Sizing
  fullWidth: { width: '100%' },
  fixedHeight: { height: 200 },
  
  // Spacing
  margins: { margin: 10, marginTop: 20 },
  padding: { padding: 15, paddingHorizontal: 20 },
  
  // Borders
  bordered: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  
  // Colors
  colored: {
    backgroundColor: '#3498db',
    color: '#ffffff',
  },
  
  // Typography
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // Position
  absolute: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
```

---

## 🧭 Navigation

### Installing React Navigation

```bash
# Core package
npm install @react-navigation/native

# Dependencies for Expo
npx expo install react-native-screens react-native-safe-area-context

# Stack navigator
npm install @react-navigation/native-stack

# Tab navigator
npm install @react-navigation/bottom-tabs
```

### Stack Navigation

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { id: 123 })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { id } = route.params;
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Details for ID: {id}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
```

### Tab Navigation

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

## 🏋️ Exercises

### Exercise 1: Profile Card
Create a profile card component with:
- Profile image (use a placeholder)
- Name and bio text
- Social media buttons
- Proper styling with shadows

### Exercise 2: Counter App
Build a counter with:
- Display current count
- Increment and decrement buttons
- Reset button
- Style with colors and proper layout

### Exercise 3: Todo List
Create a simple todo list with:
- Text input to add items
- List of items
- Delete button for each item
- Use useState for state management

### Exercise 4: Multi-Screen App
Build an app with:
- Bottom tab navigation
- At least 3 screens
- Stack navigation on one tab
- Custom tab bar icons

---

## 📚 Resources

### Books
- "React Native in Action" by Nader Dabit
- "Learning React Native" by Bonnie Eisenman

### Videos
- [React Native Tutorial for Beginners](https://www.youtube.com/watch?v=0-S5a0eXPoc)
- [Build a React Native App](https://www.youtube.com/watch?v=VozPNrt-LfE)

### Projects
- [Beginner Projects](./Projects/)
- [Video Tutorials](./Videos/)
- [Recommended Books](./Books/)

---

## ✅ Checklist

- [ ] Set up Expo environment
- [ ] Understand View, Text, Image components
- [ ] Master TextInput and Pressable
- [ ] Use FlatList for lists
- [ ] Apply Flexbox styling
- [ ] Implement Stack navigation
- [ ] Implement Tab navigation
- [ ] Complete all 4 exercises
- [ ] Build 2 practice projects

---

**Next: [Intermediate Level](../02-Intermediate/) →**
