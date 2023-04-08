import axios from 'axios'
import { CreateNodePayload, DeleteNodePayload, UpdateNodePayload } from 'shared/src/types/dto'

type Response = { success: boolean, message: string }

const nodeApi = {
  baseURL: 'http://localhost:3000/api/v1/nodes',
  fetch: async (): Promise<Response> => {
    try {
      return (await axios.get<Response>(`${nodeApi.baseURL}`)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  create: async (newNode: CreateNodePayload): Promise<Response> => {
    try {
      return (await axios.post<Response>(`${nodeApi.baseURL}`, newNode)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  update: async ({ id, propsToUpdate }: UpdateNodePayload): Promise<Response> => {
    try {
      return (await axios.patch<Response>(`${nodeApi.baseURL}/${id}`, propsToUpdate)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  delete: async ({ id }: DeleteNodePayload): Promise<Response> => {
    try {
      return (await axios.delete<Response>(`${nodeApi.baseURL}/${id}`)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  bulkCreate: async (payloads: (CreateNodePayload)[]): Promise<Response> => {
    try {
      return (await axios.post<Response>(`${nodeApi.baseURL}/bulk-create`, payloads)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  bulkUpdate: async (payloads: UpdateNodePayload[]): Promise<Response> => {
    try {
      return (await axios.post<Response>(`${nodeApi.baseURL}/bulk-update`, payloads)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  bulkDelete: async (payloads: (DeleteNodePayload)[]): Promise<Response> => {
    try {
      return (await axios.post<Response>(`${nodeApi.baseURL}/bulk-delete`, payloads)).data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

export default nodeApi
