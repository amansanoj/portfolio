import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tagline: z.string().optional(),
		period: z.string(),
		location: z.string().optional(),
		tags: z.array(z.string()),
		heroImage: z.string().optional(),
		live: z.string().optional(),
		github: z.string().optional(),
	}),
});

export const collections = { blog, projects };
