import { failure, Result, success } from '../../shared/result'
import { InvalidParamError, MissingParamError } from '../errors'

export class Password {
  private readonly password: string
  constructor(password: string) {
    this.password = password
  }

  get value(): string {
    return this.password
  }

  static create(
    password: string
  ): Result<MissingParamError | InvalidParamError, Password> {
    const passwordOrError = Password.validate(password)

    if (passwordOrError.isFailure()) {
      return failure(passwordOrError.value)
    }

    return success(new Password(password))
  }

  static validate(
    password: string | undefined
  ): Result<MissingParamError | InvalidParamError, string> {
    if (!password || !password.trim()) {
      return failure(new MissingParamError('password'))
    }
    if (password?.length < 6 || password?.length > 256) {
      return failure(new InvalidParamError('password'))
    }

    return success(password)
  }
}
