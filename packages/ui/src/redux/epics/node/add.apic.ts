import nodeApi from '@/api/node/nodes.api'
import { addNodeTrigger } from '@/redux/slices/nodeSlice'
import { handleRemoteEpic } from '../handleRemote.epic'

const addNodeEpic = handleRemoteEpic(addNodeTrigger.type, nodeApi.create)

export default addNodeEpic
