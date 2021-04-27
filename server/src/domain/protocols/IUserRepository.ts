import { IUserData } from '../models'

export interface IUserRepository {
  findByEmail: (email: string) => Promise<IUserData | undefined>
  save: (user: IUserData) => Promise<void>
}
