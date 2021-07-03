export class IncorrectPasswordError extends Error {
  constructor() {
    super(`incorrect password`)
    this.name = 'IncorrectPasswordError'
  }
}
