import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navigationList',
  title: 'Navigation List',
  type: 'document',
  fields: [
    defineField({
      name: 'navArray',
      title: 'Nav Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'navigationItem' }] }],
    }),
  ],
});