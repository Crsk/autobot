import { CreateNodeBody, UpdateNodeBody } from 'shared/src/types/dto'
import { Node } from 'shared/src/types/models'
import { SnakeCase } from '../../utils/types'

export * from './createNode.service'
export * from './deleteNode.service'
export * from './getNodes.service'
export * from './getNode.service'
export * from './updateNode.service'
export * from './bulk-operations/createNodes.service'
export * from './bulk-operations/deleteNodes.service'
export * from './bulk-operations/updateNodes.service'

export type CreateNode = (node: SnakeCase<CreateNodeBody>) => Promise<SnakeCase<Node> | undefined>
export type DeleteNode = (id: string) => Promise<boolean>
export type GetNodes = () => Promise<SnakeCase<Node>[] | undefined>
export type GetNode = (id: string) => Promise<SnakeCase<Node> | undefined>
export type UpdateNode = (id: string, node: Partial<SnakeCase<Node>>) => Promise<SnakeCase<Node> | undefined>
export type CreateNodes = (newNodes: SnakeCase<CreateNodeBody>[]) => Promise<number | undefined>
export type DeleteNodes = (idsToDelete: string[]) => Promise<number | undefined>
export type UpdateNodes = (updatePayloads: Partial<SnakeCase<UpdateNodeBody>>[]) => Promise<number | undefined>

export interface NodeService {
  createNode: CreateNode,
  deleteNode: DeleteNode,
  getNodes: GetNodes,
  getNode: GetNode,
  updateNode: UpdateNode,
  updateNodes: CreateNodes,
  createNodes: DeleteNodes,
  deleteNodes: UpdateNodes,
}
