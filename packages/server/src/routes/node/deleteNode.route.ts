import { Application, Router } from 'express'
import { DeleteNodeParamsSchema } from 'shared/src/types/schemas'
import { nodeService } from '../../services'
import { nodeController } from '../../controllers'
import schemaValidator from '../../middlewares/schemaValidator.middleware'
import { route } from '../route'

const { getNode, deleteNode } = nodeService
const { deleteNodeController } = nodeController

export const deleteNodeRoute = (app: Application, baseUrl: string, router: Router) => (
  route({
    app,
    baseUrl,
    router,
    path: '/nodes/:id',
    method: 'delete',
    middleware: schemaValidator(DeleteNodeParamsSchema),
    controller: deleteNodeController(getNode, deleteNode),
  })
)
