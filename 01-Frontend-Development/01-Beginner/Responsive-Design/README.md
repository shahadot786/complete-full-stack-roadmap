# 📱 Responsive Web Design

> **Create websites that work beautifully on all devices**

## 📚 Table of Contents

- [Mobile-First Design](#-mobile-first-design)
- [Media Queries](#-media-queries)
- [Responsive Typography](#-responsive-typography)
- [Responsive Images](#️-responsive-images)
- [CSS Frameworks](#-css-frameworks)
- [Best Practices](#-best-practices)

---

## 📱 Mobile-First Design

### What is Mobile-First?

Mobile-first design means designing for mobile devices first, then progressively enhancing for larger screens.

### Why Mobile-First?

✅ **Benefits:**
- Faster mobile performance
- Forces focus on essential content
- Easier to scale up than down
- Better SEO (Google mobile-first indexing)

### Mobile-First CSS Structure

```css
/* Base styles (mobile) - 320px and up */
.container {
    width: 100%;
    padding: 1rem;
}

.grid {
    display: block; /* Stack on mobile */
}

.card {
    margin-bottom: 1rem;
}

/* Tablet - 768px and up */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
    
    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }
}

/* Desktop - 1024px and up */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 3rem;
    }
    
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Large Desktop - 1440px and up */
@media (min-width: 1440px) {
    .container {
        max-width: 1400px;
    }
    
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

## 📐 Media Queries

### Breakpoint Strategy

```css
/* Common breakpoints */
:root {
    --breakpoint-sm: 640px;   /* Small devices */
    --breakpoint-md: 768px;   /* Tablets */
    --breakpoint-lg: 1024px;  /* Laptops */
    --breakpoint-xl: 1280px;  /* Desktops */
    --breakpoint-2xl: 1536px; /* Large screens */
}
```

### Media Query Syntax

```css
/* Min-width (mobile-first) */
@media (min-width: 768px) {
    /* Styles for tablets and up */
}

/* Max-width (desktop-first) */
@media (max-width: 767px) {
    /* Styles for mobile only */
}

/* Range */
@media (min-width: 768px) and (max-width: 1023px) {
    /* Styles for tablets only */
}

/* Orientation */
@media (orientation: landscape) {
    /* Landscape styles */
}

@media (orientation: portrait) {
    /* Portrait styles */
}

/* High-resolution displays */
@media (min-resolution: 2dppx) {
    /* Retina display styles */
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    /* Dark mode styles */
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

### Container Queries (Modern)

```css
/* Container query - responsive based on container size */
.card-container {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 400px) {
    .card {
        display: grid;
        grid-template-columns: 200px 1fr;
    }
}
```

---

## 📝 Responsive Typography

### Fluid Typography

```css
/* Using clamp() for fluid font sizes */
:root {
    /* min, preferred, max */
    --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
    --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
    --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
    --font-size-xl: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
    --font-size-2xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);
}

body {
    font-size: var(--font-size-base);
}

h1 {
    font-size: var(--font-size-2xl);
}

h2 {
    font-size: var(--font-size-xl);
}
```

### Responsive Line Height

```css
/* Adjust line height based on screen size */
body {
    line-height: 1.6; /* Mobile */
}

@media (min-width: 768px) {
    body {
        line-height: 1.7; /* Tablet */
    }
}

@media (min-width: 1024px) {
    body {
        line-height: 1.8; /* Desktop */
    }
}
```

### Viewport Units

```css
/* Viewport-based sizing */
.hero-title {
    font-size: 8vw; /* 8% of viewport width */
    
    /* Constrain with min/max */
    font-size: clamp(2rem, 8vw, 5rem);
}

.full-height-section {
    min-height: 100vh; /* 100% of viewport height */
}

/* New viewport units (iOS safe) */
.mobile-header {
    height: 100dvh; /* Dynamic viewport height */
}
```

---

## 🖼️ Responsive Images

### Responsive Image Techniques

```html
<!-- 1. CSS max-width (simple) -->
<style>
img {
    max-width: 100%;
    height: auto;
}
</style>
<img src="image.jpg" alt="Description">

<!-- 2. srcset for different resolutions -->
<img 
    src="image-800.jpg"
    srcset="image-400.jpg 400w,
            image-800.jpg 800w,
            image-1200.jpg 1200w,
            image-1600.jpg 1600w"
    sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
    alt="Description"
>

<!-- 3. Picture element (art direction) -->
<picture>
    <source 
        media="(min-width: 1024px)" 
        srcset="desktop.jpg"
    >
    <source 
        media="(min-width: 768px)" 
        srcset="tablet.jpg"
    >
    <img src="mobile.jpg" alt="Description">
</picture>

<!-- 4. WebP with fallback -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description">
</picture>
```

### Lazy Loading

```html
<!-- Native lazy loading -->
<img 
    src="image.jpg" 
    alt="Description"
    loading="lazy"
>

<!-- Lazy load with Intersection Observer -->
<img 
    data-src="image.jpg" 
    alt="Description"
    class="lazy"
>

<script>
const lazyImages = document.querySelectorAll('.lazy');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
</script>
```

### Background Images

```css
/* Responsive background images */
.hero {
    background-image: url('mobile.jpg');
    background-size: cover;
    background-position: center;
}

@media (min-width: 768px) {
    .hero {
        background-image: url('tablet.jpg');
    }
}

@media (min-width: 1024px) {
    .hero {
        background-image: url('desktop.jpg');
    }
}

/* High-resolution displays */
@media (min-resolution: 2dppx) {
    .hero {
        background-image: url('desktop@2x.jpg');
    }
}
```

---

## 🎨 CSS Frameworks

### Tailwind CSS

```html
<!-- Responsive utilities -->
<div class="
    w-full          <!-- 100% width on mobile -->
    md:w-1/2        <!-- 50% width on tablet -->
    lg:w-1/3        <!-- 33% width on desktop -->
    p-4             <!-- padding on all sides -->
    md:p-6          <!-- larger padding on tablet -->
    lg:p-8          <!-- even larger on desktop -->
">
    <h2 class="
        text-2xl    <!-- 24px on mobile -->
        md:text-3xl <!-- 30px on tablet -->
        lg:text-4xl <!-- 36px on desktop -->
    ">
        Responsive Title
    </h2>
</div>
```

### Bootstrap 5

```html
<!-- Grid system -->
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
            <!-- 100% on mobile, 50% on tablet, 33% on desktop -->
        </div>
    </div>
</div>

<!-- Responsive utilities -->
<div class="d-none d-md-block">
    <!-- Hidden on mobile, visible on tablet+ -->
</div>

<div class="d-block d-md-none">
    <!-- Visible on mobile, hidden on tablet+ -->
</div>
```

---

## ✅ Best Practices

### 1. Viewport Meta Tag

```html
<!-- Always include this in <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 2. Touch-Friendly Design

```css
/* Minimum touch target size: 44x44px */
.button {
    min-width: 44px;
    min-height: 44px;
    padding: 12px 24px;
}

/* Increase spacing on mobile */
.nav-links a {
    padding: 1rem;
}

@media (min-width: 1024px) {
    .nav-links a {
        padding: 0.5rem 1rem;
    }
}
```

### 3. Responsive Navigation

```html
<!-- Mobile hamburger menu -->
<nav class="navbar">
    <button class="menu-toggle" aria-label="Toggle menu">
        ☰
    </button>
    <ul class="nav-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>

<style>
/* Mobile styles */
.nav-menu {
    display: none;
    flex-direction: column;
}

.nav-menu.active {
    display: flex;
}

.menu-toggle {
    display: block;
}

/* Desktop styles */
@media (min-width: 768px) {
    .nav-menu {
        display: flex;
        flex-direction: row;
    }
    
    .menu-toggle {
        display: none;
    }
}
</style>
```

### 4. Performance Optimization

```css
/* Optimize animations for mobile */
@media (max-width: 767px) {
    * {
        animation-duration: 0.3s !important;
    }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

### 5. Testing Checklist

- [ ] Test on real devices (iOS, Android)
- [ ] Test in Chrome DevTools device mode
- [ ] Test landscape and portrait orientations
- [ ] Test with slow network (3G)
- [ ] Test with different font sizes
- [ ] Validate HTML and CSS
- [ ] Check accessibility (WAVE, axe)
- [ ] Test touch interactions

---

## 📚 Resources

### Tools
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [BrowserStack](https://www.browserstack.com/) - Cross-browser testing
- [Chrome DevTools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)

### Learning
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
- [A Complete Guide to CSS Media Queries](https://css-tricks.com/a-complete-guide-to-css-media-queries/)

### Frameworks
- [Tailwind CSS](https://tailwindcss.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Foundation](https://get.foundation/)

---

## 🎯 Practice Projects

1. **Responsive Portfolio** - Showcase your work on all devices
2. **Mobile-First Blog** - Create a responsive blog layout
3. **E-commerce Product Grid** - Responsive product cards
4. **Dashboard Layout** - Complex responsive layout with sidebar

---

**Next Steps:** Explore [React Basics](../../02-Intermediate/React-Basics/README.md) to build interactive user interfaces!
