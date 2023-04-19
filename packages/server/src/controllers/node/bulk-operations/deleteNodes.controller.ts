import { Request } from 'express'
import { TypedResponse, StatusCode, DeleteNodeBody } from 'shared/src/types/dto'
import { DeleteNodes } from '../../../services/node'
import { SnakeCase } from '../../../utils/types'

export const deleteNodesController = (deleteNodes: DeleteNodes) => (
  async (req: Request<{}, {}, SnakeCase<DeleteNodeBody>[]>, res: TypedResponse): Promise<TypedResponse> => {
    const payloads = req.body
    if (!payloads?.length) return res.status(StatusCode.BAD_REQUEST).json({ message: 'Bad Request: Missing required fields', success: false })

    const idsToDelete = payloads.map((payload) => payload.id)
    const resultLength = await deleteNodes(idsToDelete)

    return res.status(StatusCode.OK).json({ message: `${resultLength} Nodes deleted successfully`, success: true })
  }
)
