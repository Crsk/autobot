import { StatusCode } from 'shared/src/types/dto'

// Controllers should use this function to wrap their implementation
export const errorHandler = (fn: any) => (_: any, res: any, next: any) => fn(_, res, next).catch(() => {
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', success: false, payload: {} })
  next()
})
