import { Application, Router } from 'express'
import { UpdateNodeParamsSchema } from 'shared/src/types/schemas'
import { nodeController } from '../../controllers'
import { nodeService } from '../../services'
import schemaValidator from '../../middlewares/schemaValidator.middleware'
import { route } from '../route'

const { getNode, updateNode } = nodeService
const { updateNodeController } = nodeController

export const updateNodeRoute = (app: Application, baseUrl: string, router: Router) => (
  route({
    app,
    baseUrl,
    router,
    path: '/nodes/:id',
    method: 'patch',
    middleware: schemaValidator(UpdateNodeParamsSchema),
    controller: updateNodeController(getNode, updateNode),
  })
)
