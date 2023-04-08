import { ofType, Epic } from 'redux-observable'
import { catchError, concatMap, groupBy, mergeMap, toArray } from 'rxjs/operators'
import { EMPTY, from } from 'rxjs'
import { CreateNodePayload, DeleteNodePayload, UpdateNodePayload } from 'shared/src/types/dto'
import nodeApi from '@/api/node/nodes.api'
import { QueueActionTypes, QueueOperation, RootState } from '../types'
import { syncNodesTrigger } from '../slices/queueSlice'

const queueEpic: Epic<any, any, RootState> = (action$, state$) => action$.pipe(
  ofType(syncNodesTrigger.type),
  mergeMap(() => {
    const { ADD, UPDATE, DELETE }: QueueOperation<CreateNodePayload, UpdateNodePayload, DeleteNodePayload> = state$.value.queue.NODE
    const unsyncedNodes: { actionType: QueueActionTypes, payload: (CreateNodePayload | UpdateNodePayload | DeleteNodePayload) }[] = [
      ...Object.values(ADD).map((payload) => ({ actionType: QueueActionTypes.ADD_NODE, payload })),
      ...Object.values(UPDATE).map((payload) => ({ actionType: QueueActionTypes.UPDATE_NODE, payload })),
      ...Object.values(DELETE).map((payload) => ({ actionType: QueueActionTypes.DELETE_NODE, payload })),
    ]

    return unsyncedNodes.length === 0
      ? EMPTY
      : from(unsyncedNodes).pipe(groupBy((node) => node.actionType), mergeMap((group) => group.pipe(toArray())), concatMap((actionGroup) => {
        const { actionType } = actionGroup[0]

        switch (actionType) {
          case QueueActionTypes.ADD_NODE:
            return from(nodeApi.bulkCreate(actionGroup.map((action) => action.payload as CreateNodePayload))).pipe(
              mergeMap(() => actionGroup.map((action) => ({
                type: QueueActionTypes.DELETE_FROM_QUEUE,
                payload: { operation: 'ADD', id: (action.payload as CreateNodePayload).id },
              }))),
              catchError(() => EMPTY),
            )
          case QueueActionTypes.UPDATE_NODE:
            return from(nodeApi.bulkUpdate(actionGroup.map((action) => action.payload as UpdateNodePayload))).pipe(
              mergeMap(() => actionGroup.map((action) => ({
                type: QueueActionTypes.DELETE_FROM_QUEUE,
                payload: { operation: 'UPDATE', id: (action.payload as UpdateNodePayload).id },
              }))),
              catchError(() => EMPTY),
            )
          case QueueActionTypes.DELETE_NODE:
            return from(nodeApi.bulkDelete(actionGroup.map((action) => action.payload as UpdateNodePayload))).pipe(
              mergeMap(() => actionGroup.map((action) => ({
                type: QueueActionTypes.DELETE_FROM_QUEUE,
                payload: { operation: 'DELETE', id: (action.payload as DeleteNodePayload).id },
              }))),
              catchError(() => EMPTY),
            )
          default:
            return EMPTY
        }
      }))
  }),
)

export default queueEpic
