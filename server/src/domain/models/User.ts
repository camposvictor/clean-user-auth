import { InvalidParamError, MissingParamError } from '../errors'
import { failure, Result, success } from '../../shared/result'
import { Email } from './Email'
import { Password } from './Password'
import { Name } from './Name'

export interface UserDTO {
  id: string
  name: string
  email: string
  password: string
}

export class User {
  public readonly id: string
  public readonly email: Email
  public readonly password: Password
  public readonly name: Name

  constructor(id: string, email: Email, name: Name, password: Password) {
    this.id = id
    this.email = email
    this.password = password
    this.name = name
  }

  static create({
    id,
    email,
    password,
    name,
  }: UserDTO): Result<InvalidParamError | MissingParamError, User> {
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)
    const nameOrError = Name.create(name)

    if (emailOrError.isFailure()) {
      return failure(emailOrError.value)
    }

    if (passwordOrError.isFailure()) {
      return failure(passwordOrError.value)
    }

    if (nameOrError.isFailure()) {
      return failure(nameOrError.value)
    }

    const user = new User(
      id,
      emailOrError.value,
      nameOrError.value,
      passwordOrError.value
    )

    return success(user)
  }
}
