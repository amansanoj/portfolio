# React Bits adaptations

Source: https://github.com/DavidHDev/react-bits

- DecryptedName adapts TextAnimations/DecryptedText: hover/focus only, fixed character cells, unchanged accessible name, no initial scramble or mobile autoplay.
- Spotlight adapts Components/SpotlightCard: a restrained token-colored light behind existing project rows. No independent card border, ambient loop, or touch tracking.
- DotGrid adapts Backgrounds/DotGrid's pointer-reactive field to a small 2D canvas. Uses token colors, reacts only to a mouse, and renders only while visible or settling.
- ScrollVelocity adapts TextAnimations/ScrollVelocity with Motion scroll velocity and spring smoothing. Includes a persistent pause button, hover pause, and a static reduced-motion presentation.
- TiltedPreview adapts Components/TiltedCard around existing thumbnail buttons. Uses spring-smoothed rotation, no touch tilt, no image cropping, and no competing click handler.

All effects respect reduced motion. The source license is retained at public/assets/vendor/reactbits-LICENSE.md. These are locally simplified adaptations, not unmodified upstream components.
