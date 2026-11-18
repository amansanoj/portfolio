# React Bits Components

## Text Effects

- FuzzyText.jsx uses the full JavaScript component pasted from React Bits. The only source adjustment marks the canvas ready after drawing, so the static fallback stays visible until the font and canvas are ready. NotFound.tsx loads it only on the 404 route, uses current brand ink, disables RGB splitting and the intro flash, and unmounts the animation for reduced motion or a hidden tab.
- ShinyText.tsx and ShinyText.css are the original upstream React Bits component and stylesheet. HeadingShine supplies theme-resolved brand primary/secondary colors, a repeating sweep, and a plain text fallback for SSR and reduced motion.
- SplitText adapts the word lift to navigation and project/post title links. It preserves natural wrapping and the accessible text, and runs only on hover/focus with a fine pointer and no reduced-motion preference.

Sources: TextAnimations/FuzzyText, TextAnimations/ShinyText, and TextAnimations/SplitText in the React Bits repository. All licensing remains in the shared React Bits license file.

## Landing Page

CardSwap.jsx/css and LogoLoop.jsx/css are the original JavaScript + CSS sources pasted by the user. SpotlightCard.tsx/css is the original TypeScript + CSS source from https://github.com/DavidHDev/react-bits/tree/main/src/ts-default/Components/SpotlightCard.

LandingEffects.tsx configures these components with brand colors and motion preferences. CardSwap and LogoLoop use the JavaScript + CSS sources pasted by the user. CardSwap has one local animation adjustment: cards exit and reenter from the right rather than below. ProjectDeck displays uncropped covers in a 4:3 image area, uses the exact dark-mode base primary token as its surface, links the whole card to its project, preserves drag gestures in every direction without treating a drag as a click, and disables autoplay and dragging for reduced motion. LogoLoop displays Simple Icons language marks with inline labels; reduced motion replaces the loop with a wrapping list. SpotlightCard uses token-backed surfaces and borders. Scoped landing.css rules provide typography and palette overrides. SpotlightCard is replaced by a static surface on touch/small screens or with reduced motion.
