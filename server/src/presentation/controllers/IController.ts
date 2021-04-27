export type ControllerResponse = {
  statusCode: number
  body: object
}

export interface IController {
  handle: (req: any) => Promise<ControllerResponse>
}
