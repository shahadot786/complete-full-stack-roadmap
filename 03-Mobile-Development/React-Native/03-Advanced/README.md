# 🚀 React Native - Advanced Level

> **Build performant, polished, production-ready mobile applications**

---

## 📋 Table of Contents

- [Performance Optimization](#performance-optimization)
- [Animations](#animations)
- [Testing](#testing)
- [App Publishing](#app-publishing)
- [CI/CD](#cicd)

---

## ⚡ Performance Optimization

### Memoization

```tsx
import { memo, useMemo, useCallback } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

interface Item {
  id: string;
  title: string;
}

// Memoized component - only re-renders when props change
const ListItem = memo(function ListItem({ 
  item, 
  onPress 
}: { 
  item: Item; 
  onPress: (id: string) => void 
}) {
  console.log('Rendering:', item.title);
  
  return (
    <Pressable onPress={() => onPress(item.id)} style={styles.item}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

export function OptimizedList({ items }: { items: Item[] }) {
  // Memoize expensive computations
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  }, [items]);

  // Memoize callbacks to prevent unnecessary re-renders
  const handlePress = useCallback((id: string) => {
    console.log('Pressed:', id);
  }, []);

  return (
    <FlatList
      data={sortedItems}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ListItem item={item} onPress={handlePress} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
```

### FlatList Optimization

```tsx
import { FlatList, View, Text, StyleSheet } from 'react-native';

export function OptimizedFlatList({ data }) {
  // Get item layout for fixed-height items
  const getItemLayout = (data, index) => ({
    length: 80, // item height
    offset: 80 * index,
    index,
  });

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      )}
      // Performance optimizations
      getItemLayout={getItemLayout}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      initialNumToRender={10}
      updateCellsBatchingPeriod={50}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    padding: 20,
    justifyContent: 'center',
  },
});
```

### Image Optimization

```tsx
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

// Use FastImage for better caching
export function OptimizedImage({ uri }: { uri: string }) {
  return (
    <FastImage
      style={{ width: 200, height: 200 }}
      source={{
        uri,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

// Lazy loading images in lists
export function ImageWithPlaceholder({ uri }: { uri: string }) {
  return (
    <Image
      source={{ uri }}
      style={{ width: 200, height: 200 }}
      loadingIndicatorSource={require('./placeholder.png')}
      fadeDuration={300}
    />
  );
}
```

### Bundle Size Optimization

```javascript
// babel.config.js - Remove console logs in production
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['transform-remove-console', { exclude: ['error', 'warn'] }],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
```

---

## 🎬 Animations

### Animated API

```tsx
import { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';

export function FadeInView({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Reanimated 3

```bash
npm install react-native-reanimated
```

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { Pressable, View, StyleSheet } from 'react-native';

export function AnimatedCard() {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}deg` },
    ],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
  };

  const handleLongPress = () => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      3,
      false,
      () => {
        rotation.value = 0;
      }
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} onLongPress={handleLongPress}>
        <Animated.View style={[styles.card, animatedStyle]}>
          {/* Card content */}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 200,
    height: 200,
    backgroundColor: '#3498db',
    borderRadius: 20,
  },
});
```

### Gesture Handler

```bash
npm install react-native-gesture-handler
```

```tsx
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';

export function DraggableCard() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: '#e74c3c',
    borderRadius: 20,
  },
});
```

---

## 🧪 Testing

### Jest Unit Testing

```tsx
// __tests__/utils.test.ts
import { formatPrice, validateEmail } from '../utils';

describe('formatPrice', () => {
  it('formats price with currency symbol', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
  });

  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});

describe('validateEmail', () => {
  it('returns true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('returns false for invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });
});
```

### React Native Testing Library

```bash
npm install --save-dev @testing-library/react-native
```

```tsx
// __tests__/Counter.test.tsx
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Counter } from '../components/Counter';

describe('Counter', () => {
  it('renders initial count', () => {
    render(<Counter initialCount={0} />);
    expect(screen.getByText('Count: 0')).toBeTruthy();
  });

  it('increments count when button pressed', () => {
    render(<Counter initialCount={0} />);
    
    fireEvent.press(screen.getByText('Increment'));
    
    expect(screen.getByText('Count: 1')).toBeTruthy();
  });

  it('decrements count when button pressed', () => {
    render(<Counter initialCount={5} />);
    
    fireEvent.press(screen.getByText('Decrement'));
    
    expect(screen.getByText('Count: 4')).toBeTruthy();
  });
});
```

### Detox E2E Testing

```bash
npm install --save-dev detox
```

```javascript
// e2e/login.test.js
describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login successfully with valid credentials', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    await expect(element(by.text('Welcome!'))).toBeVisible();
  });

  it('should show error with invalid credentials', async () => {
    await element(by.id('email-input')).typeText('wrong@example.com');
    await element(by.id('password-input')).typeText('wrongpassword');
    await element(by.id('login-button')).tap();
    
    await expect(element(by.text('Invalid credentials'))).toBeVisible();
  });
});
```

---

## 📦 App Publishing

### iOS App Store

1. **Apple Developer Account** ($99/year)
2. **App Store Connect Setup**
3. **Build Configuration**

```json
// app.json (Expo)
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.myapp",
      "buildNumber": "1",
      "supportsTablet": true
    }
  }
}
```

```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### Google Play Store

1. **Google Play Developer Account** ($25 one-time)
2. **Play Console Setup**
3. **Build Configuration**

```json
// app.json (Expo)
{
  "expo": {
    "android": {
      "package": "com.yourcompany.myapp",
      "versionCode": 1,
      "permissions": ["CAMERA", "ACCESS_FINE_LOCATION"]
    }
  }
}
```

```bash
# Build for Android
eas build --platform android

# Submit to Play Store
eas submit --platform android
```

---

## 🔄 CI/CD

### GitHub Actions

```yaml
# .github/workflows/build.yml
name: Build and Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build app
        run: eas build --platform all --non-interactive
```

### EAS Build Configuration

```json
// eas.json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## ✅ Advanced Checklist

- [ ] Implement memoization (memo, useMemo, useCallback)
- [ ] Optimize FlatList performance
- [ ] Create animations with Reanimated
- [ ] Implement gesture handling
- [ ] Write unit tests with Jest
- [ ] Write component tests with Testing Library
- [ ] Configure E2E tests with Detox
- [ ] Build and publish to iOS App Store
- [ ] Build and publish to Google Play Store
- [ ] Set up CI/CD pipeline

---

**Congratulations! You've completed the React Native learning path! 🎉**

**Explore more: [Resources](../Resources/) →**
