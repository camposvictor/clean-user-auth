import { SignUpController } from '../../presentation/controllers/SignUpController'
import { makeCreateUser } from './CreateUserFactory'

export const makeSignUpController = () => {
  const createUserUseCase = makeCreateUser()

  const signUpController = new SignUpController(createUserUseCase)

  return signUpController
}
