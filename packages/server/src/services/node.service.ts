import { ResultSetHeader } from 'mysql2'
import { CreateNodePayload, UpdateNodePayload } from 'shared/src/types/dto'
import generateSetClauseAndValues from 'shared/src/utils/backend/generateSetClauseAndValues'
import { Node } from 'shared/src/types/models'
import { SnakeCase } from '../utils/types'
import runTransaction from '../database/runTransaction'
import { deleteRow, getRow, getRows, insertRow, updateRow } from '../database'

class NodeService {
  public static async getNodes(): Promise<SnakeCase<Node>[] | undefined> {
    const nodes: SnakeCase<Node>[] = await getRows<SnakeCase<Node>>('node')

    return nodes
  }

  public static async getNode(id: string): Promise<SnakeCase<Node> | undefined> {
    const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', id)

    return nodes[0]
  }

  public static async createNode(newNode: SnakeCase<CreateNodePayload>): Promise<SnakeCase<Node> | undefined> {
    const affectedRows: number = await insertRow('node', newNode)
    if (!affectedRows) return undefined

    const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', newNode.id)

    return nodes[0]
  }

  public static async updateNode(id: string, updatedNode: Partial<SnakeCase<Node>>): Promise<SnakeCase<Node> | undefined> {
    await updateRow('node', id, updatedNode)
    const nodes: SnakeCase<Node>[] = await getRow<SnakeCase<Node>>('node', id)

    return nodes[0]
  }

  public static async deleteNode(id: string): Promise<boolean> {
    const affectedRows = await deleteRow('node', id)

    return !!affectedRows
  }

  public static async bulkCreate(newNodes: SnakeCase<Node>[]): Promise<number | undefined> {
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
  }

  public static async bulkUpdate(updatePayloads: Partial<SnakeCase<UpdateNodePayload>>[]): Promise<number | undefined> {
    const transactionQueries: { query: string, params: any[] }[] = updatePayloads.map((payload) => {
      const { id } = payload
      const propsToUpdate = payload.props_to_update!

      // Transactions doesn't support prepared SET statements like 'UPDATE node SET ? WHERE id = ?'
      const { setClause, values } = generateSetClauseAndValues(propsToUpdate)

      return { query: `UPDATE node SET ${setClause} WHERE id = ?`, params: [...values, id] }
    })
    const results = await runTransaction(transactionQueries)

    return results.length
  }

  public static async bulkDelete(idsToDelete: string[]): Promise<number | undefined> {
    const transactionQueries: { query: string, params: any[] }[] = idsToDelete.map((idToDelete) => ({
      query: 'DELETE FROM node WHERE id = ?',
      params: [idToDelete],
    }))
    const results = await runTransaction(transactionQueries)

    return results.length
  }
}

export default NodeService
