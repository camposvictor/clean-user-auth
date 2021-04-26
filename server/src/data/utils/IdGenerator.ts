import { uuid } from 'uuidv4'
import { IIdGenerator } from '../../domain/protocols'

export class IdGenerator implements IIdGenerator {
  generate() {
    return uuid()
  }
}
