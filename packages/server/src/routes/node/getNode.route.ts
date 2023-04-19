import { Router, Application } from 'express'
import { errorHandler } from '../../utils/errorHandler'
import { getNodeController } from '../../controllers/node/getNode.controller'
import { nodeService } from '../../services'

const { getNode } = nodeService
const controller = getNodeController(getNode)

export const getNodeRoute = (app: Application, baseUrl: string, router: Router) => app.use(
  baseUrl,
  router.get('/nodes/:id', errorHandler(controller)),
)
