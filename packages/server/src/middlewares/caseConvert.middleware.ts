import { toCamelCase, toSnakeCase } from '../utils/types'

// TODO: Refactor this middleware
export default (req: any, res: any, next: any) => {
  try {
    if (Array.isArray(req.body)) {
      if (req.body[0].propsToUpdate) { // update
        req.body = req.body.map((item: any) => ({ id: item.id, props_to_update: toSnakeCase(item.propsToUpdate) }))
      } else { // buld create or bulk delete
        req.body = req.body.map((item: any) => toSnakeCase(item))
      }
    } else if (req.body.propsToUpdate) { // single update
      req.body = { id: req.body.id, props_to_update: toSnakeCase(req.body.propsToUpdate) }
    } else { // single create or single delete
      req.body = toSnakeCase(req.body)
    }
  } catch (e) {
    console.log('ERROR', e)
  }

  const oldSend = res.send

  res.send = (data: any) => {
    try {
      const parsedData = JSON.parse(data)
      if (parsedData) {
        if (Array.isArray(parsedData.payload)) {
          data = { message: parsedData.message, payload: parsedData.payload.map((item: any) => toCamelCase(item)), success: parsedData.success, issues: parsedData.issues }
        } else data = { message: parsedData.message, payload: toCamelCase(parsedData.payload), success: parsedData.success, issues: parsedData.issues }

        oldSend.apply(res, [JSON.stringify(data)])
      }
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  next()
}
