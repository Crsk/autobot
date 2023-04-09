import { Router } from 'express'
import ConnectionController from '../controllers/connection.controller'

const router = Router()
const { getConnections, getConnection, createConnection, updateConnection, deleteConnection } = ConnectionController

router.get('/connections', getConnections)
router.get('/connections/:id', getConnection)
router.post('/connections', createConnection)
router.put('/connections/:id', updateConnection)
router.delete('/connections/:id', deleteConnection)

export default router
