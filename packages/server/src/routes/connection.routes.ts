import { Router } from 'express'
import ConnectionController from '../controllers/connection.controller'
import { errorHandler } from '../utils/errorHandler'

const router = Router()
const { getConnections, getConnection, createConnection, updateConnection, deleteConnection } = ConnectionController

router.get('/connections', errorHandler(getConnections))
router.get('/connections/:id', errorHandler(getConnection))
router.post('/connections', errorHandler(createConnection))
router.put('/connections/:id', errorHandler(updateConnection))
router.delete('/connections/:id', errorHandler(deleteConnection))

export default router
