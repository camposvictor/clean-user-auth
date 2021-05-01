import { HttpResponse } from './HttpResponse'

export interface IController {
  handle: (req: any) => Promise<HttpResponse>
}
