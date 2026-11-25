# 📝 HTML5 Cheat Sheet

## Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Content here -->
</body>
</html>
```

## Semantic Elements

```html
<header>    <!-- Page/section header -->
<nav>       <!-- Navigation links -->
<main>      <!-- Main content -->
<article>   <!-- Self-contained content -->
<section>   <!-- Thematic grouping -->
<aside>     <!-- Sidebar content -->
<footer>    <!-- Page/section footer -->
<figure>    <!-- Image with caption -->
<figcaption><!-- Caption for figure -->
```

## Text Elements

```html
<h1> to <h6>  <!-- Headings -->
<p>           <!-- Paragraph -->
<strong>      <!-- Important text -->
<em>          <!-- Emphasized text -->
<mark>        <!-- Highlighted text -->
<small>       <!-- Smaller text -->
<del>         <!-- Deleted text -->
<ins>         <!-- Inserted text -->
```

## Links & Media

```html
<a href="url">Link</a>
<img src="image.jpg" alt="Description">
<video src="video.mp4" controls></video>
<audio src="audio.mp3" controls></audio>
```

## Lists

```html
<!-- Unordered list -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Ordered list -->
<ol>
    <li>First</li>
    <li>Second</li>
</ol>
```

## Forms

```html
<form action="/submit" method="POST">
    <input type="text" name="username" required>
    <input type="email" name="email">
    <input type="password" name="password">
    <input type="checkbox" name="agree">
    <input type="radio" name="choice" value="1">
    <select name="country">
        <option value="us">USA</option>
    </select>
    <textarea name="message"></textarea>
    <button type="submit">Submit</button>
</form>
```

## Tables

```html
<table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
</table>
```
