import { LoginController } from '../../presentation/controllers/LoginController'
import { makeAuthentication } from './AuthenticationFactory'

export const makeLoginController = () => {
  const loginController = new LoginController(makeAuthentication())

  return loginController
}
