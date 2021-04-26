import { uuid } from 'uuidv4'
import { IIdGenerator } from '../../domain/protocols'

export class UuidAdapter implements IIdGenerator {
  generate() {
    return uuid()
  }
}
