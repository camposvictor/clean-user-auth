import request from 'supertest'
import faker from 'faker'
import { server } from '../../src/main/server'
import { makeCreateUser } from '../../src/main/factories'

const createUserUseCase = makeCreateUser()

describe('Authentication', () => {
  afterAll(() => {
    server.close()
  })

  it('should authenticate with valid credentials', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()

    await createUserUseCase.execute({ email, name, password })

    const response = await request(server).post('/login').send({
      email,
      password,
    })

    expect(response.statusCode).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()

    await createUserUseCase.execute({ email, name, password })

    const response = await request(server).post('/login').send({})

    expect(response.statusCode).toBe(400)
  })

  it('should return jwt token when authenticated', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()

    await createUserUseCase.execute({ email, name, password })

    const response = await request(server).post('/login').send({
      email,
      password,
    })

    expect(response.body).toHaveProperty('token')
  })
})
