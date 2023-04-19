import { Router, Application } from 'express'
import { getNodeController } from '../../controllers/node/getNode.controller'
import { nodeService } from '../../services'
import { route } from '../route'

const { getNode } = nodeService

export const getNodeRoute = (app: Application, baseUrl: string, router: Router) => (
  route({
    app,
    baseUrl,
    router,
    path: '/nodes/:id',
    method: 'get',
    controller: getNodeController(getNode),
  })
)
