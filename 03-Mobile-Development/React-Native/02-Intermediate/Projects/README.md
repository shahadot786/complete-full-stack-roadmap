# 🚀 React Native Intermediate Projects

> **Build production-ready apps with advanced features**

---

## Project 1: Weather App

### 📋 Description
Build a weather app that fetches real-time data from an API.

### 🎯 Learning Objectives
- API integration
- Error handling
- Loading states
- Location services

### ✨ Features
- [ ] Current weather display
- [ ] 5-day forecast
- [ ] Location detection
- [ ] City search
- [ ] Weather icons
- [ ] Pull-to-refresh
- [ ] Error handling

### 🔧 APIs to Use
- [OpenWeatherMap](https://openweathermap.org/api) (Free tier)
- [WeatherAPI](https://www.weatherapi.com/) (Free tier)

### 💻 Key Code
```tsx
const fetchWeather = async (city: string) => {
  try {
    setLoading(true);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    setWeather(data);
  } catch (error) {
    setError('Failed to fetch weather');
  } finally {
    setLoading(false);
  }
};
```

### ⏱️ Estimated Time
8-10 hours

---

## Project 2: Notes App with Storage

### 📋 Description
Create a full-featured notes app with local persistence.

### 🎯 Learning Objectives
- CRUD operations
- AsyncStorage/MMKV
- Search functionality
- State management

### ✨ Features
- [ ] Create notes with title and body
- [ ] Edit existing notes
- [ ] Delete with confirmation
- [ ] Search notes
- [ ] Categories/tags
- [ ] Local persistence
- [ ] Dark mode

### 📝 Data Structure
```tsx
interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### ⏱️ Estimated Time
10-12 hours

---

## Project 3: News Reader

### 📋 Description
Build a news aggregator with infinite scroll and categories.

### 🎯 Learning Objectives
- Infinite scroll with FlatList
- React Query for caching
- Pull-to-refresh
- WebView for articles

### ✨ Features
- [ ] News categories
- [ ] Article list with images
- [ ] Infinite scroll
- [ ] Pull-to-refresh
- [ ] Article detail view
- [ ] Share functionality
- [ ] Bookmarks

### 🔧 APIs to Use
- [NewsAPI](https://newsapi.org/) (Free tier)
- [GNews API](https://gnews.io/)

### ⏱️ Estimated Time
12-15 hours

---

## Project 4: Authentication Flow

### 📋 Description
Implement a complete authentication system.

### 🎯 Learning Objectives
- Form handling with validation
- Secure token storage
- Protected routes
- Session management

### ✨ Features
- [ ] Login screen
- [ ] Register screen
- [ ] Forgot password
- [ ] Form validation
- [ ] Secure token storage
- [ ] Protected routes
- [ ] Auto-logout on token expiry

### 💻 Key Code
```tsx
// Auth Context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

// Secure storage
import * as SecureStore from 'expo-secure-store';

const storeToken = async (token: string) => {
  await SecureStore.setItemAsync('authToken', token);
};
```

### ⏱️ Estimated Time
10-12 hours

---

## Project 5: E-commerce Product Catalog

### 📋 Description
Build a product catalog with cart functionality.

### 🎯 Learning Objectives
- Complex state management
- Shopping cart logic
- Product filtering
- Navigation patterns

### ✨ Features
- [ ] Product list with grid view
- [ ] Product details screen
- [ ] Add to cart
- [ ] Cart management
- [ ] Category filtering
- [ ] Price sorting
- [ ] Search products

### 📝 Data Structure
```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}
```

### ⏱️ Estimated Time
15-20 hours

---

## Project 6: Expense Tracker

### 📋 Description
Track expenses with categories and visualizations.

### 🎯 Learning Objectives
- Chart libraries
- Date handling
- Local database
- Export functionality

### ✨ Features
- [ ] Add expenses
- [ ] Expense categories
- [ ] Monthly summary
- [ ] Pie chart by category
- [ ] Line chart over time
- [ ] Budget limits
- [ ] Export to CSV

### 🔧 Libraries
- `victory-native` or `react-native-chart-kit` for charts
- `date-fns` for date handling

### ⏱️ Estimated Time
15-18 hours

---

## 📊 Project Completion Tracker

| # | Project | Status | Time Spent |
|---|---------|--------|------------|
| 1 | Weather App | ⬜ | - |
| 2 | Notes App | ⬜ | - |
| 3 | News Reader | ⬜ | - |
| 4 | Auth Flow | ⬜ | - |
| 5 | E-commerce | ⬜ | - |
| 6 | Expense Tracker | ⬜ | - |

---

## 💡 Tips

1. **Use TypeScript** - Essential for larger apps
2. **Implement error boundaries** - Catch and handle errors
3. **Add loading states** - Always show feedback
4. **Test on both platforms** - iOS and Android behave differently
5. **Use Git branches** - Feature branches for each project

---

**Next: [Video Tutorials](../Videos/)**
