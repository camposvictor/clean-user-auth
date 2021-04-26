export interface IHashComparer {
  compare: (plaintext: string, hash: string) => Promise<boolean>
}
