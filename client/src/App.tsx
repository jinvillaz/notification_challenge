import { Container } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './components/home'

function App() {
  return (
    <Container className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App
