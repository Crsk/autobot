import { ResultSetHeader } from 'mysql2'
import { CreateNodeBody, UpdateNodeBody } from 'shared/src/types/dto'
import generateSetClauseAndValues from 'shared/src/utils/backend/generateSetClauseAndValues'
import { Node } from 'shared/src/types/models'
import { SnakeCase } from '../utils/types'
import runTransaction from '../database/runTransaction'
import { deleteRow, getRow, getRows, insertRow, updateRow } from '../database'

export const nodeService = {
  getNodes: async (): Promise<SnakeCase<Node>[] | undefined> => {
    const nodes: SnakeCase<Node>[] = await getRows<SnakeCase<Node>>('node')

    return nodes
  },
  getNode: async (id: string): Promise<SnakeCase<Node> | undefined> => {
    const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', id)

    return nodes[0]
  },
  createNode: async (newNode: SnakeCase<CreateNodeBody>): Promise<SnakeCase<Node> | undefined> => {
    const affectedRows: number = await insertRow('node', newNode)
    if (!affectedRows) return undefined

    const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', newNode.id)

    return nodes[0]
  },
  updateNode: async (id: string, updatedNode: Partial<SnakeCase<Node>>): Promise<SnakeCase<Node> | undefined> => {
    await updateRow('node', id, updatedNode)
    const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', id)

    return nodes[0]
  },
  deleteNode: async (id: string): Promise<boolean> => {
    const affectedRows = await deleteRow('node', id)

    return !!affectedRows
  },
  bulkCreate: async (newNodes: SnakeCase<CreateNodeBody>[]): Promise<number | undefined> => {
    let transactionQueries: { query: string, params: any[] }[] = []
    const queryResult: ResultSetHeader[] = []

    const commitTransaction = async () => {
      if (transactionQueries.length > 0) {
        const results = await runTransaction(transactionQueries)
        queryResult.push(...results)
        transactionQueries = []
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const node of newNodes) {
      const isParentInTransaction = transactionQueries.some((q) => q.params[0] === node.parent_id)
      // eslint-disable-next-line no-await-in-loop
      if (isParentInTransaction) await commitTransaction()

      transactionQueries.push({
        query: 'INSERT INTO node (id, name, x, y, parent_id) VALUES (?, ?, ?, ?, ?)',
        params: [node.id, node.name, node.x, node.y, node.parent_id],
      })
    }
    await commitTransaction()

    return queryResult.length
  },
  bulkUpdate: async (updatePayloads: Partial<SnakeCase<UpdateNodeBody>>[]): Promise<number | undefined> => {
    const transactionQueries: { query: string, params: any[] }[] = updatePayloads.map((payload) => {
      const { id } = payload
      const propsToUpdate = payload.props_to_update!

      // Transactions doesn't support prepared SET statements like 'UPDATE node SET ? WHERE id = ?'
      const { setClause, values } = generateSetClauseAndValues(propsToUpdate)

      return { query: `UPDATE node SET ${setClause} WHERE id = ?`, params: [...values, id] }
    })
    const results = await runTransaction(transactionQueries)

    return results.length
  },
  bulkDelete: async (idsToDelete: string[]): Promise<number | undefined> => {
    const transactionQueries: { query: string, params: any[] }[] = idsToDelete.map((idToDelete) => ({
      query: 'DELETE FROM node WHERE id = ?',
      params: [idToDelete],
    }))
    const results = await runTransaction(transactionQueries)

    return results.length
  },
}
