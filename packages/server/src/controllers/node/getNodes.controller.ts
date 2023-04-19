import { Request } from 'express'
import { TypedResponse, StatusCode } from 'shared/src/types/dto'
import { Node } from 'shared/src/types/models'
import { SnakeCase } from '../../utils/types'
import { GetNodes } from '../../services/node'

export const getNodesController = (getNodes: GetNodes) => (
  async (_req: Request, res: TypedResponse<SnakeCase<Node>[]>): Promise<TypedResponse<SnakeCase<Node>[]>> => {
    const nodes = await getNodes()
    if (!nodes?.length) return res.status(StatusCode.NOT_FOUND).json({ message: 'Nodes not found', success: false })

    return res.status(StatusCode.OK).json({ message: 'Success', payload: nodes, success: true })
  }
)
