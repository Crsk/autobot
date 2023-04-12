import { catchError, concat, from, map, of, switchMap } from 'rxjs'
import { Epic, ofType } from 'redux-observable'
import { CreateNodePayload } from 'shared/src/types/dto'
import nodeApi from '@/api/node/nodes.api'
import { NodeActionTypes, QueueActionTypes, RootState } from '@/redux/types'
import { addNodeTrigger } from '@/redux/slices/nodeSlice'

const addNodeEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(addNodeTrigger.type),
  switchMap(({ payload }: { payload: CreateNodePayload }) => from(nodeApi.create(payload)).pipe(
    map(() => ({ type: NodeActionTypes.ADD, payload })),
    catchError(() => concat(
      of(({ type: QueueActionTypes.ADD_NODE, payload })),
      of({ type: NodeActionTypes.ADD, payload }),
    )),
  )),
)

export default addNodeEpic
