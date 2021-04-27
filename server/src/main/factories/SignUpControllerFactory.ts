import { SignUpController } from '../../presentation/controllers/SignUpController'
import { makeCreateUser } from './CreateUserFactory'

export const createSignUpController = () => {
  const signUpController = new SignUpController(makeCreateUser())

  return signUpController
}
