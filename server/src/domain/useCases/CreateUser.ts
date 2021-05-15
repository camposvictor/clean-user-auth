import { UserDTO, User } from '../models'
import { IHasher, IIdGenerator, IUserRepository } from '../protocols'

type Params = Omit<UserDTO, 'id'>

type Result = void

export class CreateUser {
  constructor(
    private userRepository: IUserRepository,
    private idGenerator: IIdGenerator,
    private hasher: IHasher
  ) {}

  async execute(params: Params): Promise<Result> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      params.email
    )

    if (userAlreadyExists) {
      throw new Error('this email is already taken')
    }

    const id = this.idGenerator.generate()

    const user = new User({
      email: params.email,
      name: params.name,
      id,
      password: params.password,
    })

    const hashedPassword = await this.hasher.hash(params.password)

    await this.userRepository.save({
      email: user.email,
      name: user.name,
      id: user.id,
      password: hashedPassword,
    })
  }
}
