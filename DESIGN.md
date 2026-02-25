# Design Language

This document defines the visual and interaction system for all future projects. Treat it as the source of truth for decisions about typography, color, layout, motion, and accessibility. If a new pattern is needed, update this file before implementing it.

## Core Principles
- Calm, editorial, and legible. Design should feel refined, not flashy.
- Prefer clarity over decoration; every visual element earns its place.
- Use subtle, intentional emphasis instead of heavy contrast or excessive color.
- Favor consistency and predictability across pages, states, and breakpoints.

## Design Tokens

### Color System
- Primary accent is blue; use it for links and focused interactions only.
- Neutral palette is warm and low-contrast for long-form reading.
- Light and dark modes must be supported; never hardcode a single theme value.

**Base tokens (CSS vars):**
- `--accent`: #156bb3
- `--accent-dark`: #1a6bbf
- `--black`: 26, 26, 26
- `--gray`: 120, 119, 116
- `--gray-light`: 233, 233, 231
- `--gray-dark`: 55, 53, 47
- `--bg`: 255, 255, 255
- `--header-bg`: 255, 255, 255
- `--border`: 233, 233, 231
- `--box-shadow`: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)

**Dark mode overrides:**
- `--black`: 230, 227, 222
- `--gray`: 155, 154, 151
- `--gray-light`: 47, 47, 47
- `--gray-dark`: 206, 205, 202
- `--bg`: 25, 25, 25
- `--header-bg`: 25, 25, 25
- `--border`: 47, 47, 47

**Usage rules:**
- Body text uses `rgb(var(--gray-dark))`.
- Headings use `rgb(var(--black))`.
- Borders and separators use `rgb(var(--border))` or `rgb(var(--gray-light))`.
- Accent is reserved for links, focus states, and subtle highlights.

### Typography
- Primary font: Rubik (400, 700). It is friendly, geometric, and readable.
- Base font size: 20px desktop, 18px tablet, 16px mobile.
- Base line-height: 1.7 for body; headings use tighter 1.2.
- Monospace is reserved for terminal, arcade, and debug-style UI only.

**Type scale (ratio ~1.25):**
- h1: 3.052em
- h2: 2.441em
- h3: 1.953em
- h4: 1.563em
- h5: 1.25em

**Copy rules:**
- Paragraph spacing defaults to 1em; in prose, increase to 2em.
- Prefer short, calm sentences and generous whitespace.
- Emphasis should use weight, not color, unless it is a link.

**Monospace stack (for system UI):**
- JetBrains Mono, Fira Code, Cascadia Code, ui-monospace, monospace.

### Spacing and Layout
- Primary content width: 720px.
- Extended layouts (like nav) can go up to 900px; hero/back blocks up to 1020px.
- Horizontal page padding: 1.5em desktop, 1em on small screens.

**Spacing scale:**
- Use 0.25em, 0.5em, 1em, 1.5em, 2em, 3em as the primary steps.
- Avoid arbitrary pixel values unless required by an icon or media asset.

### Radius and Shadow
- Small radius: 6px (controls)
- Medium radius: 8px (images, panels)
- Large radius: 12px (hero media)
- Shadow: use `--box-shadow` only; no heavy drop shadows.

## Components and Patterns

### Links
- All standard links use the accent color with a subtle underline.
- Prose links use a bottom-to-top fill animation on hover.
- Links in nav or controls use a thin underline-on-hover state.

### Buttons and Controls
- Icon buttons are 40x40 and use the same hover underline as nav.
- Buttons are borderless and rely on color plus underline for affordance.
- Maintain at least 44x44 tap area on mobile.

**Primary / secondary CTAs:**
- Primary button: solid accent background, white text.
- Secondary button: accent outline with transparent fill.
- Hover states are subtle (opacity or accent-dark), no scale effects.

### Icons
- Icon system is Phosphor; use the fill set only.
- Use 1.2rem to 1.4rem for nav and utility icons; avoid oversized icons in text.
- Icons never replace labels when clarity is reduced; pair with text or aria-labels.
- Icon buttons follow the same hover underline and color rules as links.

