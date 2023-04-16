import { combineReducers, configureStore, DevToolsEnhancerOptions } from '@reduxjs/toolkit'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { persistReducer, persistStore } from 'redux-persist'
import nodeSlice from '../slices/nodeSlice'
import nodesEpic from '../epics/node'
import { RootState } from '../types'
import { middlewareConfig, persistConfig } from './persistConfig'
import queueEpic from '../epics/queueEpic'
import queueSlice from '../slices/queueSlice'
import loginSlice from '../slices/loginSlice'

const rootReducer = combineReducers({
  node: nodeSlice.reducer,
  queue: queueSlice.reducer,
  login: loginSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const epicMiddleware = createEpicMiddleware<any, any, RootState>()
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware(middlewareConfig).concat(epicMiddleware)

    return middleware
  },
  devTools: [devToolsEnhancer({ realtime: true } as any)] as DevToolsEnhancerOptions,
})

const rootEpic = combineEpics(nodesEpic, queueEpic)
epicMiddleware.run(rootEpic)

const persistor = persistStore(store)

export { store, persistor }
