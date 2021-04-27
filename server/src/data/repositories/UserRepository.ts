import { IUserData } from '../../domain/models'
import { IUserRepository } from '../../domain/protocols'

export class UserRepository implements IUserRepository {
  users: IUserData[]

  constructor() {
    this.users = []
  }

  findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    return Promise.resolve(user)
  }

  save(user: IUserData) {
    this.users.push(user)
    return Promise.resolve()
  }
}
