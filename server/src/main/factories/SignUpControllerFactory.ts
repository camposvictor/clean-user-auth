import { SignUpController } from '../../presentation/controllers/SignUpController'
import { YupSignUpValidator } from '../../presentation/validation'
import { makeCreateUser } from './CreateUserFactory'

export const makeSignUpController = () => {
  const validator = new YupSignUpValidator()
  const createUserUseCase = makeCreateUser()

  const signUpController = new SignUpController(createUserUseCase, validator)

  return signUpController
}
