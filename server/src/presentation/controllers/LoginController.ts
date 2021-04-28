import { IController } from '.'
import { Authentication } from '../../domain/useCases'

type Request = {
  email: string
  password: string
}

export class LoginController implements IController {
  constructor(private authentication: Authentication) {}

  async handle({ email, password }: Request) {
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
