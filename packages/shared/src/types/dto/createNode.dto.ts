import { Node } from '../models/Node.interface'

type AddNodePayload = Omit<Node, 'createdAt'>
type UpdateNodePayload = { id: string, propsToUpdate: Partial<Node> }
type DeleteNodePayload = { id: string }

export {
  AddNodePayload,
  UpdateNodePayload,
  DeleteNodePayload,
}
