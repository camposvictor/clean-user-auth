import request from 'supertest'
import faker from 'faker'
import { User } from '../../src/domain/models'
import { UuidAdapter } from '../../src/data/utils'
import { server } from '../../src/main/server'

const uuidAdapter = new UuidAdapter()

const makeSut = () => {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const name = faker.name.findName()
  const id = uuidAdapter.generate()

  return new User({ email, password, name, id })
}

describe('Registration', () => {
  afterAll(() => {
    server.close()
  })

  it('should registrate a user with valid credentials', async () => {
    const sut = makeSut()

    const response = await request(server).post('/signup').send({
      email: sut.email,
      password: sut.password,
      name: sut.name,
    })

    expect(response.statusCode).toBe(201)
  })
  it('should not registrate a user with invalid credentials', async () => {
    const response = await request(server).post('/signup').send({})

    expect(response.statusCode).toBe(400)
  })
})
