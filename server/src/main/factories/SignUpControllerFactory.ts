import { SignUpController } from '../../presentation/controllers/SignUpController'
import { makeCreateUser } from './CreateUserFactory'

export const makeSignUpController = () => {
  const signUpController = new SignUpController(makeCreateUser())

  return signUpController
}
