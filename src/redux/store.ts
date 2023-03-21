// store.ts
import { createSlice, configureStore, DevToolsEnhancerOptions } from '@reduxjs/toolkit'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { snapToGrid } from '../automation-engine/utils'

const initialState = {
  box1Position: {
    x: snapToGrid(50),
    y: snapToGrid(50),
  },
  box2Position: {
    x: snapToGrid(350),
    y: snapToGrid(50),
  },
}

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setBox1Position: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.box1Position = action.payload
    },
    setBox2Position: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.box2Position = action.payload
    },
  },
})

export const { setBox1Position, setBox2Position } = positionSlice.actions

const store = configureStore({
  reducer: positionSlice.reducer,
  devTools: [devToolsEnhancer({ realtime: true } as any)] as DevToolsEnhancerOptions,
})

export default store
