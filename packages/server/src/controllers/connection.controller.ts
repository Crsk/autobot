import { Request, Response } from 'express'
import { Connection } from 'shared/src/types/models'
import tryCatch from '../utils/tryCatch'
import ConnectionService from '../services/connection.service'

@tryCatch
class ConnectionController {
  public static async getConnections(_req: Request, res: Response): Promise<Response> {
    const connections = await ConnectionService.getConnections()

    return res.status(200).json([...connections])
  }

  public static async getConnection(req: Request, res: Response): Promise<Response<Connection>> {
    const id = +req.params.id
    const connection = await ConnectionService.getConnection(id)

    return connection ? res.status(200).json(connection) : res.status(404).json({ message: 'Connection not found' })
  }

  public static async createConnection(req: Request<Omit<Connection, 'id'>>, res: Response): Promise<Response> {
    const newConnection: any = {
      name: req.params.name,
      parent_id: req.params.parentId,
      child_id: req.params.childId,
    }
    const insertId = await ConnectionService.createConnection(newConnection)

    return insertId ? res.status(201).json({ ...newConnection, id: insertId }) : res.status(500).json({ message: 'Failed to create connection' })
  }

  public static async updateConnection(req: Request, res: Response): Promise<Response> {
    const id = +req.params.id
    const updatedConnection: Partial<Connection> = req.body
    const connection = await ConnectionService.updateConnection(id, updatedConnection)

    return connection ? res.status(200).json(connection) : res.status(404).json({ message: 'Connection not found' })
  }

  public static async deleteConnection(req: Request<{ id: string }>, res: Response<{ message: string }>): Promise<Response<{ message: string }>> {
    const id = +req.params.id
    const deleted = await ConnectionService.deleteConnection(id)

    return deleted ? res.status(200).json({ message: 'Connection deleted successfully' }) : res.status(404).json({ message: 'Connection not found' })
  }
}

export default ConnectionController
