export class EmailAlredyTakenError extends Error {
  constructor() {
    super(`this email is already taken`)
    this.name = 'EmailAlredyTakenError'
  }
}
