import { Application, Router } from 'express'
import { DeleteNodeBodySchema } from 'shared/src/types/schemas'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { routeFactory } from '../../route.factory'
import schemaValidator from '../../../middlewares/schemaValidator.middleware'

const { updateNodes } = nodeService
const { updateNodesController } = nodeController

export const updateNodesRoute = (app: Application, baseUrl: string, router: Router) => (
  routeFactory({
    app,
    baseUrl,
    router,
    path: '/nodes/bulk-update',
    method: 'post',
    middleware: schemaValidator(DeleteNodeBodySchema),
    controller: updateNodesController(updateNodes),
  })
)
