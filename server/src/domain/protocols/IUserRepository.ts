import { User } from '../models'

export interface IUserRepository {
  findByEmail: (email: string) => User
  save: (params: User) => void
}
