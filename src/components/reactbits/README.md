# DotGrid

Adapted from React Bits Backgrounds/DotGrid:
https://github.com/DavidHDev/react-bits

A shared viewport canvas uses brand primary and secondary colors. Dots fade smoothly near text, images, and controls. Content measurements refresh on scroll, resize, font readiness, image loads, and shell layout changes. Pointer displacement is scaled down by the same content mask.

The canvas is decorative and ignores pointer events. It mounts only at widths of at least 768px with a fine hover-capable pointer, and unmounts when that changes. Mobile and touch devices have no grid or rendering work. Reduced-motion desktop users get a static field. Rendering stops when settled or the tab is hidden. The license is retained in public/assets/vendor/reactbits-LICENSE.md.

## Text Effects

- FuzzyText.jsx uses the full JavaScript component pasted from React Bits. The only source adjustment marks the canvas ready after drawing, so the static fallback stays visible until the font and canvas are ready. NotFound.tsx loads it only on the 404 route, uses current brand ink, disables RGB splitting and the intro flash, and unmounts the animation for reduced motion or a hidden tab.
- ShinyText.tsx and ShinyText.css are the original upstream React Bits component and stylesheet. HeadingShine supplies theme-resolved brand primary/secondary colors, a repeating sweep, and a plain text fallback for SSR and reduced motion.
- SplitText adapts the word lift to navigation and project/post title links. It preserves natural wrapping and the accessible text, and runs only on hover/focus with a fine pointer and no reduced-motion preference.

Sources: TextAnimations/FuzzyText, TextAnimations/ShinyText, and TextAnimations/SplitText in the React Bits repository. All licensing remains in the shared React Bits license file.
