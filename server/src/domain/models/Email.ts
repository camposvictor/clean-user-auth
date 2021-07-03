import { failure, Result, success } from '../../shared/result'
import { InvalidParamError, MissingParamError } from '../errors'

export class Email {
  private readonly email: string
  constructor(email: string) {
    this.email = email
  }

  get value(): string {
    return this.email
  }

  static create(
    email: string
  ): Result<MissingParamError | InvalidParamError, Email> {
    const emailOrError = Email.validate(email)

    if (emailOrError.isFailure()) {
      return failure(emailOrError.value)
    }

    return success(new Email(email))
  }

  static validate(
    email: string | undefined
  ): Result<MissingParamError | InvalidParamError, string> {
    const emailTester =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!email || !email.trim()) {
      return failure(new MissingParamError('email'))
    }
    if (!emailTester.test(email)) {
      return failure(new InvalidParamError('email'))
    }

    return success(email)
  }
}
