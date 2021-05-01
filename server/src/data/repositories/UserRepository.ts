import { UserDTO } from '../../domain/models'
import { IUserRepository } from '../../domain/protocols'

export class UserRepository implements IUserRepository {
  static users: UserDTO[]

  constructor() {
    UserRepository.users = []
  }

  findByEmail(email: string) {
    const user = UserRepository.users.find((user) => user.email === email)

    return Promise.resolve(user)
  }

  save(user: UserDTO) {
    UserRepository.users.push(user)
    return Promise.resolve()
  }
}
