import { Application, Router } from 'express'
import { errorHandler } from '../../utils/errorHandler'
import { nodeService } from '../../services'
import { nodeController } from '../../controllers'

const { getNodes } = nodeService
const { getNodesController } = nodeController

export const getNodesRoute = (app: Application, baseUrl: string, router: Router) => app.use(
  baseUrl,
  router.get('/nodes', errorHandler(getNodesController(getNodes))),
)
