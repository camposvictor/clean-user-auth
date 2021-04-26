import bcrypt from 'bcrypt'
import { IHashComparer, IHasher } from '../../domain/protocols'

export class BcryptAdapter implements IHasher, IHashComparer {
  async hash(plaintext: string) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(plaintext, salt)

    return hash
  }

  async compare(plaintext: string, hash: string) {
    const match = await bcrypt.compare(plaintext, hash)

    return match
  }
}
