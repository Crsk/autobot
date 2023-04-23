import { UpdateNodeBody } from 'shared/src/types/dto'
import generateSetClause from 'shared/src/utils/backend/generateSetClause'
import format from 'pg-format'
import { SnakeCase } from '../../../utils/types'
import runTransaction from '../../../database/runTransaction'

export const updateNodes = async (updatePayloads: Partial<SnakeCase<UpdateNodeBody>>[]): Promise<number | undefined> => {
  const transactionQueries: { query: string, id: string }[] = updatePayloads.map((payload) => {
    const { id } = payload
    if (!id) throw new Error('Missing id')

    const setArguments = generateSetClause(payload.props_to_update)

    return {
      query: format('UPDATE node SET %s WHERE id = %L', setArguments, id),
      id,
    }
  })
  console.log('transactionQueries', transactionQueries)
  const results = await runTransaction(transactionQueries)

  return results.length
}
