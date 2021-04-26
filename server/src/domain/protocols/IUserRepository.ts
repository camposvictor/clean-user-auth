import { User } from '../models'

export interface IUserRepository {
  findByEmail: (email: string) => Promise<User>
  save: (params: Omit<User, 'id'>) => Promise<void>
}
