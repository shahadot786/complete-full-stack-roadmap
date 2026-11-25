# 🟢 Vue.js 3 - Composition API

> **Learn Vue.js 3 with the modern Composition API**

## 📚 Table of Contents

- [Getting Started](#-getting-started)
- [Composition API Basics](#-composition-api-basics)
- [Reactivity](#-reactivity)
- [Component Communication](#-component-communication)
- [Vue Router](#️-vue-router)
- [Best Practices](#-best-practices)

---

## 🚀 Getting Started

### Create a Vue App

```bash
# Using Vite (Recommended)
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run dev

# Using Vue CLI
npm install -g @vue/cli
vue create my-app
cd my-app
npm run serve
```

### Your First Component

```vue
<template>
  <div class="app">
    <h1>{{ message }}</h1>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue!')
const count = ref(0)
</script>

<style scoped>
.app {
  text-align: center;
  padding: 2rem;
}
</style>
```

---

## ⚡ Composition API Basics

### ref() - Reactive Primitives

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello')
const isActive = ref(false)

function increment() {
  count.value++  // Access with .value in script
}
</script>

<template>
  <!-- No .value needed in template -->
  <p>{{ count }}</p>
  <button @click="increment">Increment</button>
</template>
```

### reactive() - Reactive Objects

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello',
  user: {
    name: 'John',
    age: 30
  }
})

function updateUser() {
  state.user.name = 'Jane'
}
</script>

<template>
  <p>{{ state.count }}</p>
  <p>{{ state.user.name }}</p>
</template>
```

### computed() - Computed Properties

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// Writable computed
const fullNameWritable = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ')
  }
})
</script>
```

### watch() - Watchers

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('')

// Watch single ref
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// Watch multiple sources
watch([count, message], ([newCount, newMessage]) => {
  console.log('Something changed')
})

// Watch with options
watch(count, (newValue) => {
  console.log(newValue)
}, { immediate: true, deep: true })
</script>
```

---

## 🔄 Reactivity

### Reactive vs Ref

```vue
<script setup>
import { ref, reactive } from 'vue'

// Use ref for primitives
const count = ref(0)
const message = ref('Hello')

// Use reactive for objects
const user = reactive({
  name: 'John',
  age: 30
})

// Or use ref for objects too
const userRef = ref({
  name: 'John',
  age: 30
})
</script>
```

### toRefs() - Destructure Reactive

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

// Destructure while maintaining reactivity
const { count, message } = toRefs(state)
</script>
```

---

## 🔗 Component Communication

### Props

```vue
<!-- Parent.vue -->
<template>
  <Child :message="greeting" :count="10" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const greeting = ref('Hello from parent')
</script>

<!-- Child.vue -->
<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ count }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})
</script>
```

### Emits

```vue
<!-- Child.vue -->
<template>
  <button @click="handleClick">Click me</button>
</template>

<script setup>
const emit = defineEmits(['update', 'delete'])

function handleClick() {
  emit('update', { id: 1, name: 'John' })
}
</script>

<!-- Parent.vue -->
<template>
  <Child @update="handleUpdate" />
</template>

<script setup>
function handleUpdate(data) {
  console.log(data)
}
</script>
```

### Provide/Inject

```vue
<!-- Parent.vue -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)
</script>

<!-- Grandchild.vue -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')
</script>
```

---

## 🛣️ Vue Router

### Setup

```bash
npm install vue-router@4
```

### Router Configuration

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### Using Router

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function goToAbout() {
  router.push('/about')
}

// Access route params
const userId = route.params.id
</script>
```

---

## ✅ Best Practices

### 1. Use Composition API

```vue
<!-- ✅ Good - Composition API -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<!-- ❌ Avoid - Options API (unless maintaining legacy code) -->
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>
```

### 2. Organize Composables

```javascript
// composables/useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return { count, increment, decrement }
}

// Usage in component
import { useCounter } from '@/composables/useCounter'

const { count, increment, decrement } = useCounter(10)
```

### 3. Component Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.vue
│   │   └── Input.vue
│   └── features/
│       ├── UserProfile.vue
│       └── TodoList.vue
├── composables/
│   ├── useAuth.js
│   └── useFetch.js
├── views/
│   ├── Home.vue
│   └── About.vue
└── router/
    └── index.js
```

---

## 📚 Resources

- [Vue 3 Official Docs](https://vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Pinia (State Management)](https://pinia.vuejs.org/)
- [VueUse (Composables)](https://vueuse.org/)

---

**Next:** Learn [State Management](../State-Management/README.md) for complex applications!
