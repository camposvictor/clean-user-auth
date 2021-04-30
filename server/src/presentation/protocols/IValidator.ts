export interface IValidator {
  validate: (params: any) => Promise<string[] | void>
}
