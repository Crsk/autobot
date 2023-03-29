import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Node } from '@/automation-engine/models/node'
import { from, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

const NODES_KEY = 'NODES'
const BASE_URL = 'localhost:3000/api'

const fetchNodes = async (): Promise<Node[]> => {
  const response = await axios.get<Node[]>(`${BASE_URL}/nodes`)

  return response.data
}

export const getAllNodes = async (): Promise<Node[]> => {
  try {
    const nodes = await fetchNodes()
    await AsyncStorage.setItem(NODES_KEY, JSON.stringify(nodes))

    return nodes
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to get nodes', error)
    const nodesJson = await AsyncStorage.getItem(NODES_KEY)

    return nodesJson ? JSON.parse(nodesJson) : []
  }
}

const getNodesFromExternalDB = (): Observable<Node[]> => from(axios.get<Node[]>(`${BASE_URL}/nodes`)).pipe(
  map((response) => response.data),
  catchError(() => of([])),
)

const getNodes = (): Observable<Node[]> => getNodesFromExternalDB().pipe(
  catchError(() => from(AsyncStorage.getItem(NODES_KEY)).pipe(map((nodesJson) => (nodesJson ? JSON.parse(nodesJson) : [])))),
)

export default { getNodes }
