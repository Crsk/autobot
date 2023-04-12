import { Epic, ofType } from 'redux-observable'
import { catchError, concat, debounceTime, from, map, of, switchMap } from 'rxjs'
import { NodeActionTypes, QueueActionTypes, RootState } from '@/redux/types'
import { addNodeTrigger, deleteNodeTrigger, updateNodeTrigger } from '@/redux/slices/nodeSlice'

const DEBOUNCE_TIME = 300

const ActionEnumMap: Record<string, NodeActionTypes> = {
  [addNodeTrigger.type]: NodeActionTypes.ADD,
  [updateNodeTrigger.type]: NodeActionTypes.UPDATE,
  [deleteNodeTrigger.type]: NodeActionTypes.DELETE,
}

const QueueActionEnumMap: Record<string, QueueActionTypes> = {
  [addNodeTrigger.type]: QueueActionTypes.ADD_NODE,
  [updateNodeTrigger.type]: QueueActionTypes.UPDATE_NODE,
  [deleteNodeTrigger.type]: QueueActionTypes.DELETE_NODE,
}

const handleRemoteEpic = (actionType: string, apiMethod: (payload: any) => Promise<any>): Epic<any, any, RootState> => (action$) => action$.pipe(
  ofType(actionType),
  debounceTime(DEBOUNCE_TIME),
  switchMap(({ payload }: { payload: any }) => from(apiMethod(payload)).pipe(
    map(() => ({ type: ActionEnumMap[actionType], payload })),
    catchError(() => concat(
      of({ type: QueueActionEnumMap[actionType], payload }),
      of({ type: ActionEnumMap[actionType], payload }),
    )),
  )),
)

export { handleRemoteEpic }
