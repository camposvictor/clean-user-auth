import request from 'supertest'
import faker from 'faker'
import { app } from '../../src/main/app'

const mockRequest = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.name.firstName(),
})

describe('Registration', () => {
  it('should registrate a user with valid credentials', async () => {
    const response = await request(app).post('/signup').send(mockRequest())

    expect(response.statusCode).toBe(201)
  })
  it('should not registrate a user with invalid credentials', async () => {
    const response = await request(app).post('/signup').send({})

    expect(response.statusCode).toBe(400)
  })
})
