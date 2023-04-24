import { z } from 'zod'

const UpdateNodeBodySchema = z.object({
  id: z.string()
    .nonempty('ID cannot be empty')
    .length(36, 'ID must be 36 characters long'),
  propsToUpdate: z.object({
    name: z.string().optional(),
    x: z.number()
      .positive('X coordinate must be positive')
      .min(0, 'X coordinate must be greater than 0')
      .optional(),
    y: z.number()
      .positive('Y coordinate must be positive')
      .min(0, 'Y coordinate must be greater than 0')
      .optional(),
    parentId: z.string()
      .length(36, 'Parent ID must be 36 characters long')
      .optional(),
    description: z.string().optional(),
    code: z.string().optional(),
  }),
})

const UpdateNodeParamsSchema = z.object({
  id: z.string()
    .nonempty('ID cannot be empty')
    .length(36, 'ID must be 36 characters long'),
})

export { UpdateNodeBodySchema, UpdateNodeParamsSchema }
