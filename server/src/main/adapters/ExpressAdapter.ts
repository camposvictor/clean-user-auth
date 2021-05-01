import { Request, Response } from 'express'
import { IController } from '../../presentation/protocols'

export class ExpressAdapter {
  static route(controller: IController) {
    return async (req: Request, res: Response) => {
      const request = {
        ...req.body,
        ...req.params,
        userId: req.userId,
      }

      const response = await controller.handle(request)

      return res.status(response.statusCode).json(response?.body)
    }
  }
}
