import { z } from 'zod'
import { DeleteNodeBodySchema, DeleteNodeParamsSchema } from '../schemas'

export type DeleteNodeBody = z.infer<typeof DeleteNodeBodySchema>
export type DeleteNodeParams = z.infer<typeof DeleteNodeParamsSchema>
