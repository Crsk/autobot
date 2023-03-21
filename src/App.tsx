import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AutomationEngine from '@/automation-engine/components'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/flow" element={<AutomationEngine />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
