import type { JoinQuery, PayloadRequest, QueryDrafts, SanitizedCollectionConfig } from 'payload'

import { buildVersionCollectionFields, combineQueries } from 'payload'
import toSnakeCase from 'to-snake-case'

import type { DrizzleAdapter } from './types.js'

import { findMany } from './find/findMany.js'

export const queryDrafts: QueryDrafts = async function queryDrafts(
  this: DrizzleAdapter,
  {
    collection,
    joins,
    limit,
    locale,
    page = 1,
    pagination,
    req = {} as PayloadRequest,
    sort,
    where,
  },
) {
  const collectionConfig: SanitizedCollectionConfig = this.payload.collections[collection].config
  const tableName = this.tableNameMap.get(
    `_${toSnakeCase(collectionConfig.slug)}${this.versionsSuffix}`,
  )
  const fields = buildVersionCollectionFields(this.payload.config, collectionConfig)

  const combinedWhere = combineQueries({ latest: { equals: true } }, where)

  let queryDraftsJoins: JoinQuery = joins

  if (typeof joins === 'object') {
    queryDraftsJoins = {}

    for (const k in joins) {
      queryDraftsJoins[`version.${k}`] = joins[k]
    }
  }

  const result = await findMany({
    adapter: this,
    fields,
    joins: queryDraftsJoins,
    limit,
    locale,
    page,
    pagination,
    req,
    sort,
    tableName,
    where: combinedWhere,
  })

  return {
    ...result,
    docs: result.docs.map((doc) => {
      doc = {
        id: doc.parent,
        ...doc.version,
      }

      return doc
    }),
  }
}
