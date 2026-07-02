import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navigationItem',
  title: 'Nav Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
    }),
  ],
});