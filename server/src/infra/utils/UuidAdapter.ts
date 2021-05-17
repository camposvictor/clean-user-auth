import { v4 } from 'uuid'
import { IIdGenerator } from '../../domain/protocols'

export class UuidAdapter implements IIdGenerator {
  generate() {
    return v4()
  }
}
