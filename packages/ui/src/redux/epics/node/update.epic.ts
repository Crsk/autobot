import { Epic, ofType } from 'redux-observable'
import { UpdateNodeBody } from 'shared/src/types/dto'
import { map } from 'rxjs'
import nodeApi from '@/api/node/nodes.api'
import { NodeActionTypes, RootState } from '@/redux/types'
import { updateNodeTrigger } from '@/redux/slices/nodeSlice'
import { handleRemoteEpic } from '../handleRemote.epic'

/**
 * Update the node in the UI immediately, no matter if the remote update is successful or not.
 */
const updateNodeEpicUI: Epic<any, any, RootState> = action$ =>
  action$.pipe(
    ofType(updateNodeTrigger.type),
    map(({ payload }: { payload: UpdateNodeBody }) => ({ type: NodeActionTypes.UPDATE, payload }))
  )

const updateNodeEpicRemote = handleRemoteEpic(updateNodeTrigger.type, nodeApi.update)

export { updateNodeEpicUI, updateNodeEpicRemote }
