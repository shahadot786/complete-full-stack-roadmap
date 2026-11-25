# 🎨 HTML5 & CSS3 Mastery

> **Master the foundation of web development with modern HTML5 and CSS3**

## 📚 Table of Contents

- [Semantic HTML5](#️-semantic-html5)
- [CSS Grid & Flexbox](#-css-grid--flexbox)
- [Responsive Design](#-responsive-design)
- [Modern CSS Techniques](#-modern-css-techniques)
- [Accessibility](#-accessibility-wcag-21)
- [Resources](#-resources)

---

## 🏗️ Semantic HTML5

### What is Semantic HTML?

Semantic HTML uses meaningful tags that describe the content they contain, making your code more readable and accessible.

### Key Semantic Elements

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semantic HTML Example</title>
</head>
<body>
    <!-- Header Section -->
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main Content -->
    <main>
        <article>
            <header>
                <h1>Article Title</h1>
                <p>Published on <time datetime="2024-12-29">December 29, 2024</time></p>
            </header>
            <section>
                <h2>Section Heading</h2>
                <p>Article content goes here...</p>
            </section>
        </article>

        <aside>
            <h3>Related Links</h3>
            <ul>
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
            </ul>
        </aside>
    </main>

    <!-- Footer Section -->
    <footer>
        <p>&copy; 2024 Your Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

### Best Practices

✅ **DO:**
- Use `<header>` for introductory content
- Use `<nav>` for navigation links
- Use `<main>` for primary content (only one per page)
- Use `<article>` for self-contained content
- Use `<section>` to group related content
- Use `<aside>` for sidebar content
- Use `<footer>` for footer information

❌ **DON'T:**
- Use `<div>` when a semantic element exists
- Use multiple `<main>` elements
- Use `<section>` without a heading

---

## 📐 CSS Grid & Flexbox

### Flexbox - One-Dimensional Layout

Perfect for laying out items in a row or column.

```css
/* Flex Container */
.container {
    display: flex;
    justify-content: space-between; /* horizontal alignment */
    align-items: center; /* vertical alignment */
    gap: 1rem; /* spacing between items */
}

/* Common Flexbox Patterns */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
}

.card {
    flex: 1 1 300px; /* grow, shrink, basis */
}
```

### CSS Grid - Two-Dimensional Layout

Perfect for complex layouts with rows and columns.

```css
/* Basic Grid */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
    grid-gap: 2rem;
}

/* Responsive Grid */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

/* Complex Layout */
.layout {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 250px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

### When to Use What?

| Use Case | Flexbox | Grid |
|----------|---------|------|
| Navigation bar | ✅ | ❌ |
| Card layouts | ✅ | ✅ |
| Page layouts | ❌ | ✅ |
| Form controls | ✅ | ❌ |
| Gallery | ❌ | ✅ |

---

## 📱 Responsive Design

### Mobile-First Approach

Start with mobile styles, then add complexity for larger screens.

```css
/* Base styles (mobile) */
.container {
    padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

### Common Breakpoints

```css
/* Mobile: 320px - 767px (default) */
/* Tablet: 768px - 1023px */
@media (min-width: 768px) { }

/* Desktop: 1024px - 1439px */
@media (min-width: 1024px) { }

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) { }
```

### Responsive Images

```html
<!-- Responsive with srcset -->
<img 
    src="image-800.jpg"
    srcset="image-400.jpg 400w,
            image-800.jpg 800w,
            image-1200.jpg 1200w"
    sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
    alt="Description"
>

<!-- Picture element for art direction -->
<picture>
    <source media="(min-width: 1024px)" srcset="desktop.jpg">
    <source media="(min-width: 768px)" srcset="tablet.jpg">
    <img src="mobile.jpg" alt="Description">
</picture>
```

---

## 🎨 Modern CSS Techniques

### CSS Variables (Custom Properties)

```css
:root {
    /* Colors */
    --primary-color: #3b82f6;
    --secondary-color: #8b5cf6;
    --text-color: #1f2937;
    --bg-color: #ffffff;
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    
    /* Typography */
    --font-primary: 'Inter', sans-serif;
    --font-size-base: 1rem;
    --font-size-lg: 1.25rem;
}

/* Usage */
.button {
    background-color: var(--primary-color);
    padding: var(--spacing-sm) var(--spacing-md);
    font-family: var(--font-primary);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --text-color: #f9fafb;
        --bg-color: #111827;
    }
}
```

### Modern Selectors

```css
/* :is() - Simplify complex selectors */
:is(h1, h2, h3, h4) {
    font-weight: 700;
    line-height: 1.2;
}

/* :where() - Zero specificity */
:where(ul, ol) li {
    margin-bottom: 0.5rem;
}

/* :has() - Parent selector */
.card:has(img) {
    padding: 0;
}

/* :not() - Exclude elements */
li:not(:last-child) {
    margin-bottom: 1rem;
}
```

### Animations & Transitions

```css
/* Smooth transitions */
.button {
    background-color: var(--primary-color);
    transition: all 0.3s ease;
}

.button:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Keyframe animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: fadeIn 0.6s ease-out;
}
```

---

## ♿ Accessibility (WCAG 2.1)

### Color Contrast

Ensure sufficient contrast between text and background:
- **Normal text:** Minimum 4.5:1 ratio
- **Large text (18pt+):** Minimum 3:1 ratio

```css
/* Good contrast */
.text-good {
    color: #1f2937; /* Dark gray */
    background-color: #ffffff; /* White */
    /* Contrast ratio: 16.1:1 ✅ */
}

/* Poor contrast */
.text-poor {
    color: #d1d5db; /* Light gray */
    background-color: #ffffff; /* White */
    /* Contrast ratio: 1.8:1 ❌ */
}
```

### Focus States

Always provide visible focus indicators:

```css
/* Default focus */
a:focus,
button:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* Custom focus ring */
.button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
```

### Skip Links

```html
<a href="#main-content" class="skip-link">
    Skip to main content
</a>

<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
</style>
```

### ARIA Labels

```html
<!-- Button with icon only -->
<button aria-label="Close dialog">
    <svg><!-- X icon --></svg>
</button>

<!-- Navigation landmark -->
<nav aria-label="Main navigation">
    <ul>...</ul>
</nav>

<!-- Form labels -->
<label for="email">Email Address</label>
<input type="email" id="email" required>
```

---

## 📚 Resources

### Official Documentation
- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [W3C HTML Specification](https://html.spec.whatwg.org/)

### Interactive Learning
- [CSS Grid Garden](https://cssgridgarden.com/)
- [Flexbox Froggy](https://flexboxfroggy.com/)
- [CSS Diner](https://flukeout.github.io/)

### Tools
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [CSS Grid Generator](https://cssgrid-generator.netlify.app/)

### Best Practices
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- [CSS Guidelines](https://cssguidelin.es/)
- [BEM Methodology](http://getbem.com/)

---

## 🎯 Practice Projects

1. **Personal Portfolio** - Showcase your work with a responsive layout
2. **Landing Page** - Create a modern product landing page
3. **Blog Layout** - Build a multi-column blog with grid
4. **Dashboard UI** - Design a data dashboard interface

---

## ✅ Checklist

- [ ] Understand semantic HTML elements
- [ ] Master Flexbox for one-dimensional layouts
- [ ] Master CSS Grid for two-dimensional layouts
- [ ] Implement mobile-first responsive design
- [ ] Use CSS variables for theming
- [ ] Ensure accessibility compliance (WCAG 2.1)
- [ ] Test across different browsers and devices
- [ ] Optimize for performance

---

**Next Steps:** Move on to [JavaScript Basics](../JavaScript-Basics/README.md) to add interactivity to your web pages!
