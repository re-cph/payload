import type { Block } from 'payload'

export const textColumn: Block = {
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'columns',
      fields: [
        {
          name: 'title',
          required: true,
          type: 'text',
        },
        {
          name: 'body',
          type: 'richText',
        },
      ],
      maxRows: 6,
      type: 'array',
    },
  ],
  interfaceName: 'TextColumnsBlock',
  slug: 'textColumnsBlock',
}
