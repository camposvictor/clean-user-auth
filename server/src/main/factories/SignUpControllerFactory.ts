import { SignUpController } from '../../presentation/controllers/SignUpController'
import { YupSignUpValidator } from '../../presentation/validation/YupSignUpValidator'
import { makeCreateUser } from './CreateUserFactory'

export const makeSignUpController = () => {
  const validator = new YupSignUpValidator()
  const signUpController = new SignUpController(makeCreateUser(), validator)

  return signUpController
}
