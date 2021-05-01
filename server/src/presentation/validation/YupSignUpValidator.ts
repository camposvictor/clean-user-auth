import * as yup from 'yup'
import { YupValidator } from '.'

export class YupSignUpValidator extends YupValidator {
  constructor() {
    const schema = yup.object().shape({
      email: yup.string().email().required().max(256),
      name: yup.string().required().min(2).max(256),
      password: yup.string().required().min(6).max(256),
    })

    super(schema)
  }
}
