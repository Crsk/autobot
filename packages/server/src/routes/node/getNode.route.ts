import { Application, Router } from 'express'
import { getNodeController } from '../../controllers/node/getNode.controller'
import { nodeService } from '../../services'
import { routeFactory } from '../route.factory'

const { getNode } = nodeService

export const getNodeRoute = (app: Application, baseUrl: string, router: Router) =>
  routeFactory({
    app,
    baseUrl,
    router,
    path: '/nodes/:id',
    method: 'get',
    controller: getNodeController(getNode),
  })
