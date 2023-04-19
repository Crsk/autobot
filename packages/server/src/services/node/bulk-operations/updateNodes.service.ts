import { UpdateNodeBody } from 'shared/src/types/dto'
import generateSetClauseAndValues from 'shared/src/utils/backend/generateSetClauseAndValues'
import { SnakeCase } from '../../../utils/types'
import runTransaction from '../../../database/runTransaction'

export const updateNodes = async (updatePayloads: Partial<SnakeCase<UpdateNodeBody>>[]): Promise<number | undefined> => {
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
