import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AutomationEngine from '@/automation-engine/components'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import { defaultTheme, Provider as SpectrumProvider } from '@adobe/react-spectrum'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SpectrumProvider theme={defaultTheme} colorScheme="light">
          <BrowserRouter>
            <Routes>
              <Route path="/flow" element={<AutomationEngine />} />
            </Routes>
          </BrowserRouter>
        </SpectrumProvider>
      </Provider>
    </div>
  )
}

export default App
