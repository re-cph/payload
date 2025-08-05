import type { CollectionConfig } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { textColumn } from '../../fields/TextColumn/index.js'
import { TFunction } from '@payloadcms/translations'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  slug: postsSlug,
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: ({ t }: { t: TFunction }) => t('fields:blocks'),
          fields: [
            {
              name: 'blocks',
              blocks: [textColumn],
              localized: true,
              required: true,
              type: 'blocks',
            },
          ],
        },

        {
          label: 'content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures],
              }),
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 500, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
