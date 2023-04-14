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
    it('should return status 200 and a list of nodes', async () => {
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

    it('should return status 500 when it fails', async () => {
      mockedNodeService.getNodes.mockRejectedValue(new Error())
      const response = await request(testApp).get('/api/v1/nodes')

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ message: 'Internal Server Error', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('POST /node', () => {
    it('should return status 200 and create a new node', async () => {
      const newNode: any = { id: 3, name: 'Node 3', x: 50, y: 60, parentId: 1 }
      mockedNodeService.createNode.mockResolvedValue(newNode)
      const response = await request(testApp).post('/api/v1/node').send(newNode)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: `Node id ${newNode.id} was created`, payload: newNode, success: true })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 400 when missing required fields', async () => {
      const newNode = { name: 'Node 3', x: 50, parentId: 1 } // missing 'y'
      const response = await request(testApp).post('/api/v1/node').send(newNode)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Bad Request: Missing required fields', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when it fails', async () => {
      const newNode = { id: 3, name: 'Node 3', x: 50, y: 60, parentId: 1 }
      mockedNodeService.createNode.mockRejectedValue(new Error())
      const response = await request(testApp).post('/api/v1/node').send(newNode)

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ message: 'Internal Server Error', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('PATCH /nodes/:id', () => {
    it('should return status 200 and update existing node', async () => {
      const nodeId = 1
      const updateData = { name: 'Updated Node', x: 20, y: 30 }
      const updatedNode = { ...mockNodesResponse[0], ...updateData }
      mockedNodeService.getNode.mockResolvedValue(mockNodesResponse[0])
      mockedNodeService.updateNode.mockResolvedValue(updatedNode)
      const response = await request(testApp).patch(`/api/v1/nodes/${nodeId}`).send(updateData)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: `Node ${nodeId} updated successfully`, payload: updatedNode, success: true })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 404 when node not found', async () => {
      const nodeId = 'INVALID_ID'
      mockedNodeService.getNode.mockResolvedValue(undefined)
      mockedNodeService.updateNode.mockResolvedValue(undefined)
      const response = await request(testApp).patch(`/api/v1/nodes/${nodeId}`).send({ id: nodeId })

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Node not found', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when update fails', async () => {
      const nodeId = 1
      const updateData = { name: 'Updated Node', x: 20, y: 30 }
      mockedNodeService.getNode.mockResolvedValue(mockNodesResponse[0])
      mockedNodeService.updateNode.mockRejectedValue(new Error())
      const response = await request(testApp).patch(`/api/v1/nodes/${nodeId}`).send(updateData)

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ message: 'Internal Server Error', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('DELETE /nodes/:id', () => {
    it('should return status 200 and delete existing node', async () => {
      const nodeId = 1
      mockedNodeService.getNode.mockResolvedValue(mockNodesResponse[0])
      mockedNodeService.deleteNode.mockResolvedValue(true)
      const response = await request(testApp).delete(`/api/v1/nodes/${nodeId}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Node deleted successfully', payload: {}, success: true })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 404 when node not found', async () => {
      const nodeId = 'INVALID_ID'
      mockedNodeService.getNode.mockResolvedValue(undefined)
      mockedNodeService.deleteNode.mockResolvedValue(false)
      const response = await request(testApp).delete(`/api/v1/nodes/${nodeId}`)

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Node not found', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when delete fails', async () => {
      const nodeId = 1
      mockedNodeService.getNode.mockResolvedValue(mockNodesResponse[0])
      mockedNodeService.deleteNode.mockRejectedValue(new Error())
      const response = await request(testApp).delete(`/api/v1/nodes/${nodeId}`)

      expect(response.status).toBe(500)
      expect(response.body).toEqual({ message: 'Internal Server Error', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })
})
