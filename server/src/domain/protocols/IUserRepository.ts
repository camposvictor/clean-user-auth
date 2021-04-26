import { User } from '../models'

export default interface IUserRepository {
  findByEmail: (email: string) => User
  save: (params: User) => void
}
