# ⚡ React Native - Intermediate Level

> **Build production-ready apps with state management, APIs, and native features**

---

## 📋 Table of Contents

- [State Management](#state-management)
- [API Integration](#api-integration)
- [Local Storage](#local-storage)
- [Forms & Validation](#forms--validation)
- [Native Features](#native-features)

---

## 🗄️ State Management

### Context API

Built-in solution for sharing state across components.

```tsx
// contexts/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

```tsx
// App.tsx
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { View, Text, Button, StyleSheet } from 'react-native';

function ThemedScreen() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff' }
    ]}>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
        Current theme: {theme}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedScreen />
    </ThemeProvider>
  );
}
```

### Zustand (Recommended)

Lightweight and simple state management.

```bash
npm install zustand
```

```tsx
// stores/useStore.ts
import { create } from 'zustand';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, {
      id: Date.now().toString(),
      text,
      completed: false,
    }],
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id),
  })),
}));
```

```tsx
// components/TodoList.tsx
import { useTodoStore } from '../stores/useStore';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();

  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.todoItem}>
          <Pressable onPress={() => toggleTodo(item.id)} style={styles.checkbox}>
            <Text>{item.completed ? '✅' : '⬜'}</Text>
          </Pressable>
          <Text style={[
            styles.todoText,
            item.completed && styles.completed
          ]}>
            {item.text}
          </Text>
          <Pressable onPress={() => deleteTodo(item.id)}>
            <Text style={styles.delete}>🗑️</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    borderRadius: 8,
  },
  checkbox: {
    marginRight: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  delete: {
    fontSize: 20,
  },
});
```

### Redux Toolkit

For complex applications with many features.

```bash
npm install @reduxjs/toolkit react-redux
```

```tsx
// store/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

```tsx
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 🌐 API Integration

### Fetch API

```tsx
import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.userCard}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  userCard: {
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    color: '#666',
    marginTop: 5,
  },
});
```

### React Query (TanStack Query)

Best for data fetching with caching, refetching, and more.

```bash
npm install @tanstack/react-query
```

```tsx
// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersScreen />
    </QueryClientProvider>
  );
}
```

```tsx
// screens/UsersScreen.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { View, Text, FlatList, Button, ActivityIndicator } from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export function UsersScreen() {
  const queryClient = useQueryClient();
  
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading users</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Button title="Refresh" onPress={() => refetch()} />
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

---

## 💾 Local Storage

### AsyncStorage

```bash
npm install @react-native-async-storage/async-storage
```

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
const storeData = async (key: string, value: object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save data', e);
  }
};

// Retrieve data
const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
};

// Remove data
const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove data', e);
  }
};
```

### Custom Hook for Storage

```tsx
// hooks/useStorage.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredValue();
  }, []);

  const loadStoredValue = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setValue = async (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return { value: storedValue, setValue, loading };
}
```

---

## 📝 Forms & Validation

### React Hook Form

```bash
npm install react-hook-form zod @hookform/resolvers
```

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter password"
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  error: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
});
```

---

## 📱 Native Features

### Camera (Expo)

```bash
npx expo install expo-camera
```

```tsx
import { useState, useRef } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Button title="Grant Camera Permission" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo?.uri || null);
    }
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        <Button title="Take Another" onPress={() => setPhoto(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  preview: {
    flex: 1,
    resizeMode: 'contain',
  },
});
```

### Location (Expo)

```bash
npx expo install expo-location
```

```tsx
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (err) {
      setError('Could not get location');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Location" onPress={getLocation} />
      
      {location && (
        <View style={styles.locationInfo}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationInfo: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
```

---

## ✅ Checklist

- [ ] Implement Context API for theming
- [ ] Use Zustand for state management
- [ ] Fetch data from REST API
- [ ] Implement React Query
- [ ] Use AsyncStorage for persistence
- [ ] Build form with validation
- [ ] Access device camera
- [ ] Get device location
- [ ] Complete intermediate projects

---

**Next: [Advanced Level](../03-Advanced/) →**
