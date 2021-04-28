import { IUserData, User } from '../../domain/models'
import { IUserRepository } from '../../domain/protocols'

export class UserRepository implements IUserRepository {
  static users: IUserData[]

  constructor() {
    UserRepository.users = []
  }

  findByEmail(email: string) {
    const user = UserRepository.users.find((user) => user.email === email)

    return Promise.resolve(user)
  }

  save(user: IUserData) {
    UserRepository.users.push(user)
    return Promise.resolve()
  }
}
