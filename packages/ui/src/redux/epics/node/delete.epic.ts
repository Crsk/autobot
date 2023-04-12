import nodeApi from '@/api/node/nodes.api'
import { deleteNodeTrigger } from '@/redux/slices/nodeSlice'
import { handleRemoteEpic } from '../handleRemote.epic'

const deleteNodeEpic = handleRemoteEpic(deleteNodeTrigger.type, nodeApi.delete)

export default deleteNodeEpic
