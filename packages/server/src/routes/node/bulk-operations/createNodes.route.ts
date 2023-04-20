import { Application, Router } from 'express'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { routeFactory } from '../../route.factory'

const { createNodes } = nodeService
const { createNodesController } = nodeController

export const createNodesRoute = (app: Application, baseUrl: string, router: Router) => (
  routeFactory({
    app,
    baseUrl,
    router,
    path: '/nodes/bulk-create',
    method: 'post',
    controller: createNodesController(createNodes),
  })
)
