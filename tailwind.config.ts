import brandConfig from '@amansanoj/brand/tailwind'
import type { Config } from 'tailwindcss'

// Extend the brand config with project-specific content paths.
// All design tokens (colors, fonts, spacing, shadows, radii, etc.)
// come from @amansanoj/brand — do not hardcode values here.
const config: Config = {
	...brandConfig,
	// Override dark mode to match the existing JS-driven [data-theme="dark"] toggle
	darkMode: ['selector', '[data-theme="dark"]'],
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
}

export default config
