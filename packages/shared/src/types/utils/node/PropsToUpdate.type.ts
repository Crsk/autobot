import Node from '../../models/Node.interface'

export type UpdatedNodeProps = Omit<Partial<Node>, 'id'>
