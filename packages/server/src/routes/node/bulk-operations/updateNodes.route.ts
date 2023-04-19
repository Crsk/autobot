import { Application, Router } from 'express'
import { DeleteNodeBodySchema } from 'shared/src/types/schemas'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { route } from '../../route'
import schemaValidator from '../../../middlewares/schemaValidator.middleware'

const { updateNodes } = nodeService
const { updateNodesController } = nodeController

export const updateNodesRoute = (app: Application, baseUrl: string, router: Router) => (
  route({
    app,
    baseUrl,
    router,
    path: '/nodes/bulk-update',
    method: 'post',
    middleware: schemaValidator(DeleteNodeBodySchema),
    controller: updateNodesController(updateNodes),
  })
)
