import { z } from 'zod'
import { CreateNodeSchema } from '../schemas'

export type CreateNodeBody = z.infer<typeof CreateNodeSchema>
