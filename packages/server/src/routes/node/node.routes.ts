import { Application, Router } from 'express'
import { createNodeRoute, deleteNodeRoute, updateNodeRoute, getNodesRoute, getNodeRoute, createNodesRoute, deleteNodesRoute, updateNodesRoute } from '.'

export const nodeRoutes = (app: Application, router: Router, baseUrl: string) => {
  getNodeRoute(app, baseUrl, router)
  getNodesRoute(app, baseUrl, router)
  createNodeRoute(app, baseUrl, router)
  deleteNodeRoute(app, baseUrl, router)
  updateNodeRoute(app, baseUrl, router)
  createNodesRoute(app, baseUrl, router)
  deleteNodesRoute(app, baseUrl, router)
  updateNodesRoute(app, baseUrl, router)
}
