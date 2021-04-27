import { IController } from '.'
import { CreateUser } from '../../domain/useCases'

type Request = {
  name: string
  email: string
  password: string
}

export class SignUpController implements IController<Request> {
  constructor(private createUser: CreateUser) {}
  async handle(req: Request) {
    try {
      await this.createUser.execute(req)

      return {
        statusCode: 201,
        body: {},
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          error: error.message || 'Unexpected error',
        },
      }
    }
  }
}
