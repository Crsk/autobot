import { Application, Router } from 'express'
import { CreateNodeSchema } from 'shared/src/types/schemas'
import { nodeService } from '../../services'
import { nodeController } from '../../controllers'
import { routeFactory } from '../route.factory'
import schemaValidator from '../../middlewares/schemaValidator.middleware'

const { createNode } = nodeService
const { createNodeController } = nodeController

export const createNodeRoute = (app: Application, baseUrl: string, router: Router) =>
  routeFactory({
    app,
    baseUrl,
    router,
    path: '/node',
    method: 'post',
    middleware: schemaValidator(CreateNodeSchema),
    controller: createNodeController(createNode),
  })
