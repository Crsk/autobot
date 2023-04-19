import { Request } from 'express'
import { TypedResponse, StatusCode } from 'shared/src/types/dto'
import { DeleteNode, GetNode } from '../../services/node'

export const deleteNodeController = (getNode: GetNode, deleteNode: DeleteNode) => (
  async (req: Request<{ id: string }>, res: TypedResponse<{ message: string }>): Promise<TypedResponse<{ message: string }>> => {
    const { id } = req.params
    if (!id) return res.status(StatusCode.BAD_REQUEST).json({ message: 'Bad Request: Missing required fields', success: false })
    if (!await getNode(id)) return res.status(StatusCode.NOT_FOUND).json({ message: 'Node not found', success: false })

    await deleteNode(id)

    return res.status(StatusCode.OK).json({ message: 'Node deleted successfully', success: true })
  }
)
