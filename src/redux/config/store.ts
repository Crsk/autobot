// store.ts
import { configureStore, DevToolsEnhancerOptions } from '@reduxjs/toolkit'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import { persistReducer, persistStore } from 'redux-persist'
import nodeSlice from '../slices/nodeSlice'
import fetchNodesEpic from '../epics/nodeEpic'
import { RootState } from '../types'
import { middlewareConfig, persistConfig } from './persistConfig'

const persistedReducer = persistReducer(persistConfig, nodeSlice.reducer)
const epicMiddleware = createEpicMiddleware<any, any, RootState>()
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware(middlewareConfig).concat(epicMiddleware)

    return middleware
  },
  devTools: [devToolsEnhancer({ realtime: true } as any)] as DevToolsEnhancerOptions,
})
epicMiddleware.run(fetchNodesEpic)

const persistor = persistStore(store)

export { store, persistor }
