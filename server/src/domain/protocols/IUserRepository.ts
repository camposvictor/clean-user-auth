import { User } from '../models'

export interface IUserRepository {
  findByEmail: (email: string) => Promise<User | undefined>
  save: (user: User) => Promise<void>
}
