# DotGrid

Adapted from React Bits Backgrounds/DotGrid:
https://github.com/DavidHDev/react-bits

A shared viewport canvas uses brand primary and secondary colors. Dots fade smoothly near text, images, and controls. Content measurements refresh on scroll, resize, font readiness, image loads, and shell layout changes. Pointer displacement is scaled down by the same content mask.

The canvas is decorative and ignores pointer events. It mounts only at widths of at least 768px with a fine hover-capable pointer, and unmounts when that changes. Mobile and touch devices have no grid or rendering work. Reduced-motion desktop users get a static field. Rendering stops when settled or the tab is hidden. The license is retained in public/assets/vendor/reactbits-LICENSE.md.
