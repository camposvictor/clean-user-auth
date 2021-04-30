import { IValidator } from '../protocols'
import * as yup from 'yup'

type Params = {
  email: string
  name: string
  password: string
}

export class YupSignUpValidator implements IValidator {
  schema: any
  constructor() {
    this.schema = yup.object().shape({
      email: yup.string().email().required().max(256),
      name: yup.string().required().min(2).max(256),
      password: yup.string().required().min(6).max(256),
    })
  }
  async validate(params: Params) {
    try {
      await this.schema.validate(params)
    } catch (error: yup.ValidationError | any) {
      return error.errors
    }
  }
}
