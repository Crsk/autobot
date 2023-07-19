import { Request } from 'express'
import { CreateNodeBody, StatusCode, TypedResponse } from 'shared/src/types/dto'
import { Node } from 'shared/src/types/models'
import { CreateNode } from '../../services/node'
import { SnakeCase } from '../../utils/types'

export const createNodeController =
  (createNode: CreateNode) =>
  async (
    req: Request<{}, {}, SnakeCase<CreateNodeBody>>,
    res: TypedResponse<SnakeCase<Node>>
  ): Promise<TypedResponse<SnakeCase<Node>>> => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, name = '', x, y, parent_id } = req.body
    const newNode: SnakeCase<CreateNodeBody> = { id, name, x, y, parent_id }
    if (!id || !x || !y || !parent_id)
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: 'Bad Request: Missing required fields', success: false })
    const createdNode = await createNode(newNode)

    return res
      .status(StatusCode.CREATED)
      .json({ message: `Node id ${id} was created`, payload: createdNode, success: true })
  }
