import { ofType, Epic, combineEpics } from 'redux-observable'
import { catchError, concatMap, debounceTime, groupBy, map, mergeMap, switchMap, toArray } from 'rxjs/operators'
import { EMPTY, from, of } from 'rxjs'
import axios from 'axios'
import { addNodeTrigger, deleteNodeTrigger, fetchNodesTrigger, syncNodesTrigger, updateNodeTrigger } from '../slices/nodeSlice'
import { AddNodePayload, DeleteNodePayload, NodeActionTypes, QueueOperation, RootState, UpdateNodePayload } from '../types'

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
  bulkCreate: async (payloads: (AddNodePayload & { timestamp: number })[]): Promise<Response> => {
    try {
      return (await axios.post<Response>(`${nodeApi.baseURL}/bulk-create`, payloads)).data
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
    catchError(() => of(({ type: NodeActionTypes.ADD, payload: { ...payload, queueTimestamp: Date.now() } }))),
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
      catchError(() => of({ type: NodeActionTypes.UPDATE, payload: { id, propsToUpdate, queueTimestamp: Date.now() } })),
    )),
)

const deleteNodeEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(deleteNodeTrigger.type),
  switchMap(({ payload: { id } }: { payload: DeleteNodePayload }) => from(nodeApi.delete({ id })).pipe(
    map(() => ({ type: NodeActionTypes.DELETE, payload: { id } })),
    catchError(() => of({ type: NodeActionTypes.DELETE, payload: { id, queueTimestamp: Date.now() } })),
  )),
)
const syncNodesEpic: Epic<any, any, RootState> = (action$, state$) => action$.pipe(
  ofType(syncNodesTrigger.type),
  mergeMap(() => {
    const { ADD, UPDATE, DELETE }: QueueOperation<AddNodePayload, UpdateNodePayload, DeleteNodePayload> = state$.value.syncQueue.NODE
    const unsyncedNodes: { actionType: NodeActionTypes, payload: (AddNodePayload | UpdateNodePayload | DeleteNodePayload) & { timestamp: number } }[] = [
      ...Object.values(ADD).map((payload) => ({ actionType: NodeActionTypes.ADD, payload })),
      ...Object.values(UPDATE).map((payload) => ({ actionType: NodeActionTypes.UPDATE, payload })),
      ...Object.values(DELETE).map((payload) => ({ actionType: NodeActionTypes.DELETE, payload })),
    ]

    return unsyncedNodes.length === 0
      ? EMPTY
      : from(unsyncedNodes).pipe(groupBy((node) => node.actionType), mergeMap((group) => group.pipe(toArray())), concatMap((actionGroup) => {
        console.log(actionGroup)
        const { actionType } = actionGroup[0]

        switch (actionType) {
          case NodeActionTypes.ADD:
            return from(nodeApi.bulkCreate(actionGroup.map((action) => action.payload as AddNodePayload & { timestamp: number }))).pipe(
              mergeMap(() => actionGroup.map((action) => ({
                type: NodeActionTypes.DELETE_FROM_QUEUE,
                payload: { operation: 'ADD', id: (action.payload as AddNodePayload).id },
              }))),
              catchError(() => EMPTY),
            )
          default:
            return EMPTY
        }
      }))
  }),
)

export default combineEpics(
  fetchNodesEpic,
  addNodeEpic,
  updateNodeEpicUI,
  updateNodeEpicRemote,
  deleteNodeEpic,
  syncNodesEpic,
)
