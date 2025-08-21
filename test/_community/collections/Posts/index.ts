import type { TFunction } from '@payloadcms/translations'
import type { CollectionConfig } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

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
    drafts: true,
  },
}
