import axios from 'axios'
import { CreateNodeBody, DeleteNodeParams, DeleteNodeBody, UpdateNodeBody, Response } from 'shared/src/types/dto'
import { Node } from 'shared/src/types/models'

const nodeApi = {
  baseURL: 'http://localhost:3000/api/v1',
  fetch: async (): Promise<Node[] | undefined> => {
    // Returns the fetched nodes if successful, otherwise undefined
    try {
      const { message, success, payload } = (await axios.get<Response<Node[]>>(`${nodeApi.baseURL}/nodes`)).data
      if (!success) throw new Error(message)
      else console.info(message)

      return payload
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // Returns the created node if successful, otherwise undefined
  create: async (newNode: CreateNodeBody): Promise<Node | undefined> => {
    try {
      const { message, success, payload, issues } = (await axios.post<Response>(`${nodeApi.baseURL}/node`, newNode)).data
      if (!success) throw new Error(issues?.join(' ') || message)
      else console.info(message)

      return payload
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // Returns the updated node if successful, otherwise undefined
  update: async ({ id, propsToUpdate }: UpdateNodeBody): Promise<Node | undefined> => {
    try {
      const { message, success, payload } = (await axios.patch<Response>(`${nodeApi.baseURL}/nodes/${id}`, propsToUpdate)).data
      if (!success) throw new Error(message)
      else console.info(message)

      return payload
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // Returns true if successful, otherwise false
  delete: async ({ id }: DeleteNodeParams): Promise<boolean> => {
    try {
      const { message, success } = (await axios.delete<Response>(`${nodeApi.baseURL}/nodes/${id}`)).data
      if (!success) throw new Error(message)
      else console.info(message)

      return success
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // Returns true if successful, otherwise false
  bulkCreate: async (payloads: (CreateNodeBody)[]): Promise<boolean> => {
    try {
      const { message, success } = (await axios.post<Response>(`${nodeApi.baseURL}/nodes/bulk-create`, payloads)).data
      if (!success) throw new Error(message)
      else console.info(message)

      return success
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // Returns true if successful, otherwise false
  bulkUpdate: async (payloads: UpdateNodeBody[]): Promise<boolean> => {
    try {
      const { message, success } = (await axios.post<Response>(`${nodeApi.baseURL}/nodes/bulk-update`, payloads)).data
      if (!success) throw new Error(message)
      else console.info(message)

      return success
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // Returns true if successful, otherwise false
  bulkDelete: async (payloads: (DeleteNodeBody)[]): Promise<boolean> => {
    try {
      const { message, success } = (await axios.post<Response>(`${nodeApi.baseURL}/nodes/bulk-delete`, payloads)).data
      if (!success) throw new Error(message)
      else console.info(message)

      return success
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

export default nodeApi
