import { Application, Router } from 'express'
import { DeleteNodeBodySchema } from 'shared/src/types/schemas'
import { nodeService } from '../../../services'
import { nodeController } from '../../../controllers'
import { errorHandler } from '../../../utils/errorHandler'
import schemaValidator from '../../../middlewares/schemaValidator.middleware'

const { deleteNodes } = nodeService
const { deleteNodesController } = nodeController

export const deleteNodesRoute = (app: Application, baseUrl: string, router: Router) => app.use(
  baseUrl,
  router.post('/nodes/bulk-delete', schemaValidator(DeleteNodeBodySchema), errorHandler(deleteNodesController(deleteNodes))),
)
