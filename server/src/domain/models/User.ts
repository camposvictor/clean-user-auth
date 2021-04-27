import { InvalidParamError, MissingParamError } from '../errors'

export interface IUserData {
  id: string
  name: string
  email: string
  password: string
}

export class User {
  public readonly id: string
  public readonly email: string
  public readonly password: string
  public readonly name: string

  constructor(params: IUserData) {
    this.validate(params)

    this.id = params.id
    this.email = params.email
    this.password = params.password
    this.name = params.name
  }

  validate(params: IUserData) {
    Object.entries(params).forEach(([param, value]) => {
      if (!value.trim()) {
        throw new MissingParamError(param)
      }
    })

    if (params.name.length < 2 || params.name.length > 256) {
      throw new InvalidParamError('name')
    }

    if (params.password.length < 6 || params.password.length > 256) {
      throw new InvalidParamError('password')
    }
    const emailTester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!emailTester.test(params.email)) {
      throw new InvalidParamError('email')
    }
  }
}
