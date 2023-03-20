import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FlowEngine from '@/components/FlowEngine'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/flow" element={<FlowEngine />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
