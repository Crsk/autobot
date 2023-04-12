import { combineEpics } from 'redux-observable'
import fetchNodesEpic from './fetch.epic'
import addNodeEpic from './add.apic'
import { updateNodeEpicRemote, updateNodeEpicUI } from './update.epic'
import deleteNodeEpic from './delete.epic'

export default combineEpics(
  fetchNodesEpic,
  addNodeEpic,
  updateNodeEpicUI,
  updateNodeEpicRemote,
  deleteNodeEpic,
)
