
![fav-icon](https://github.com/user-attachments/assets/2def5e1f-30d0-458b-b7fe-579baeeab1cb)

A personal landing page with an editorial, experimental visual direction, combining oversized typography, a minimal layout, and a playful interaction with a pigeon and a draggable piece of bread.

## About

This website is a single-page personal/portfolio-style experience with a strong visual identity. It is designed to feel clean, direct, and authorial, working almost like a digital poster with motion and interaction.

At the top, a continuous marquee displays contact information in a humorous tone. In the center, the main text introduces Mateus Freitas in a simple and personal way. The composition is completed by an animated pigeon, a draggable bread image, and a counter that tracks how many visitors have “fed” the pigeon.

## Main Features

- Large, centered typographic hero section
- Animated marquee running across the top of the page
- Minimal white-background layout with strong typographic focus
- Interactive `bread.png` and animated `pombo-03.gif`
- Dynamic pigeon-feeding counter
- Counter persistence using `localStorage`
- Responsive layout for desktop and mobile
- Mobile-specific typography and spacing adjustments
- Favicon support for browsers and iPhone (`apple-touch-icon`)
- Custom `Surt` typeface
- Visual language inspired by experimental/Cargo-like portfolio websites
- Browser zoom lock to preserve the intended visual composition

## Interaction

Users can drag the bread across the page and move it into the pigeon’s hit area. When that happens:

- the site triggers a `*CRUNCH*` action
- the counter increases
- the updated value is stored locally in the browser

This turns the page into more than a static landing page, adding humor and personality to the experience.

## Visual Structure

The site is built around three main elements:

1. A top marquee with email/contact text
2. A main introduction block with personal copy
3. A visual scene made of the animated pigeon, draggable bread, and the counter

The composition is designed to balance editorial design, playful interaction, and readability.

## Responsiveness

The layout is adapted for different screen sizes while preserving the same overall visual identity.

On mobile, the project includes:

- responsive typography scaling
- adapted marquee behavior
- responsive image sizing
- repositioned pigeon and bread
- spacing adjustments for better readability

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

## Main Files

- `index.html` — page structure
- `styles.css` — layout, typography, responsiveness, and animations
- `script.js` — bread interaction, pigeon collision logic, and counter behavior
- `pombo-03.gif` — animated pigeon
- `bread.png` — draggable bread
- `fav-icon.jpg` — site favicon
- `Surt-Medium.woff` — custom typeface

## Concept

This project blends personal portfolio, digital art, and playful interface design. Instead of following a conventional portfolio structure, it focuses on a more authored experience with humor, strong graphic composition, and light interactivity.
