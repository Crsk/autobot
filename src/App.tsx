import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AutomationEngine from '@/automation-engine/components'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/flow" element={<AutomationEngine />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
