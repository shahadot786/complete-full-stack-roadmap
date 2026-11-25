# 🎨 CSS3 Cheat Sheet

## Selectors

```css
element { }           /* Type selector */
.class { }           /* Class selector */
#id { }              /* ID selector */
* { }                /* Universal selector */
parent > child { }   /* Direct child */
ancestor descendant { } /* Descendant */
element:hover { }    /* Pseudo-class */
element::before { }  /* Pseudo-element */
```

## Box Model

```css
.box {
    width: 300px;
    height: 200px;
    padding: 20px;
    border: 1px solid #000;
    margin: 10px;
}
```

## Flexbox

```css
.container {
    display: flex;
    flex-direction: row | column;
    justify-content: flex-start | center | space-between;
    align-items: flex-start | center | stretch;
    gap: 1rem;
}

.item {
    flex: 1 1 auto; /* grow shrink basis */
}
```

## Grid

```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 1rem;
}

.item {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}
```

## Positioning

```css
position: static | relative | absolute | fixed | sticky;
top: 0;
right: 0;
bottom: 0;
left: 0;
z-index: 10;
```

## Colors

```css
color: #ff0000;              /* Hex */
color: rgb(255, 0, 0);       /* RGB */
color: rgba(255, 0, 0, 0.5); /* RGBA */
color: hsl(0, 100%, 50%);    /* HSL */
```

## Typography

```css
font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold | 700;
line-height: 1.5;
text-align: left | center | right;
text-decoration: underline;
text-transform: uppercase;
```

## Transitions & Animations

```css
/* Transition */
transition: all 0.3s ease;

/* Animation */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.element {
    animation: fadeIn 1s ease-in;
}
```

## Media Queries

```css
@media (min-width: 768px) {
    /* Tablet and up */
}

@media (min-width: 1024px) {
    /* Desktop and up */
}
```

## Variables

```css
:root {
    --primary-color: #3b82f6;
    --spacing: 1rem;
}

.element {
    color: var(--primary-color);
    padding: var(--spacing);
}
```
