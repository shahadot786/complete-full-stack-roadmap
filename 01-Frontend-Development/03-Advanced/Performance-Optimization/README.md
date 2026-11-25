# 🚀 Performance Optimization

> **Make your web applications lightning fast**

## 📚 Table of Contents

- [Code Splitting & Lazy Loading](#️-code-splitting--lazy-loading)
- [Web Vitals](#-web-vitals)
- [Bundle Optimization](#-bundle-optimization)
- [React Performance](#️-react-performance)
- [Image Optimization](#️-image-optimization)
- [Caching Strategies](#-caching-strategies)

---

## ✂️ Code Splitting & Lazy Loading

### React Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Suspense>
    );
}
```

### Dynamic Imports

```javascript
// Load module only when needed
button.addEventListener('click', async () => {
    const module = await import('./heavy-module.js');
    module.doSomething();
});

// Preload for better UX
const preloadModule = () => import('./heavy-module.js');
button.addEventListener('mouseenter', preloadModule);
```

### Route-Based Code Splitting

```jsx
// Next.js automatic code splitting
// Each page is automatically code-split
export default function Home() {
    return <h1>Home Page</h1>;
}

// Vite/Webpack code splitting
const routes = [
    {
        path: '/',
        component: () => import('./pages/Home')
    },
    {
        path: '/about',
        component: () => import('./pages/About')
    }
];
```

---

## 📊 Web Vitals

### Core Web Vitals

**1. Largest Contentful Paint (LCP)** - Loading Performance
- **Goal:** < 2.5 seconds
- **Measures:** Time to render largest content element

```javascript
// Measure LCP
new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
}).observe({ entryTypes: ['largest-contentful-paint'] });
```

**Optimization Tips:**
- Optimize server response time
- Use CDN for static assets
- Preload critical resources
- Compress images

**2. First Input Delay (FID)** - Interactivity
- **Goal:** < 100 milliseconds
- **Measures:** Time from user interaction to browser response

**Optimization Tips:**
- Break up long JavaScript tasks
- Use web workers for heavy computation
- Minimize JavaScript execution time
- Use code splitting

**3. Cumulative Layout Shift (CLS)** - Visual Stability
- **Goal:** < 0.1
- **Measures:** Unexpected layout shifts

```css
/* Prevent layout shifts */
img, video {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9; /* Reserve space */
}

/* Reserve space for ads/embeds */
.ad-container {
    min-height: 250px;
}
```

### Measuring Web Vitals

```javascript
// Using web-vitals library
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

---

## 📦 Bundle Optimization

### Analyze Bundle Size

```bash
# Vite
npm run build
npx vite-bundle-visualizer

# Webpack
npm install --save-dev webpack-bundle-analyzer
```

### Tree Shaking

```javascript
// ❌ Imports entire library
import _ from 'lodash';

// ✅ Import only what you need
import debounce from 'lodash/debounce';

// ✅ Use ES modules
import { debounce } from 'lodash-es';
```

### Minification & Compression

```javascript
// vite.config.js
export default {
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.logs
                drop_debugger: true
            }
        }
    }
};
```

### Use Smaller Alternatives

```javascript
// Replace heavy libraries
// ❌ Moment.js (67KB)
import moment from 'moment';

// ✅ date-fns (13KB with tree-shaking)
import { format } from 'date-fns';

// ✅ Day.js (2KB)
import dayjs from 'dayjs';
```

---

## ⚛️ React Performance

### Memoization

```jsx
import { memo, useMemo, useCallback } from 'react';

// Memoize component
const ExpensiveComponent = memo(({ data }) => {
    return <div>{/* Render data */}</div>;
});

// Memoize calculations
function DataTable({ items }) {
    const sortedItems = useMemo(() => {
        return items.sort((a, b) => a.value - b.value);
    }, [items]);
    
    return <div>{/* Render sortedItems */}</div>;
}

// Memoize callbacks
function Parent() {
    const handleClick = useCallback((id) => {
        console.log('Clicked:', id);
    }, []);
    
    return <Child onClick={handleClick} />;
}
```

### Virtual Lists

```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
    const Row = ({ index, style }) => (
        <div style={style}>
            {items[index].name}
        </div>
    );
    
    return (
        <FixedSizeList
            height={600}
            itemCount={items.length}
            itemSize={50}
            width="100%"
        >
            {Row}
        </FixedSizeList>
    );
}
```

### Debouncing & Throttling

```jsx
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

function SearchInput() {
    const [query, setQuery] = useState('');
    
    // Debounce API calls
    const debouncedSearch = useCallback(
        debounce((value) => {
            // API call
            fetch(`/api/search?q=${value}`);
        }, 500),
        []
    );
    
    const handleChange = (e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
    };
    
    return <input value={query} onChange={handleChange} />;
}
```

---

## 🖼️ Image Optimization

### Modern Image Formats

```html
<!-- Use WebP with fallback -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description">
</picture>

<!-- AVIF (even better compression) -->
<picture>
    <source srcset="image.avif" type="image/avif">
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description">
</picture>
```

### Lazy Loading Images

```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- With Intersection Observer -->
<img data-src="image.jpg" class="lazy" alt="Description">

<script>
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('.lazy').forEach(img => observer.observe(img));
</script>
```

### Responsive Images

```html
<img
    srcset="small.jpg 400w,
            medium.jpg 800w,
            large.jpg 1200w"
    sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
    src="medium.jpg"
    alt="Description"
>
```

### Image CDN

```javascript
// Cloudinary example
const imageUrl = 'https://res.cloudinary.com/demo/image/upload/w_400,f_auto,q_auto/sample.jpg';

// Parameters:
// w_400 - width 400px
// f_auto - automatic format (WebP, AVIF)
// q_auto - automatic quality
```

---

## 💾 Caching Strategies

### Service Worker Caching

```javascript
// service-worker.js
const CACHE_NAME = 'v1';
const urlsToCache = [
    '/',
    '/styles/main.css',
    '/script/main.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
```

### HTTP Caching Headers

```javascript
// Express.js example
app.use(express.static('public', {
    maxAge: '1y', // Cache for 1 year
    immutable: true
}));

// Cache-Control headers
res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
```

### Browser Caching

```javascript
// LocalStorage caching
function getCachedData(key, fetchFn, ttl = 3600000) {
    const cached = localStorage.getItem(key);
    
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
            return Promise.resolve(data);
        }
    }
    
    return fetchFn().then(data => {
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
        return data;
    });
}
```

---

## 🛠️ Performance Tools

### Lighthouse

```bash
# Run Lighthouse audit
npx lighthouse https://example.com --view

# CI integration
npm install -g @lhci/cli
lhci autorun
```

### Chrome DevTools

1. **Performance Tab** - Record and analyze runtime performance
2. **Network Tab** - Analyze resource loading
3. **Coverage Tab** - Find unused CSS/JS
4. **Lighthouse Tab** - Run performance audits

### Bundle Analyzers

```bash
# Webpack Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer

# Vite Bundle Visualizer
npm install --save-dev rollup-plugin-visualizer
```

---

## ✅ Performance Checklist

### Loading Performance
- [ ] Enable gzip/brotli compression
- [ ] Minify CSS, JS, HTML
- [ ] Optimize images (WebP, lazy loading)
- [ ] Use CDN for static assets
- [ ] Implement code splitting
- [ ] Preload critical resources
- [ ] Use HTTP/2 or HTTP/3

### Runtime Performance
- [ ] Minimize JavaScript execution
- [ ] Use web workers for heavy tasks
- [ ] Implement virtual scrolling for long lists
- [ ] Debounce/throttle expensive operations
- [ ] Optimize React re-renders
- [ ] Remove unused code

### Caching
- [ ] Implement service worker
- [ ] Set proper cache headers
- [ ] Use browser caching
- [ ] Cache API responses

### Monitoring
- [ ] Track Core Web Vitals
- [ ] Set up performance monitoring (Sentry, LogRocket)
- [ ] Monitor bundle size
- [ ] Regular Lighthouse audits

---

## 📚 Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Webpack Performance Guide](https://webpack.js.org/guides/build-performance/)

---

**Remember:** Premature optimization is the root of all evil. Measure first, then optimize!
