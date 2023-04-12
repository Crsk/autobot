import { catchError, concat, debounceTime, from, map, of, switchMap } from 'rxjs'
import { Epic, ofType } from 'redux-observable'
import { UpdateNodePayload } from 'shared/src/types/dto'
import nodeApi from '@/api/node/nodes.api'
import { NodeActionTypes, QueueActionTypes, RootState } from '@/redux/types'
import { updateNodeTrigger } from '@/redux/slices/nodeSlice'
import { DEBOUNCE_TIME } from '../constants'

/**
 * Update the node in the UI immediately and synchronously, debouce the remote update
 */
const updateNodeEpicUI: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(updateNodeTrigger.type),
  map(({ payload: { id, propsToUpdate } }: { payload: UpdateNodePayload }) => ({ type: NodeActionTypes.UPDATE, payload: { id, propsToUpdate } })),
)
const updateNodeEpicRemote: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(updateNodeTrigger.type),
  debounceTime(DEBOUNCE_TIME),
  switchMap(({ payload: { id, propsToUpdate } }: { payload: UpdateNodePayload }) => from(nodeApi.update({ id, propsToUpdate }))
    .pipe(
      map(() => ({ type: NodeActionTypes.UPDATE, payload: { id, propsToUpdate } })),
      catchError(() => concat(
        of({ type: QueueActionTypes.UPDATE_NODE, payload: { id, propsToUpdate } }),
        of({ type: NodeActionTypes.UPDATE, payload: { id, propsToUpdate } }),
      )),
    )),
)

export { updateNodeEpicUI, updateNodeEpicRemote }
