import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'path'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfigWithDefaults({
  // ...extend config here
  localization: {
    locales: ['da', 'en'],
    defaultLocale: 'da',
  },
  collections: [
    {
      slug: 'foo',
      fields: [
        {
          name: 'bar',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  cors: ['http://localhost:3000', 'http://localhost:3001'],

  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    schema: [
      ({ jsonSchema }) => {
        jsonSchema.definitions.objectWithNumber = {
          type: 'object',
          additionalProperties: false,
          properties: {
            id: {
              type: 'number',
              required: true,
            },
          },
          required: true,
        }
        return jsonSchema
      },
    ],
  },
})
