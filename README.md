
# WavBlock

**WavBlock** is a modern, zero-dependency JavaScript library for creating high-performance, expressive scroll-triggered animations with minimal effort. It's built to be lightweight, fast, and incredibly easy to integrate into any project.

Bring your web pages to life as users scroll. 

##  Features

* **Zero-Dependency:** Written in pure, modern JavaScript. No jQuery or other heavy libraries required.

* **Performance-First:** Utilizes the **IntersectionObserver API** to ensure animations trigger efficiently without impacting your site's performance.

* **Declarative & Simple:** Just add `data-wavblock` attributes to your HTML elements. No complex JavaScript configuration is needed for basic use.

* **Rich Animation Library:** Includes a suite of animations out-of-the-box, from simple fades and scales to advanced, JS-driven text effects.

* **Staggering Animations:** Easily create beautiful, sequential animations on a group of elements with a single attribute.

* **Highly Customizable:** Fine-tune animations with data attributes for delay, duration, easing, and more.

* **Lightweight**: A tiny footprint that won't bloat your project.

## 💻 Installation

You can add WavBlock.js to your project using either **npm** or a **CDN** link.

### via npm

Install the package using your favorite package manager:


```bash

npm install wavblock

```

Then, import it into your project:


```bash

import 'wavblock';

```

### via CDN

For quick setups or prototyping, simply include the script and stylesheet in your HTML file using **jsDelivr**.


```html

<!-- WavBlock Stylesheet -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/wavblock/dist/wavblock.min.css">

<!-- WavBlock Script -->

<script src="https://cdn.jsdelivr.net/npm/wavblock/dist/wavblock.min.js" defer></script>

```

> **Note:** The `defer` attribute is recommended to ensure the script executes after the document has been parsed.

## 🚀 Quick Start

Getting started is as simple as 1, 2, 3.

1. **Include the Library**
   Make sure the WavBlock script and styles are included in your page (see Installation).

2. **Add CSS (if not using CDN)**
   If you installed via npm, ensure you have the necessary base styles for the animations to work. The core CSS is minimal and handles the initial hidden state of elements.

3. **Add Data Attributes to your HTML**
   Add the `data-wavblock` attribute to any HTML element you want to animate. The library will automatically detect and animate it when it scrolls into view.


```html

<!-- A simple fade-up animation -->

<div data-wavblock="fade-up">

<h2>Hello, WavBlock!</h2>

</div>

<!-- A fade-left animation with a 300ms delay -->

<p data-wavblock="fade-left" data-delay="300ms">

This element will appear a little later.

</p>

```

The library initializes automatically on `DOMContentLoaded`. That's it! 

## 📖 API & Usage

WavBlock is controlled entirely through `data-` attributes on your HTML elements.

### Core Animations

These are the fundamental, CSS-driven animations.

| Attribute Value | Description | 
| ----- | ----- | 
| `fade-up` | Fades and slides the element up from the bottom. | 
| `fade-down` | Fades and slides the element down from the top. | 
| `fade-left` | Fades and slides the element in from the right. | 
| `fade-right` | Fades and slides the element in from the left. | 
| `scale-in` | Scales the element up from 0 to 1 with a fade. | 

### Text Animations

These animations are driven by JavaScript and are perfect for headlines and engaging text blocks.

| Attribute Value | Description | 
| ----- | ----- | 
| `text-reveal` | Reveals text by sliding it up from behind a mask. | 
| `fade-in-text` | Fades in the text word-by-word. | 
| `typewriter` | Simulates a classic typewriter effect with a cursor. | 
| `typewriter-fade` | A modern typewriter effect where each letter fades in. | 
| `letter-fade` | Fades in each letter of the text sequentially. | 

### Utility Animations

| Attribute Value | Description | 
| ----- | ----- | 
| `stagger-children` | Applies a sequential animation to the direct children of this container that have a `data-wavblock` attribute. | 

**Example: Staggering**


```html

<div data-wavblock="stagger-children" data-stagger-delay="150">

<div class="card" data-wavblock="fade-up">Card 1</div>

<div class="card" data-wavblock="fade-up">Card 2</div>

<div class="card" data-wavblock="fade-up">Card 3</div>

</div>

```

### Customization Attributes

Fine-tune the behavior of your animations with these optional attributes.

| Attribute | Description | Example | 
 | ----- | ----- | ----- | 
| `data-delay` | Delay before the animation starts. Accepts value in `ms` or as a number. | `data-delay="500ms"` | 
| `data-duration` | The duration of the animation. | `data-duration="1.2s"` | 
| `data-easing` | A custom CSS `transition-timing-function`. | `data-easing="ease-in-out"` | 
| `data-speed` | For JS text animations: the delay (in `ms`) between each character/word. | `data-speed="50"` | 
| `data-text` | For JS text animations: the text to animate. Overrides element content. | `data-text="Hello World"` | 
| `data-stagger-delay` | For `stagger-children`: the delay (in `ms`) between each child animation. | `data-stagger-delay="200"` | 

## 🎞️ Demos

Check out the [**live demo page**](https://wavblock.keleven.in) to see all the animations in action and explore different combinations.

## 🤝 Contributing

Contributions are welcome! If you have an idea for a new feature, find a bug, or want to improve the code, please feel free to open an issue or submit a pull request.

1. Fork the repository.

2. Create your feature branch (`git checkout -b feature/AmazingAnimation`).

3. Commit your changes (`git commit -m 'Add some AmazingAnimation'`).

4. Push to the branch (`git push origin feature/AmazingAnimation`).

5. Open a Pull Request.

## 📝 Contribution Guidelines

  * Adhere to the existing code style and conventions.
  * Write clear, concise, and descriptive commit messages.
  * Provide comprehensive documentation for any new features or significant changes.
  * Thoroughly test your changes before submitting a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Author & Developer

**Author:** Keleven Studio.  
**Developer:** Kaustav Mohan Bhuyan.  
GitHub: [Kelevengithub](https://github.com/Kelevengithub)

## Taking It Further

Thanks for checking out **WavBlock** for your scroll-triggered animation needs! We built this to be **really fast** and **simple to use**, so it fits right into your modern web projects without any **hassle**. We love seeing what you create, so feel free to push the boundaries of web design with it. Got an idea or a fix? We genuinely **welcome your contributions**. Happy coding and start animating!