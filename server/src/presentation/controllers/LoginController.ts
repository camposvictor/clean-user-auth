import {
  IncorrectPasswordError,
  InvalidParamError,
  MissingParamError,
} from '../../domain/errors'
import { Authentication } from '../../domain/useCases'
import { badRequest, ok, serverError } from '../helpers/httpHelper'
import { IController, HttpResponse } from '../protocols'

type Request = {
  email: string
  password: string
}

export class LoginController implements IController {
  constructor(private authentication: Authentication) {}

  async handle({ email, password }: Request): Promise<HttpResponse> {
    try {
      const result = await this.authentication.execute({
        email,
        password,
      })

      if (result.isFailure()) {
        const error = result.value

        switch (error.constructor) {
          case MissingParamError: {
            return badRequest(error.message)
          }

          case IncorrectPasswordError: {
            return badRequest(error.message)
          }

          case InvalidParamError: {
            return badRequest(error.message)
          }
        }
      }

      const authenticationData = result.value

      return ok(authenticationData)
    } catch (error) {
      return serverError('unexpected error')
    }
  }
}
