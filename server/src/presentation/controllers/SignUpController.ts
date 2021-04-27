import { CreateUser } from '../../domain/useCases'

type Request = {
  name: string
  email: string
  password: string
}

export class SignUpController {
  constructor(private createUser: CreateUser) {}
  async handle(req: Request) {
    try {
      await this.createUser.execute(req)

      return {
        statusCode: 201,
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
