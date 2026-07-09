import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input';

import myBio from './src/sanity/schemas/myBio';
import navigationList from './src/sanity/schemas/navigationList';
import navItem from './src/sanity/schemas/navItem';
import post from './src/sanity/schemas/post';

export default defineConfig({
  name: 'default',
  title: "Chih-Ho's Website",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: {
    types: [myBio, navigationList, navItem, post],
  },
});