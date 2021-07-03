import { HttpResponse } from '../protocols'

export function badRequest(message: string): HttpResponse {
  return {
    statusCode: 400,
    body: {
      message,
    },
  }
}

export function notFound(message: string): HttpResponse {
  return {
    statusCode: 404,
    body: {
      message,
    },
  }
}

export function conflict(message: string): HttpResponse {
  return {
    statusCode: 409,
    body: {
      message,
    },
  }
}

export function ok(dto: any): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  }
}

export function created(dto: any): HttpResponse {
  return {
    statusCode: 201,
    body: dto,
  }
}
export function serverError(message: string): HttpResponse {
  return {
    statusCode: 500,
    body: {
      message,
    },
  }
}
