import { ofType, Epic, combineEpics } from 'redux-observable'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { Node } from '@/automation-engine/models/node'
import axios from 'axios'

type Response = { success: boolean, message: string }

const nodeApi = {
  baseURL: 'http://localhost:3000/api/v1/nodes',
  fetch: async (): Promise<Response> => {
    try {
      return (await axios.get<Response>(`${nodeApi.baseURL}`)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  create: async (newNode: AddNodePayload): Promise<Response> => {
    try {
      return (await axios.post<Response>(`${nodeApi.baseURL}`, newNode)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  update: async ({ id, propsToUpdate }: UpdateNodePayload): Promise<Response> => {
    try {
      return (await axios.patch<Response>(`${nodeApi.baseURL}/${id}`, propsToUpdate)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  delete: async ({ id }: DeleteNodePayload): Promise<Response> => {
    try {
      return (await axios.delete<Response>(`${nodeApi.baseURL}/${id}`)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

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
    catchError(() => of(({ type: NodeActionTypes.ADD, payload }))),
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
      catchError(() => of({ type: NodeActionTypes.UPDATE, payload: { id, propsToUpdate } })),
    )),
)

const deleteNodeEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(deleteNodeTrigger.type),
  switchMap(({ payload: { id } }: { payload: DeleteNodePayload }) => from(nodeApi.delete({ id })).pipe(
    map(() => ({ type: NodeActionTypes.DELETE, payload: { id } })),
    catchError(() => of({ type: NodeActionTypes.DELETE, payload: { id } })),
  )),
)

export default combineEpics(
  fetchNodesEpic,
  addNodeEpic,
  updateNodeEpicUI,
  updateNodeEpicRemote,
  deleteNodeEpic,
)
