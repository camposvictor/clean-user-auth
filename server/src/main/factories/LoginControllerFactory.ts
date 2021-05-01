import { LoginController } from '../../presentation/controllers/LoginController'
import { YupLoginValidator } from '../../presentation/validation'
import { makeAuthentication } from './AuthenticationFactory'

export const makeLoginController = () => {
  const validator = new YupLoginValidator()
  const authenticationUseCase = makeAuthentication()
  const loginController = new LoginController(authenticationUseCase, validator)

  return loginController
}
