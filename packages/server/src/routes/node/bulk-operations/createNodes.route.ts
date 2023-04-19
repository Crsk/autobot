import { Application, Router } from 'express'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { errorHandler } from '../../../utils/errorHandler'

const { createNodes } = nodeService
const { createNodesController } = nodeController

export const createNodesRoute = (app: Application, baseUrl: string, router: Router) => app.use(
  baseUrl,
  router.post('/nodes/bulk-create', errorHandler(createNodesController(createNodes))),
)
