import { UserDTO } from '../../domain/models'
import { DBUser } from '../database/entity/User'
import { IMapper } from './IMapper'

export class UserMapper implements IMapper<UserDTO, DBUser> {
  toDTO(persistenceUser: DBUser) {
    return {
      ...persistenceUser,
    }
  }

  toPersistence(userDTO: UserDTO) {
    return {
      ...userDTO,
    }
  }
}
