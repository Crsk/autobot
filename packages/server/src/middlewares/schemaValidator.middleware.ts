import { NextFunction, Request } from 'express'
import { StatusCode, TypedResponse } from 'shared/src/types/dto'
import { AnyZodObject, ZodError } from 'shared/src/types/schemas'

export default (schema: AnyZodObject) => (req: Request, res: TypedResponse, next: NextFunction) => {
  try {
    schema.safeParse(req.body) // TODO - use parse() instead of safeParse() to throw error when validation fails
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: 'Bad Request: Schema validation failed',
        success: false,
        issues: error.issues,
      })
    }
  }

  return undefined
}
