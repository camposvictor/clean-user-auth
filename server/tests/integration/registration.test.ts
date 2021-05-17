import request from 'supertest'
import faker from 'faker'
import { connection } from '../utils/connection'

const mockRequest = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.firstName(),
})

describe('Registration', () => {
  let app: any

  beforeAll(async () => {
    app = await connection.create()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should registrate a user with valid credentials', async () => {
    const response = await request(app).post('/signup').send(mockRequest())

    expect(response.statusCode).toBe(201)
  })
  it('should not registrate a user with invalid credentials', async () => {
    const response = await request(app).post('/signup').send({})

    expect(response.statusCode).toBe(400)
  })
})
