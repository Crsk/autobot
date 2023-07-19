import { ParsedQs } from 'qs'
import { ParamsDictionary, RequestHandlerParams } from 'express-serve-static-core'
import { Application, Router } from 'express'
import { errorHandler } from '../utils/errorHandler'

type RouterMethod = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
type Middleware = RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
type RouteProps = {
  app: Application
  baseUrl: string
  path: string
  router: Router
  method: RouterMethod
  controller: any
  validationFn?: () => void
  middleware?: Middleware
}

export const routeFactory = ({ app, baseUrl, path, router, method, controller, middleware }: RouteProps) =>
  middleware
    ? app.use(baseUrl, router[method](path, middleware, errorHandler(controller)))
    : app.use(baseUrl, router[method](path, errorHandler(controller)))
