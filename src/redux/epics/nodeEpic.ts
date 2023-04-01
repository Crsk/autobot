import { ofType, Epic, combineEpics } from 'redux-observable'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { Node } from '@/automation-engine/models/node'
import axios from 'axios'
import { addNodeTrigger, deleteNodeTrigger, fetchNodesTrigger, updateNodeTrigger } from '../slices/nodeSlice'
import { AddNodePayload, DeleteNodePayload, NodeActionTypes, RootState, UpdateNodePayload } from '../types'

const nodeApi = {
  baseURL: 'http://localhost:3000/api/v1/nodes',
  fetch: async (): Promise<Node[]> => {
    const { data: nodes } = await axios.get<Node[]>(`${nodeApi.baseURL}`)

    return nodes
  },
  create: async (newNode: Node): Promise<Node> => {
    const { data: node } = await axios.post<Node>(`${nodeApi.baseURL}`, newNode)

    return node
  },
  update: async (id: number, propsToUpdate: Partial<Node>): Promise<Node> => {
    try {
      const node = (await axios.patch<Node>(`${nodeApi.baseURL}/${id}`, propsToUpdate)).data

      return node
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  delete: async (id: number): Promise<void> => { await axios.delete<void>(`${nodeApi.baseURL}/${id}`) },
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
    map((node) => ({ type: NodeActionTypes.ADD, payload: node })),
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
  switchMap(({ payload: { id, propsToUpdate } }: { payload: UpdateNodePayload }) => from(nodeApi.update(id, propsToUpdate))
    .pipe(
      map((node) => ({ type: NodeActionTypes.UPDATE, payload: node })),
      catchError(() => of({ type: NodeActionTypes.UPDATE, payload: { id, propsToUpdate } })),
    )),
)

const deleteNodeEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(deleteNodeTrigger.type),
  switchMap(({ payload: { id } }: { payload: DeleteNodePayload }) => from(nodeApi.delete(id)).pipe(
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
