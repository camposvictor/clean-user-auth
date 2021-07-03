import { failure, Result, success } from '../../shared/result'
import {
  IncorrectPasswordError,
  InvalidParamError,
  MissingParamError,
  NotFoundError,
} from '../errors'
import { User } from '../models'
import { Email } from '../models/Email'
import { Password } from '../models/Password'
import { IEncrypter, IHashComparer, IUserRepository } from '../protocols'

type Params = {
  email: string
  password: string
}

type AuthenticationData = {
  token: string
  name: string
}

type Response = Promise<
  Result<
    NotFoundError | InvalidParamError | MissingParamError,
    AuthenticationData
  >
>

export class Authentication {
  constructor(
    private encrypter: IEncrypter,
    private hashComparer: IHashComparer,
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: Params): Response {
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)

    if (emailOrError.isFailure()) {
      return failure(emailOrError.value)
    }

    if (passwordOrError.isFailure()) {
      return failure(passwordOrError.value)
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return failure(new NotFoundError('user'))
    }

    const passwordMatch = await this.hashComparer.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return failure(new IncorrectPasswordError())
    }

    const token = await this.encrypter.encrypt(user.id)

    return success({
      token,
      name: user.name,
    })
  }
}
