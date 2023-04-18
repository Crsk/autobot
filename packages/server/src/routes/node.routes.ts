import { Router } from 'express'
import { CreateNodeSchema, UpdateNodeBodySchema, DeleteNodeBodySchema, DeleteNodeParamsSchema } from 'shared/src/types/schemas'
import { errorHandler } from '../utils/errorHandler'
import schemaValidator from '../middlewares/schemaValidator.middleware'
import { nodeController } from '../controllers/node.controller'

const router = Router()
const { getNodes, getNode, createNode, updateNode, deleteNode, bulkCreate, bulkUpdate, bulkDelete } = nodeController

router.get('/nodes', errorHandler(getNodes))
router.get('/nodes/:id', errorHandler(getNode))
router.post('/node', schemaValidator(CreateNodeSchema), errorHandler(createNode))
router.patch('/nodes/:id', schemaValidator(UpdateNodeBodySchema), errorHandler(updateNode))
router.delete('/nodes/:id', schemaValidator(DeleteNodeParamsSchema), errorHandler(deleteNode))
router.post('/nodes/bulk-create', errorHandler(bulkCreate))
router.post('/nodes/bulk-update', errorHandler(bulkUpdate))
router.post('/nodes/bulk-delete', schemaValidator(DeleteNodeBodySchema), errorHandler(bulkDelete))

export default router
