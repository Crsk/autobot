import { Request } from 'express'
import { TypedResponse, StatusCode, CreateNodeBody } from 'shared/src/types/dto'
import { CreateNodes } from '../../../services/node'
import { SnakeCase } from '../../../utils/types'

export const createNodesController = (createNodes: CreateNodes) => (
  async (req: Request<{}, {}, SnakeCase<CreateNodeBody>[]>, res: TypedResponse): Promise<TypedResponse> => {
    const nodesToInsert = req.body
    if (!nodesToInsert.length || nodesToInsert.some((node) => !node.id || !node.x || !node.y || !node.parent_id)) return res.status(StatusCode.BAD_REQUEST).json({ message: 'Bad Request: Missing required fields', success: false })

    const resultLength = await createNodes(nodesToInsert)

    return res.status(StatusCode.CREATED).json({ message: `${resultLength} Nodes created successfully`, success: true })
  }
)
