import { Router } from 'express'
import { ExpressAdapter } from './adapters'

import { makeLoginController, makeSignUpController } from './factories'

const router = Router()

router.post('/signup', ExpressAdapter.route(makeSignUpController()))
router.post('/login', ExpressAdapter.route(makeLoginController()))

export default router
