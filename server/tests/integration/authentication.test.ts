import request from 'supertest'
import faker from 'faker'
import { app } from '../../src/main/app'
import { makeCreateUser } from '../../src/main/factories'

const createUserUseCase = makeCreateUser()

describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {
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
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()

    await createUserUseCase.execute({ email, name, password })

    const response = await request(app).post('/login').send({})

    expect(response.statusCode).toBe(400)
  })

  it('should return jwt token when authenticated', async () => {
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
