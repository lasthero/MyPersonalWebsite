// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: "default",
  title: "Chih-Ho's Website",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [{
        name: 'myBio', // 🔴 Matches your JSON's _type exactly
        title: 'Biography', // This is what shows up in your sidebar
        type: 'document',
        fields: [
          {
            name: 'content', // 🔴 Matches your JSON's field name exactly
            title: 'Bio Content',
            type: 'array', // Portable Text is treated as an array of blocks
            of: [{ type: 'block' }] // This enables the rich-text editor (bold, paragraphs, etc.)
          }
        ]
      }]
  },
});