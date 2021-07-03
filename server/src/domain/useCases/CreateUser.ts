import { failure, Result, success } from '../../shared/result'
import {
  InvalidParamError,
  MissingParamError,
  EmailAlredyTakenError,
} from '../errors'

import { UserDTO, User } from '../models'
import { IHasher, IIdGenerator, IUserRepository } from '../protocols'

type Params = Omit<UserDTO, 'id'>
type Response = Promise<Result<MissingParamError | InvalidParamError, User>>

export class CreateUser {
  constructor(
    private userRepository: IUserRepository,
    private idGenerator: IIdGenerator,
    private hasher: IHasher
  ) {}

  async execute(params: Params): Response {
    const id = this.idGenerator.generate()

    const userOrError = User.create({
      ...params,
      id,
    })

    if (userOrError.isFailure()) {
      return failure(userOrError.value)
    }

    const userAlreadyExists = await this.userRepository.findByEmail(
      params.email
    )

    if (userAlreadyExists) {
      return failure(new EmailAlredyTakenError())
    }

    const user = userOrError.value
    const hashedPassword = await this.hasher.hash(user.password.value)

    await this.userRepository.save({
      email: user.email.value,
      name: user.name.value,
      id: user.id,
      password: hashedPassword,
    })

    return success(user)
  }
}
