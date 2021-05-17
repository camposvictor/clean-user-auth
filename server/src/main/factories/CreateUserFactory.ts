import { BcryptAdapter } from '../../infra/crypto'
import { UserRepository } from '../../infra/repositories'
import { UuidAdapter } from '../../infra/utils'
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
