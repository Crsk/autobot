import { catchError, concat, from, map, of, switchMap } from 'rxjs'
import { Epic, ofType } from 'redux-observable'
import { DeleteNodePayload } from 'shared/src/types/dto'
import nodeApi from '@/api/node/nodes.api'
import { NodeActionTypes, QueueActionTypes, RootState } from '@/redux/types'
import { deleteNodeTrigger } from '@/redux/slices/nodeSlice'

const deleteNodeEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(deleteNodeTrigger.type),
  switchMap(({ payload: { id } }: { payload: DeleteNodePayload }) => from(nodeApi.delete({ id })).pipe(
    map(() => ({ type: NodeActionTypes.DELETE, payload: { id } })),
    catchError(() => concat(
      of({ type: QueueActionTypes.DELETE_NODE, payload: { id } }),
      of(({ type: NodeActionTypes.DELETE, payload: { id } })),
    )),
  )),
)

export default deleteNodeEpic
