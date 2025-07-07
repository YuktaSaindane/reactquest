import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Home from './pages/Home'
import Challenge from './pages/Challenge'
import Results from './pages/Results'
import Layout from './components/Layout'

function App() {
  return (
    <GameProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenge/:id" element={<Challenge />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </GameProvider>
  )
}

export default App 