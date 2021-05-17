import request from 'supertest'
import faker from 'faker'
import { connection } from '../utils/connection'
import { makeCreateUser } from '../../src/main/factories'

describe('Authentication', () => {
  let app: any

  beforeAll(async () => {
    app = await connection.create()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should authenticate with valid credentials', async () => {
    const createUserUseCase = makeCreateUser()

    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()

    await createUserUseCase.execute({ email, name, password })

    const response = await request(app).post('/login').send({
      email,
      password,
    })

    expect(response.statusCode).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const createUserUseCase = makeCreateUser()

    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()

    await createUserUseCase.execute({ email, name, password })

    const response = await request(app).post('/login').send({})

    expect(response.statusCode).toBe(400)
  })

  it('should return jwt token when authenticated', async () => {
    const createUserUseCase = makeCreateUser()

    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()

    await createUserUseCase.execute({ email, name, password })

    const response = await request(app).post('/login').send({
      email,
      password,
    })

    expect(response.body).toHaveProperty('token')
  })
})
