import { ofType, Epic, combineEpics } from 'redux-observable'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { concat, from, of } from 'rxjs'
import { AddNodePayload, DeleteNodePayload, UpdateNodePayload } from 'shared/src/types/dto'
import nodeApi from '@/api/node/nodes.api'
import { addNodeTrigger, deleteNodeTrigger, fetchNodesTrigger, updateNodeTrigger } from '../slices/nodeSlice'
import { NodeActionTypes, QueueActionTypes, RootState } from '../types'

const DEBOUNCE_TIME = 300

const fetchNodesEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(fetchNodesTrigger.type),
  switchMap(() => from(nodeApi.fetch()).pipe(
    map((nodes) => ({ type: NodeActionTypes.FETCH, payload: { nodes } })),
    catchError(() => of({ type: NodeActionTypes.FETCH })),
  )),
)
const addNodeEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(addNodeTrigger.type),
  switchMap(({ payload }: { payload: AddNodePayload }) => from(nodeApi.create(payload)).pipe(
    map(() => ({ type: NodeActionTypes.ADD, payload })),
    catchError(() => concat(
      of(({ type: QueueActionTypes.ADD_NODE, payload })),
      of({ type: NodeActionTypes.ADD, payload }),
    )),
  )),
)

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

export default combineEpics(
  fetchNodesEpic,
  addNodeEpic,
  updateNodeEpicUI,
  updateNodeEpicRemote,
  deleteNodeEpic,
)
