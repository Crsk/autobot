import { Application, Router } from 'express'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { route } from '../../route'

const { createNodes } = nodeService
const { createNodesController } = nodeController

export const createNodesRoute = (app: Application, baseUrl: string, router: Router) => (
  route({
    app,
    baseUrl,
    router,
    path: '/nodes/bulk-create',
    method: 'post',
    controller: createNodesController(createNodes),
  })
)
