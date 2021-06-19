import jwt from 'jsonwebtoken'

import { IEncrypter } from '../../domain/protocols'

export class JwtAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plaintext: string) {
    return jwt.sign({ id: plaintext }, this.secret)
  }
}
