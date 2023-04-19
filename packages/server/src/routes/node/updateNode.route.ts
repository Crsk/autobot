import { Application, Router } from 'express'
import { UpdateNodeBodySchema } from 'shared/src/types/schemas'
import { nodeController } from '../../controllers'
import { nodeService } from '../../services'
import { errorHandler } from '../../utils/errorHandler'
import schemaValidator from '../../middlewares/schemaValidator.middleware'

const { getNode, updateNode } = nodeService
const { updateNodeController } = nodeController

export const updateNodeRoute = (app: Application, baseUrl: string, router: Router) => app.use(
  baseUrl,
  router.patch('/nodes/:id', schemaValidator(UpdateNodeBodySchema), errorHandler(updateNodeController(getNode, updateNode))),
)
