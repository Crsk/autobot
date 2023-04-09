import { Connection } from 'shared/src/types/models'
import { deleteRow, getRow, getRows, insertRow, updateRow } from '../database'

class ConnectionService {
  public static async getConnections(): Promise<Connection[]> {
    return getRows<Connection>('connection')
  }

  public static async getConnection(id: number): Promise<Connection | undefined> {
    const [connection]: Connection[] = await getRow<Connection>('connection', id)

    return connection
  }

  public static async createConnection(newConnection: Omit<Connection, 'id'>): Promise<number | undefined> {
    const affectedRows: number = await insertRow('connection', newConnection)

    return affectedRows
  }

  public static async updateConnection(id: number, updatedConnection: Partial<Connection>): Promise<Connection | undefined> {
    await updateRow('connection', id, updatedConnection)
    const [connection]: Connection[] = await getRow<Connection>('connection', id)

    return connection
  }

  public static async deleteConnection(id: number): Promise<boolean> {
    return deleteRow('connection', id)
  }
}

export default ConnectionService
