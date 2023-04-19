import { Application, Router } from 'express'
import { CreateNodeSchema } from 'shared/src/types/schemas'
import { nodeService } from '../../services'
import { nodeController } from '../../controllers'
import { errorHandler } from '../../utils/errorHandler'
import schemaValidator from '../../middlewares/schemaValidator.middleware'

const { createNode } = nodeService
const { createNodeController } = nodeController

export const createNodeRoute = (app: Application, baseUrl: string, router: Router) => app.use(
  baseUrl,
  router.post('/node', schemaValidator(CreateNodeSchema), errorHandler(createNodeController(createNode))),
)
