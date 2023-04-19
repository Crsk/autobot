import { Request } from 'express'
import { TypedResponse, StatusCode, UpdateNodeParams } from 'shared/src/types/dto'
import { Node } from 'shared/src/types/models'
import { GetNode, UpdateNode } from '../../services/node'

export const updateNodeController = (getNode: GetNode, updateNode: UpdateNode) => (
  async (req: Request<UpdateNodeParams, {}, Partial<Omit<Node, 'id'>>>, res: TypedResponse): Promise<TypedResponse> => {
    const { id } = req.params
    const updatedNode = req.body
    if (!id || !updatedNode) return res.status(StatusCode.BAD_REQUEST).json({ message: 'Bad Request: Missing required fields', success: false })
    if ((updatedNode as any).id) delete (updatedNode as any).id // remove id just in case, we don't want it to be updated
    if (!await getNode(id)) return res.status(StatusCode.NOT_FOUND).json({ message: 'Node not found', success: false })

    const node = await updateNode(id, updatedNode)

    return res.status(StatusCode.OK).json({ message: `Node ${id} updated successfully`, payload: node, success: true })
  }
)
