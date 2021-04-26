import jwt from 'jsonwebtoken'

import { IEncrypter } from '../../domain/protocols'
import { IDecrypter } from '../../domain/protocols/IDecrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string) {
    return jwt.sign({ id: plaintext }, this.secret)
  }

  async decrypt(encryptedText: string) {
    return jwt.verify(encryptedText, this.secret) as any
  }
}
