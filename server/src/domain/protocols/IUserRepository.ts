import { User } from '../models'

export interface IUserRepository {
  findByEmail: (email: string) => Promise<User>
  save: (params: User) => Promise<void>
}
