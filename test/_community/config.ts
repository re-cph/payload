import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'path'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'
import { MediaCollection } from './collections/Media/index.js'
import { PostsCollection, postsSlug } from './collections/Posts/index.js'
import { MenuGlobal } from './globals/Menu/index.js'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { en } from 'payload/i18n/en'
import { da } from 'payload/i18n/da'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [PostsCollection, MediaCollection],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor({}),
  globals: [
    // ...add more globals here
    MenuGlobal,
  ],
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    // await payload.create({
    //   collection: postsSlug,
    //   data: {
    //     title: 'example post',
    //     blocks: [{ }]
    //   },
    // })
  },
  i18n: {
    supportedLanguages: { en, da },
  },
  localization: {
    defaultLocale: 'da',
    locales: ['en', 'da'],
    fallback: false,
    defaultLocalePublishOption: 'active',
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/postgres',
    },
  }),
})
