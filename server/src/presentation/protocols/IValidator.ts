export interface IValidator {
  validate: (params: any) => string[] | void
}
