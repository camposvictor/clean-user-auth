import { IEncrypter, IHashComparer, IUserRepository } from '../protocols'

type Params = {
  email: string
  password: string
}

export class Authentication {
  constructor(
    private encrypter: IEncrypter,
    private hashComparer: IHashComparer,
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: Params) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('user not found')
    }

    const isValid = await this.hashComparer.compare(password, user.password)

    if (!isValid) {
      throw new Error('incorrect password')
    }

    const token = await this.encrypter.encrypt(user.id)

    return {
      token,
      name: user.name,
    }
  }
}
