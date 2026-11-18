# React Bits Components

## Text Effects

- FuzzyText.jsx uses the full JavaScript component pasted from React Bits. The only source adjustment marks the canvas ready after drawing, so the static fallback stays visible until the font and canvas are ready. NotFound.tsx loads it only on the 404 route, uses current brand ink, disables RGB splitting and the intro flash, and unmounts the animation for reduced motion or a hidden tab.
- ShinyText.tsx and ShinyText.css are the original upstream React Bits component and stylesheet. HeadingShine supplies theme-resolved brand primary/secondary colors, a repeating sweep, and a plain text fallback for SSR and reduced motion.
- SplitText adapts the word lift to navigation and project/post title links. It preserves natural wrapping and the accessible text, and runs only on hover/focus with a fine pointer and no reduced-motion preference.

Sources: TextAnimations/FuzzyText, TextAnimations/ShinyText, and TextAnimations/SplitText in the React Bits repository. All licensing remains in the shared React Bits license file.

## Landing Page

TiltedCard.tsx/css, ScrollVelocity.tsx/css, and SpotlightCard.tsx/css are unmodified TypeScript + CSS sources from https://github.com/DavidHDev/react-bits/tree/main/src/ts-default (Components/TiltedCard, TextAnimations/ScrollVelocity, Components/SpotlightCard).

LandingEffects.tsx configures these original components with brand colors and motion preferences. TiltedCard uses the existing image buttons as children, with flipping, tooltips, gyroscope, and intro disabled. ScrollVelocity automatically uses a static mobile/reduced-motion presentation, with no manual motion toggle. SpotlightCard uses token-backed surfaces and borders. Scoped landing.css rules provide typography and palette overrides while leaving upstream source intact. All three are replaced by static markup on touch/small screens or with reduced motion.
