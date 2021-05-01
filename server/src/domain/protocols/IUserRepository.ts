import { UserDTO } from '../models'

export interface IUserRepository {
  findByEmail: (email: string) => Promise<UserDTO | undefined>
  save: (user: UserDTO) => Promise<void>
}
