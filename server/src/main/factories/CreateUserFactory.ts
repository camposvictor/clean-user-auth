import { BcryptAdapter } from '../../data/crypto'
import { UserRepository } from '../../data/repositories'
import { UuidAdapter } from '../../data/utils'
import { CreateUser } from '../../domain/useCases'

export const makeCreateUser = () => {
  const userRepository = new UserRepository()
  const uuidAdapter = new UuidAdapter()
  const bcryptAdapter = new BcryptAdapter()

  const createUserUseCase = new CreateUser(
    userRepository,
    uuidAdapter,
    bcryptAdapter
  )

  return createUserUseCase
}
