import { Application, Router } from 'express'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { routeFactory } from '../../route.factory'

const { deleteNodes } = nodeService
const { deleteNodesController } = nodeController

export const deleteNodesRoute = (app: Application, baseUrl: string, router: Router) => (
  routeFactory({
    app,
    baseUrl,
    router,
    path: '/nodes/bulk-delete',
    method: 'post',
    controller: deleteNodesController(deleteNodes),
  })
)
