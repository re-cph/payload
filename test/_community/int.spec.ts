import type { Payload, PayloadRequest } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import type { NextRESTClient } from '../helpers/NextRESTClient.js'

import { devUser } from '../credentials.js'
import { initPayloadInt } from '../helpers/initPayloadInt.js'

let payload: Payload
let token: string
let restClient: NextRESTClient

const { email, password } = devUser
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

describe('_Community Tests', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const initialized = await initPayloadInt(dirname)
    ;({ payload, restClient } = initialized)

    const data = await restClient
      .POST('/users/login', {
        body: JSON.stringify({
          email,
          password,
        }),
      })
      .then((res) => res.json())

    token = data.token
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy()
    }
  })

  // --__--__--__--__--__--__--__--__--__
  // You can run tests against the local API or the REST API
  // use the tests below as a guide
  // --__--__--__--__--__--__--__--__--__

  it('Should have correct locale: With req excluded', async () => {
    const req = {
      payload,
      locale: 'da',
    } as unknown as PayloadRequest

    await payload.find({
      collection: 'foo',
      locale: 'da',
    })

    expect(req.locale).toStrictEqual('da')

    await payload.find({
      collection: 'foo',
      locale: 'en',
    })

    expect(req.locale).toStrictEqual('da')

    await payload.find({
      collection: 'foo',
      locale: 'all',
    })

    expect(req.locale).toStrictEqual('da')
  })
  it('Should have correct locale: With req included', async () => {
    const req = {
      payload,
      locale: 'da',
    } as unknown as PayloadRequest

    await payload.find({
      collection: 'foo',
      req,
      locale: 'da',
    })

    expect(req.locale).toStrictEqual('da')

    await payload.find({
      collection: 'foo',
      req,
      locale: 'en',
    })

    expect(req.locale).toStrictEqual('da')

    await payload.find({
      collection: 'foo',
      req,
      locale: 'all',
    })

    expect(req.locale).toStrictEqual('da')
  })
})
