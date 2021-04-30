import { Authentication } from '../../domain/useCases'
import { IController, IValidator } from '../protocols'

type Request = {
  email: string
  password: string
}

export class LoginController implements IController {
  constructor(
    private authentication: Authentication,
    private validator: IValidator
  ) {}

  async handle({ email, password }: Request) {
    const errors = await this.validator.validate({ email, password })

    if (errors) {
      return {
        body: errors,
        statusCode: 400,
      }
    }

    try {
      const authenticationModel = await this.authentication.execute({
        email,
        password,
      })

      return {
        body: authenticationModel,
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: {
          error: error.message || 'Unexpected error',
        },
        statusCode: 400,
      }
    }
  }
}
