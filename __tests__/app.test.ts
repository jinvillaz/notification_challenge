import request from 'supertest'
import { App } from '../server/app'

let app: App

beforeAll(async () => {
  app = new App()
  await app.connectDatabase()
})

afterAll(async () => {
  await app.disconnectDatabase()
  app.getApp().close()
})

describe('Test app.ts', () => {
  test('testing app response', async () => {
    await request('http://localhost:4000').get('/api/categories').expect('Content-Type', /json/).expect(200)
  })
})
