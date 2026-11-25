# 🛠️ Build Tools & Bundlers

> **Master modern build tools for optimized production builds**

## Vite

### Why Vite?
- ⚡ Lightning fast HMR
- 📦 Optimized builds
- 🔌 Rich plugin ecosystem
- 🎯 Zero config for most cases

### Setup

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom']
                }
            }
        }
    }
});
```

## Next.js

### Features
- 🚀 Server-side rendering
- 📄 Static site generation
- 🔄 API routes
- 🖼️ Image optimization
- 📱 Built-in routing

### Setup

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### App Router (Next.js 13+)

```javascript
// app/page.js
export default function Home() {
    return <h1>Home Page</h1>;
}

// app/about/page.js
export default function About() {
    return <h1>About Page</h1>;
}

// app/layout.js
export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
```

### Server Components

```javascript
// app/users/page.js (Server Component)
async function getUsers() {
    const res = await fetch('https://api.example.com/users');
    return res.json();
}

export default async function UsersPage() {
    const users = await getUsers();
    
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

## Webpack (Legacy)

### Basic Config

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
```

## Optimization

### Code Splitting

```javascript
// Dynamic imports
const LazyComponent = lazy(() => import('./LazyComponent'));

// Route-based splitting
const routes = [
    {
        path: '/',
        component: () => import('./pages/Home')
    }
];
```

### Environment Variables

```javascript
// .env
VITE_API_URL=https://api.example.com

// Usage
const apiUrl = import.meta.env.VITE_API_URL;
```

## Resources

- [Vite Docs](https://vitejs.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Webpack Docs](https://webpack.js.org/)
