import { CreateUser } from '../../domain/useCases'
import { HttpResponse, IController, IValidator } from '../protocols'

export type Request = {
  name: string
  email: string
  password: string
}

export class SignUpController implements IController {
  constructor(private createUser: CreateUser, private validator: IValidator) {}

  async handle(req: Request): Promise<HttpResponse> {
    const errors = await this.validator.validate({
      email: req.email,
      password: req.password,
      name: req.name,
    })

    if (errors) {
      return {
        body: { errors },
        statusCode: 400,
      }
    }

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
