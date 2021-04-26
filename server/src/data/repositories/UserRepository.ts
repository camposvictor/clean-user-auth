import { User } from '../../domain/models'
import { IUserRepository } from '../../domain/protocols'

export class userRepository implements IUserRepository {
  users: User[]

  constructor() {
    this.users = []
  }

  findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    return Promise.resolve(user)
  }

  save(user: User) {
    this.users.push(user)
    return Promise.resolve()
  }
}
