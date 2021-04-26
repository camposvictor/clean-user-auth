import { User } from '../models'
import { IHasher, IIdGenerator, IUserRepository } from '../protocols'

type Params = Omit<User, 'id'>

export class CreateUser {
  constructor(
    private userRepository: IUserRepository,
    private idGenerator: IIdGenerator,
    private hasher: IHasher
  ) {}

  async execute(params: Params) {
    const userAlreadyExists = await this.userRepository.findByEmail(
      params.email
    )

    if (userAlreadyExists) {
      throw new Error('this email is already taken')
    }

    const id = this.idGenerator.generate()
    const hashedPassword = await this.hasher.hash(params.password)

    await this.userRepository.save({
      email: params.email,
      name: params.name,
      id,
      password: hashedPassword,
    })
  }
}
