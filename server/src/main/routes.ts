import { Router } from 'express'
import { ExpressAdapter } from './adapters'
import { makeSignUpController } from './factories'

const router = Router()

router.post('/signup', ExpressAdapter.route(makeSignUpController()))
