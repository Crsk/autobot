import { Node } from 'shared/types/models/Node.interface'

export type UpdatedNodeProps = Omit<Partial<Node>, 'id'>
