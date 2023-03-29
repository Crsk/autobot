import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AutomationEngine from '@/automation-engine/components'
import { Provider } from 'react-redux'
import { store, persistor } from '@/redux/store'
import { defaultTheme, Provider as SpectrumProvider } from '@adobe/react-spectrum'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SpectrumProvider theme={defaultTheme} colorScheme="light">
            <BrowserRouter>
              <Routes>
                <Route path="/flow" element={<AutomationEngine />} />
              </Routes>
            </BrowserRouter>
          </SpectrumProvider>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
