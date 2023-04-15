import { z } from 'zod'
import { UpdateNodeBodySchema, UpdateNodeParamsSchema } from '../schemas'

export type UpdateNodeBody = z.infer<typeof UpdateNodeBodySchema>
export type UpdateNodeParams = z.infer<typeof UpdateNodeParamsSchema>
