// store.ts
import { configureStore, DevToolsEnhancerOptions } from '@reduxjs/toolkit'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import nodeSlice from '../slices/nodeSlice'
import { middlewareConfig, persistConfig } from './persistConfig'

const persistedReducer = persistReducer(persistConfig, nodeSlice.reducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware(middlewareConfig)

    return middleware
  },
  devTools: [devToolsEnhancer({ realtime: true } as any)] as DevToolsEnhancerOptions,
})

const persistor = persistStore(store)

export { store, persistor }
