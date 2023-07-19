import { Request } from 'express'
import { StatusCode, TypedResponse, UpdateNodeBody } from 'shared/src/types/dto'
import { UpdateNodes } from '../../../services/node'
import { SnakeCase } from '../../../utils/types'

export const updateNodesController =
  (updateNodes: UpdateNodes) =>
  async (req: Request<{}, {}, SnakeCase<Partial<UpdateNodeBody>>[]>, res: TypedResponse): Promise<TypedResponse> => {
    const updatePayloads = req.body
    if (!updatePayloads.length || updatePayloads.some(node => !node.id))
      return res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: 'Bad Request: Missing required fields', success: false })

    const resultLength = await updateNodes(updatePayloads)

    return res.status(StatusCode.OK).json({ message: `${resultLength} Nodes updated successfully`, success: true })
  }
