import { Application, Router } from 'express'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { route } from '../../route'

const { deleteNodes } = nodeService
const { deleteNodesController } = nodeController

export const deleteNodesRoute = (app: Application, baseUrl: string, router: Router) => (
  route({
    app,
    baseUrl,
    router,
    path: '/nodes/bulk-delete',
    method: 'post',
    controller: deleteNodesController(deleteNodes),
  })
)
