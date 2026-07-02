import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'myBio',
  title: 'My Bio',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});