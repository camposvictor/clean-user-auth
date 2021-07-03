import { failure, Result, success } from '../../shared/result'
import { InvalidParamError, MissingParamError } from '../errors'

export class Name {
  private readonly name: string

  constructor(name: string) {
    this.name = name
  }

  get value(): string {
    return this.name
  }

  static create(
    name: string
  ): Result<MissingParamError | InvalidParamError, Name> {
    const nameOrError = Name.validate(name)

    if (nameOrError.isFailure()) {
      return failure(nameOrError.value)
    }

    return success(new Name(name))
  }

  static validate(
    name: string | undefined
  ): Result<MissingParamError | InvalidParamError, string> {
    if (!name || !name.trim()) {
      return failure(new MissingParamError('name'))
    }
    if (name?.length < 2 || name?.length > 256) {
      return failure(new InvalidParamError('name'))
    }

    return success(name)
  }
}
