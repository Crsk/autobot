import { Request } from 'express'
import { StatusCode, TypedResponse } from 'shared/src/types/dto'
import { Node } from 'shared/src/types/models'
import { SnakeCase } from '../../utils/types'
import { GetNode } from '../../services/node'

export const getNodeController =
  (getNode: GetNode) =>
  async (req: Request, res: TypedResponse<SnakeCase<Node>>): Promise<TypedResponse<SnakeCase<Node>>> => {
    const { id } = req.params
    if (!id)
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: 'Bad Request: Missing required fields', success: false })

    const node = await getNode(id)
    if (!node) return res.status(StatusCode.NOT_FOUND).json({ message: 'Node not found', success: false })

    return res.status(StatusCode.OK).json({ message: 'Success', payload: node, success: true })
  }
