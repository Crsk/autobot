import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Flow from '@/pages/Flow/Flow'
import { persistor, store } from './redux/config/store'
import { ContextPage } from './pages/ContextPage/Context.page'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/flow" element={<Flow />} />
              <Route path="/context" element={<ContextPage />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
