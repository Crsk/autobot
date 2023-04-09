import Node from '../models/Node.interface'

export type CreateNodePayload = Omit<Node, 'createdAt'>
