import { Router } from 'express'
import { ExpressAdapter } from './adapters'

import { makeSignUpController } from './factories'
import { makeLoginController } from './factories/LoginControllerFactory'

const router = Router()

router.post('/signup', ExpressAdapter.route(makeSignUpController()))
router.post('/login', ExpressAdapter.route(makeLoginController()))

export default router
