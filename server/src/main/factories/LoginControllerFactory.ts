import { LoginController } from '../../presentation/controllers/LoginController'
import { makeAuthentication } from './AuthenticationFactory'

export const makeLoginController = () => {
  const authenticationUseCase = makeAuthentication()
  const loginController = new LoginController(authenticationUseCase)

  return loginController
}
