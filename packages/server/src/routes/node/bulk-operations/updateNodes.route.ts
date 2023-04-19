import { Application, Router } from 'express'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { errorHandler } from '../../../utils/errorHandler'

const { updateNodes } = nodeService
const { updateNodesController } = nodeController

export const updateNodesRoute = (app: Application, baseUrl: string, router: Router) => app.use(
  baseUrl,
  router.post('/nodes/bulk-update', errorHandler(updateNodesController(updateNodes))),
)
