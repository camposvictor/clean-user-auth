import dotenv from 'dotenv'

import { BcryptAdapter, JwtAdapter } from '../../data/crypto'
import { UserRepository } from '../../data/repositories'
import { Authentication } from '../../domain/useCases'

dotenv.config()

export const makeAuthentication = () => {
  const encrypter = new JwtAdapter(process.env.SECRET_KEY as string)
  const hashComparer = new BcryptAdapter()
  const userRepository = new UserRepository()

  const authenticationUseCase = new Authentication(
    encrypter,
    hashComparer,
    userRepository
  )

  return authenticationUseCase
}
