import { ofType, Epic } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { from } from 'rxjs'
import { catchErrorCallback } from '@/automation-engine/utils'
import { Node } from '@/automation-engine/models/node'
import axios from 'axios'
import { fetchNodes, setNodes } from '../slices/nodeSlice'
import { RootState } from '../types'

const baseURL = 'http://localhost:3000/api/v1/nodes'

const nodeApi = {
  fetchNodes: async (): Promise<Node[]> => {
    const response = await axios.get<Node[]>(`${baseURL}`)

    return response.data
  },
}

const fetchNodesEpic: Epic<any, any, RootState> = (action$) => action$.pipe(
  ofType(fetchNodes.type),
  switchMap(() => from(nodeApi.fetchNodes()).pipe(
    map((nodes) => setNodes({ nodes })),
    catchErrorCallback,
  )),
)

export default fetchNodesEpic
