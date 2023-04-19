import { Application, Router } from 'express'
import { nodeService } from '../../services'
import { nodeController } from '../../controllers'
import { route } from '../route'

const { getNodes } = nodeService
const { getNodesController } = nodeController

export const getNodesRoute = (app: Application, baseUrl: string, router: Router) => (
  route({
    app,
    baseUrl,
    router,
    path: '/nodes',
    method: 'get',
    controller: getNodesController(getNodes),
  })
)
