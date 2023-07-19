import { Send } from 'express-serve-static-core'
import { ZodIssue } from 'zod'

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  OK_NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
// This is the type response that the client receives
export type Response<T = any> = { message: string; payload?: T; success: boolean; issues?: ZodIssue[] }
// This is the type response that server creates
export type TypedResponse<T = any> = {
  json: Send<Response<T>, TypedResponse<T>>
  status: (code: StatusCode) => TypedResponse<T>
} & Express.Response
