import { EntityManager, getManager } from 'typeorm'
import { UserDTO } from '../../domain/models'
import { IUserRepository } from '../../domain/protocols'
import { DBUser } from '../database/entity/User'
import { UserMapper } from '../mappers/UserMapper'

export class UserRepository implements IUserRepository {
  private manager: EntityManager
  private mapper: UserMapper

  constructor() {
    this.manager = getManager()
    this.mapper = new UserMapper()
  }

  async findByEmail(email: string): Promise<UserDTO | undefined> {
    const user = await this.manager.findOne(DBUser, {
      where: {
        email,
      },
    })

    if (!user) {
      return
    }

    return this.mapper.toDTO(user)
  }

  async save(userDTO: UserDTO): Promise<void> {
    const user = this.manager.create(DBUser, this.mapper.toPersistence(userDTO))

    await this.manager.save(user)
  }
}
