import { Application } from 'express'
import request from 'supertest'
import { afterEach, describe, it } from '@jest/globals'
import { DeleteNodeBody } from 'shared/src/types/dto'
import app from '../app'
import { nodeService } from '../services'

jest.mock('../services')
const mockedNodeService = jest.mocked(nodeService)
const { getNodes, getNode, createNode, updateNode, deleteNode, createNodes, updateNodes, deleteNodes } =
  mockedNodeService
const testApp: Application = app

const mockNodesResponse: any = [
  { id: '1', name: 'Node 1', x: 10, y: 20, parentId: null },
  { id: '2', name: 'Node 2', x: 30, y: 40, parentId: '1' },
]

describe('Node Routes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /nodes', () => {
    it('should return status 200 and a list of nodes', async () => {
      getNodes.mockResolvedValue(mockNodesResponse)
      const response = await request(testApp).get('/api/v1/nodes')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Success', payload: mockNodesResponse, success: true })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 404 when nodes are not found', async () => {
      getNodes.mockResolvedValue([])
      const response = await request(testApp).get('/api/v1/nodes')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Nodes not found', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when it fails', async () => {
      getNodes.mockRejectedValue(new Error())
      const response = await request(testApp).get('/api/v1/nodes')

      expect(response.status).toBe(500)
      expect(response.body.success).toBe(false)
      expect(response.body.payload).toMatchObject({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('GET /node', () => {
    it('should return status 200 and a node', async () => {
      getNode.mockResolvedValue(mockNodesResponse[0])
      const response = await request(testApp).get('/api/v1/nodes/1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Success', payload: mockNodesResponse[0], success: true })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 404 when node is not found', async () => {
      getNode.mockResolvedValue(undefined)
      const response = await request(testApp).get('/api/v1/nodes/1')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Node not found', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when it fails', async () => {
      getNode.mockRejectedValue(new Error())
      const response = await request(testApp).get('/api/v1/nodes/1')

      expect(response.status).toBe(500)
      expect(response.body.success).toBe(false)
      expect(response.body.payload).toMatchObject({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('POST /node', () => {
    it('should return status 201 and create a new node', async () => {
      const newNode: any = { id: '3', name: 'Node 3', x: 50, y: 60, parentId: '1' }
      createNode.mockResolvedValue(newNode)
      const response = await request(testApp).post('/api/v1/node').send(newNode)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: `Node id ${newNode.id} was created`, payload: newNode, success: true })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 400 when missing required fields', async () => {
      const newNode = { name: 'Node 3', x: 50, parentId: '1' } // missing 'y'
      const response = await request(testApp).post('/api/v1/node').send(newNode)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Bad Request: Missing required fields', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when it fails', async () => {
      const newNode = { id: '3', name: 'Node 3', x: 50, y: 60, parentId: '1' }
      createNode.mockRejectedValue(new Error())
      const response = await request(testApp).post('/api/v1/node').send(newNode)

      expect(response.status).toBe(500)
      expect(response.body.success).toBe(false)
      expect(response.body.payload).toMatchObject({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('PATCH /nodes/:id', () => {
    it('should return status 200 and update existing node', async () => {
      const nodeId = 1
      const updateData = { name: 'Updated Node', x: 20, y: 30 }
      const updatedNode = { ...mockNodesResponse[0], ...updateData }
      getNode.mockResolvedValue(mockNodesResponse[0])
      updateNode.mockResolvedValue(updatedNode)
      const response = await request(testApp).patch(`/api/v1/nodes/${nodeId}`).send(updateData)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        message: `Node ${nodeId} updated successfully`,
        payload: updatedNode,
        success: true,
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 404 when node not found', async () => {
      const nodeId = 'INVALID_ID'
      getNode.mockResolvedValue(undefined)
      updateNode.mockResolvedValue(undefined)
      const response = await request(testApp).patch(`/api/v1/nodes/${nodeId}`).send({ id: nodeId })

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Node not found', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when update fails', async () => {
      const nodeId = 1
      const updateData = { name: 'Updated Node', x: 20, y: 30 }
      getNode.mockResolvedValue(mockNodesResponse[0])
      updateNode.mockRejectedValue(new Error())
      const response = await request(testApp).patch(`/api/v1/nodes/${nodeId}`).send(updateData)

      expect(response.status).toBe(500)
      expect(response.body.success).toBe(false)
      expect(response.body.payload).toMatchObject({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('DELETE /nodes/:id', () => {
    it('should return status 200 and delete existing node', async () => {
      const nodeId = 1
      getNode.mockResolvedValue(mockNodesResponse[0])
      deleteNode.mockResolvedValue(true)
      const response = await request(testApp).delete(`/api/v1/nodes/${nodeId}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Node deleted successfully', payload: {}, success: true })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 404 when node not found', async () => {
      const nodeId = 'INVALID_ID'
      getNode.mockResolvedValue(undefined)
      deleteNode.mockResolvedValue(false)
      const response = await request(testApp).delete(`/api/v1/nodes/${nodeId}`)

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Node not found', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when delete fails', async () => {
      const nodeId = 1
      getNode.mockResolvedValue(mockNodesResponse[0])
      deleteNode.mockRejectedValue(new Error())
      const response = await request(testApp).delete(`/api/v1/nodes/${nodeId}`)

      expect(response.status).toBe(500)
      expect(response.body.success).toBe(false)
      expect(response.body.payload).toMatchObject({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('POST /bulk-create', () => {
    it('should return status 201 and create new nodes', async () => {
      const newNodes: any = [
        { id: '3', name: 'Node 3', x: 50, y: 60, parentId: '1' },
        { id: '4', name: 'Node 4', x: 70, y: 80, parentId: '1' },
      ]
      createNodes.mockResolvedValue(2)
      const response = await request(testApp).post('/api/v1/nodes/bulk-create').send(newNodes)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: '2 Nodes created successfully', success: true, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 400 when missing nodes to create', async () => {
      const newNodes = undefined
      const response = await request(testApp).post('/api/v1/nodes/bulk-create').send(newNodes)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Bad Request: Missing required fields', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 400 when missing required fields', async () => {
      const newNodes = [
        { name: 'Node 3', x: 50, y: 60, parentId: '1' },
        { name: 'Node 4', x: 70, y: 80, parentId: '1' },
      ] // missing 'id'
      const response = await request(testApp).post('/api/v1/nodes/bulk-create').send(newNodes)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Bad Request: Missing required fields', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when it fails', async () => {
      const newNodes = [
        { id: '3', name: 'Node 3', x: 50, y: 60, parentId: '1' },
        { id: '4', name: 'Node 4', x: 70, y: 80, parentId: '1' },
      ]
      createNodes.mockRejectedValue(new Error())
      const response = await request(testApp).post('/api/v1/nodes/bulk-create').send(newNodes)

      expect(response.status).toBe(500)
      expect(response.body.success).toBe(false)
      expect(response.body.payload).toMatchObject({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('POST /bulk-update', () => {
    it('should return status 200 and update existing nodes', async () => {
      const updateData = [
        { id: '1', propsToUpdate: { name: 'Updated Node 1', x: 20, y: 30 } },
        { id: '2', propsToUpdate: { name: 'Updated Node 2', x: 40, y: 50 } },
      ]
      updateNodes.mockResolvedValue(2)
      const response = await request(testApp).post('/api/v1/nodes/bulk-update').send(updateData)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: '2 Nodes updated successfully', success: true, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 400 when missing nodes to update', async () => {
      const updateData = undefined
      const response = await request(testApp).post('/api/v1/nodes/bulk-update').send(updateData)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Bad Request: Missing required fields', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 400 when missing required fields', async () => {
      const updateData = [
        { propsToUpdate: { name: 'Updated Node 1', x: 20, y: 30 } }, // missing 'id'
        { id: '2', propsToUpdate: { name: 'Updated Node 2', x: 40, y: 50 } },
      ]
      const response = await request(testApp).post('/api/v1/nodes/bulk-update').send(updateData)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Bad Request: Missing required fields', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when it fails', async () => {
      const updateData = [
        { id: '1', name: 'Updated Node 1', x: 20, y: 30 },
        { id: '2', name: 'Updated Node 2', x: 40, y: 50 },
      ]
      updateNodes.mockRejectedValue(new Error())
      const response = await request(testApp).post('/api/v1/nodes/bulk-update').send(updateData)

      expect(response.status).toBe(500)
      expect(response.body.success).toBe(false)
      expect(response.body.payload).toMatchObject({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })

  describe('POST /bulk-delete', () => {
    it('should return status 200 and delete existing nodes', async () => {
      const payloads: DeleteNodeBody[] = [{ id: '1' }, { id: '2' }]

      deleteNodes.mockResolvedValue(2)
      const response = await request(testApp).post('/api/v1/nodes/bulk-delete').send(payloads)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: '2 Nodes deleted successfully', success: true, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 400 when missing required fields', async () => {
      const payloads = undefined
      const response = await request(testApp).post('/api/v1/nodes/bulk-delete').send(payloads)

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ message: 'Bad Request: Missing required fields', success: false, payload: {} })
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('should return status 500 when it fails', async () => {
      const payloads: DeleteNodeBody[] = [{ id: '1' }, { id: '2' }]
      deleteNodes.mockRejectedValue(new Error())
      const response = await request(testApp).post('/api/v1/nodes/bulk-delete').send(payloads)

      expect(response.status).toBe(500)
      expect(response.body.success).toBe(false)
      expect(response.body.payload).toMatchObject({})
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
  })
})
