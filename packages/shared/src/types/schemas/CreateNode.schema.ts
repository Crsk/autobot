import { z } from 'zod'

export default z.object({
  id: z.string().nonempty('ID cannot be empty').length(36, 'ID must be 36 characters long'),
  name: z.string().optional(),
  x: z.number().positive('X coordinate must be positive').min(0, 'X coordinate must be greater than 0'),
  y: z.number().positive('Y coordinate must be positive').min(0, 'Y coordinate must be greater than 0'),
  parentId: z.string().length(36, 'Parent ID must be 36 characters long').nullable(),
})
