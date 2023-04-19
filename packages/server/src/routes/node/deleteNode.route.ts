import { Application, Router } from 'express'
import { DeleteNodeParamsSchema } from 'shared/src/types/schemas'
import { nodeService } from '../../services'
import { errorHandler } from '../../utils/errorHandler'
import { nodeController } from '../../controllers'
import schemaValidator from '../../middlewares/schemaValidator.middleware'

const { getNode, deleteNode } = nodeService
const { deleteNodeController } = nodeController

export const deleteNodeRoute = (app: Application, baseUrl: string, router: Router) => app.use(
  baseUrl,
  router.delete('/nodes/:id', schemaValidator(DeleteNodeParamsSchema), errorHandler(deleteNodeController(getNode, deleteNode))),
)
