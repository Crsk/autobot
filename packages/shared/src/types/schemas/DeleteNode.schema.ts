import { z } from 'zod'

const DeleteNodeParamsSchema = z.object({
  id: z.string().nonempty('ID cannot be empty').length(36, 'ID must be 36 characters long'),
})

const DeleteNodeBodySchema = z.object({
  id: z.string().nonempty('ID cannot be empty').length(36, 'ID must be 36 characters long'),
})

export { DeleteNodeParamsSchema, DeleteNodeBodySchema }
