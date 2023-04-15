import { describe, expect, it } from '@jest/globals'
import { lastValueFrom, of } from 'rxjs'
import { CreateNodeBody } from 'shared/src/types/dto'
import { StateObservable } from 'redux-observable'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import nodeApi from '@/api/node/nodes.api'
import { addNodeTrigger } from '@/redux/slices/nodeSlice'
import { NodeActionTypes, RootState } from '@/redux/types'
import addNodeEpic from './node/add.epic'

describe('nodeEpic', () => {
  it('should handle addNodeEpic remotly', async () => {
    const mockAxios = new MockAdapter(axios)
    const payload: CreateNodeBody = { id: 'test', name: 'test', x: 100, y: 100, parentId: '1' }
    mockAxios.onPost(nodeApi.baseURL, payload).reply(200, { message: 'Success', success: true, payload })

    const action$ = of(addNodeTrigger(payload))
    const initialState: RootState = {} as RootState
    const state$ = new StateObservable(of(initialState), initialState)
    const dependencies = { nodeApi }
    const output$ = addNodeEpic(action$, state$, dependencies)
    const result = await lastValueFrom(output$)

    expect(result).toEqual({ type: NodeActionTypes.ADD, payload })
  })
})
