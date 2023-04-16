/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { User } from 'shared/src/types/models'
import { LoginState } from '../types'

const initialState: LoginState = { user: null }

export const login = (state: LoginState, { id, name }: User) => {
  state.user = { id, name }
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginTrigger: (state) => state,
  },
})

export const {
  loginTrigger,
} = loginSlice.actions

export default loginSlice
