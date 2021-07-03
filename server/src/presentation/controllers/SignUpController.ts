import {
  EmailAlredyTakenError,
  InvalidParamError,
  MissingParamError,
  NotFoundError,
} from '../../domain/errors'

import {
  badRequest,
  created,
  notFound,
  serverError,
} from '../helpers/httpHelper'

import { CreateUser } from '../../domain/useCases'
import { HttpResponse, IController } from '../protocols'

export type Request = {
  name: string
  email: string
  password: string
}

export class SignUpController implements IController {
  constructor(private createUser: CreateUser) {}

  async handle(req: Request): Promise<HttpResponse> {
    try {
      const result = await this.createUser.execute({
        email: req.email,
        password: req.password,
        name: req.name,
      })

      if (result.isFailure()) {
        const error = result.value

        console.log(error)
        switch (error.constructor) {
          case InvalidParamError: {
            return badRequest(error.message)
          }

          case EmailAlredyTakenError: {
            return badRequest(error.message)
          }

          case MissingParamError: {
            return badRequest(error.message)
          }

          case NotFoundError: {
            return notFound(error.message)
          }

          default: {
            return serverError('unexpected error')
          }
        }
      }

      return created({
        message: 'user created',
        user: result.value,
      })
    } catch (error) {
      console.log(error)
      return serverError('unexpected error')
    }
  }
}
