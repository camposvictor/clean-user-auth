import * as yup from 'yup'
import { IValidator } from '../protocols'

export abstract class YupValidator implements IValidator {
  constructor(private schema: yup.AnyObjectSchema) {}

  async validate(params: any) {
    try {
      await this.schema.validate(params)
    } catch (error: yup.ValidationError | any) {
      return error.errors
    }
  }
}