### Navigation
- Header is sticky, height 64px, with a center-aligned nav and wordmark on the left.
- Desktop nav is centered; icons are on the right.
- Mobile uses a right-side control cluster and a drawer menu.
- Header background matches the page theme and uses a subtle bottom border.
- Provide a visible skip link for keyboard and screen reader users.
- Hide social icons under 720px; switch to hamburger at 540px.
- Drawer menus animate via display/opacity only; avoid sliding panels.

### Footer
- Footer mirrors header background and border treatment.
- Social icons are centered with consistent 1em spacing.
- Copy stays minimal (year, name, links).

### Hero Sections
- Use a bold name/title, a concise role line in accent, and a short bio.
- Bio width should cap around 520px for readability.
- CTA row uses primary/secondary button styles and wraps on small screens.

### Cards
- Card surfaces use `rgb(var(--bg))`, 10-12px radius, and a subtle border.
- Shadows are light and only used on hover or for emphasis.
- Card headers use uppercase or monospace only when the content is playful.

### Badges and Tags
- Tags are pill-shaped (999px radius), small type, and low-contrast.
- Background uses `rgb(var(--gray-light))`; text uses `rgb(var(--gray-dark))`.

### Lists and Grids
- Featured item can span full width; remaining items form a two-column grid.
- Grid gaps are 2rem desktop, 0.5em mobile.
- Text and image alignment is calm and centered at narrow breakpoints.

### Content Blocks
- Articles use a centered layout with a clear title, date, and optional hero image.
- Images are always responsive and softly rounded (8px) unless hero (12px).
- Code uses a soft background with minimal chrome; no heavy borders.
- Section headers use small caps or uppercase with muted color and letter spacing.
- Back-links include a left arrow icon and reduced font size.

### Tables and Lists
- Tables should be full width, minimal borders, and high readability.
- Lists should breathe; avoid dense, compact list styling.

### Data Visualization
- Data viz should use a contextual palette, not the primary accent.
- Tooltips use dark backgrounds with high-contrast text.
- Labels should switch to abbreviated formats on small screens.

### Easter Eggs and Playful UI
- Keep playful elements optional and non-blocking.
- Overlays must be dismissible with Esc and click-outside.
- Use a dark surface and monospace for terminal-style UI.

## Interaction and Motion
- Hover effects are subtle: 0.15s to 0.22s for color and underline.
- Never use bouncy or attention-seeking animations.
- Motion should confirm interaction, not call attention to itself.
- Prefer reveal or fade transitions; avoid sliding panels for primary UI.

## Accessibility
- Maintain strong contrast for text (especially in dark mode).
- Always provide focus-visible outlines; never remove them for keyboard users.
- Provide skip links and proper ARIA labels for navigation and controls.
- Touch targets must be at least 44x44.
- Respect prefers-color-scheme and persist user selection.
- Never rely on color alone to convey state; pair with text, icon, or shape.
- Interactive icons must have descriptive `aria-label` text.
- Modal or overlay UI must set `aria-hidden` appropriately when closed.
- Ensure keyboard focus can reach and leave drawers and overlays.

## Content and Tone
- Voice is confident, calm, and practical.
- Prefer human, concise copy over technical or marketing language.
- Use short headings and avoid excessive punctuation.

## Imagery and Media
- Imagery should feel understated and clean, with soft corners and minimal noise.
- Use drop shadows sparingly and only for elevating hero media.
- Avoid busy backgrounds that reduce legibility.
- Blog/project grids use a 2:1 hero aspect ratio (720x360 or similar).

## Implementation Guardrails
- Always use design tokens; avoid inline color values.
- New components must document their tokens and states here.
- If a design decision conflicts with these rules, update this file first.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Theme toggles must write to `data-theme` and persist in localStorage.

## Future Extensions
- Add component specs (cards, forms, alerts) here before building them.
- If a new brand color is introduced, define its role and usage limits.
