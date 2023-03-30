import { ofType, Epic, combineEpics } from 'redux-observable'
import { catchError, map, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { Node } from '@/automation-engine/models/node'
import axios from 'axios'
import { addNodeTrigger, deleteNodeTrigger, fetchNodesTrigger, updateConnectionsTrigger, updateNodeTrigger } from '../slices/nodeSlice'
import { AddNodePayload, ConnectionActionTypes, DeleteNodePayload, NodeActionTypes, RootState, UpdateConnectionsPayload, UpdateNodePayload } from '../types'

const nodeApi = {
  baseURL: 'http://localhost:3000/api/v1/nodes',
  fetch: async (): Promise<Node[]> => (await axios.get<Node[]>(`${nodeApi.baseURL}`)).data,
  create: async (node: Node): Promise<Node> => (await axios.post<Node>(`${nodeApi.baseURL}`, node)).data,
  update: async (id: string, propsToUpdate: Partial<Node>): Promise<Node> => (await axios.put<Node>(`${nodeApi.baseURL}/${id}`, propsToUpdate)).data,
  delete: async (id: string): Promise<void> => { await axios.delete<void>(`${nodeApi.baseURL}/${id}`) },
}

const connectionApi = {
  baseURL: 'http://localhost:3000/api/v1/connections',
  update: async (): Promise<void> => { await axios.put<void>(`${nodeApi.baseURL}`) },
}

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

const updateNodeEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(updateNodeTrigger.type),
  switchMap(({ payload: { id, propsToUpdate } }: { payload: UpdateNodePayload }) => from(nodeApi.update(id, propsToUpdate)).pipe(
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

const updateConnectionsEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(updateConnectionsTrigger.type),
  switchMap(({ payload: { nodes, snapToGrid = false } }: { payload: UpdateConnectionsPayload }) => from(connectionApi.update()).pipe(
    map(() => ({ type: ConnectionActionTypes.UPDATE, payload: { nodes, snapToGrid } })),
    catchError(() => of({ type: ConnectionActionTypes.UPDATE, payload: { nodes, snapToGrid } })),
  )),
)

export default combineEpics(
  fetchNodesEpic,
  addNodeEpic,
  updateNodeEpic,
  deleteNodeEpic,
  updateConnectionsEpic,
)
