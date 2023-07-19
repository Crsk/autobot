import { Application, Router } from 'express'
import { nodeService } from '../../services'
import { nodeController } from '../../controllers'
import { routeFactory } from '../route.factory'

const { getNodes } = nodeService
const { getNodesController } = nodeController

export const getNodesRoute = (app: Application, baseUrl: string, router: Router) =>
  routeFactory({
    app,
    baseUrl,
    router,
    path: '/nodes',
    method: 'get',
    controller: getNodesController(getNodes),
  })
