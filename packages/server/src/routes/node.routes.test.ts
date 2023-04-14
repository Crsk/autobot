import { Application } from 'express'
import request from 'supertest'
import { describe, it, afterEach, beforeAll } from '@jest/globals'
import app from '../app'
import NodeService from '../services/node.service'

jest.mock('../services/node.service')
const mockedNodeService = jest.mocked(NodeService)
let testApp: Application

const mockNodesResponse: any = [
  { id: 1, name: 'Node 1', x: 10, y: 20, parentId: null },
  { id: 2, name: 'Node 2', x: 30, y: 40, parentId: 1 },
]

describe('Node Routes', () => {
  beforeAll(() => { testApp = app })
  afterEach(() => { jest.clearAllMocks() })

  describe('GET /nodes', () => {
    it('should return a list of nodes with status 200', async () => {
      mockedNodeService.getNodes.mockResolvedValue(mockNodesResponse)
      const response = await request(testApp).get('/api/v1/nodes')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Success', payload: mockNodesResponse, success: true })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 404 when nodes are not found', async () => {
      mockedNodeService.getNodes.mockResolvedValue([])
      const response = await request(testApp).get('/api/v1/nodes')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Nodes not found', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when fails', async () => {
      mockedNodeService.getNodes.mockRejectedValue(new Error('Internal Server Error'))
      const response = await request(testApp).get('/api/v1/nodes')

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ message: 'Internal Server Error', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })
})
