export interface IDecrypter {
  decrypt: (encryptedText: string) => Promise<string>
}
