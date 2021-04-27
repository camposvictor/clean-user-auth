type ControllerResponse = {
  statusCode: number
  body: object
}

export interface IController<Request = object> {
  handle: (req: Request) => Promise<ControllerResponse>
}
