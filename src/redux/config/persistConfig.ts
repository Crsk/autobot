import AsyncStorage from '@react-native-async-storage/async-storage'
import { FLUSH, PAUSE, PERSIST, PersistConfig, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import { RootState } from '../types'

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
}

const middlewareConfig = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}

export { persistConfig, middlewareConfig }
