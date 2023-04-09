import { Router } from 'express'
import NodeController from '../controllers/node.controller'

const router = Router()
const { getNodes, getNode, createNode, updateNode, deleteNode, bulkCreate, bulkUpdate, bulkDelete } = NodeController

router.get('/nodes', getNodes)
router.get('/nodes/:id', getNode)
router.post('/nodes', createNode)
router.patch('/nodes/:id', updateNode)
router.delete('/nodes/:id', deleteNode)
router.post('/nodes/bulk-create', bulkCreate)
router.post('/nodes/bulk-update', bulkUpdate)
router.post('/nodes/bulk-delete', bulkDelete)

export default router
