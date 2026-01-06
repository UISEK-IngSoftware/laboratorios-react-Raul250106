import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { Container, Grid } from '@mui/material'
import PokemonList from './pages/PokemonList'
import PokemonForm from './pages/PokemonForm'
import TrainerList from './pages/TrainerList'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <>
      <Container>
        <BrowserRouter>
          <Header />
          {/* RUTAS */}
          <Routes>
            <Route path="Login" element={<Login />} />
            <Route path="/" element={<PokemonList />} />
            <Route path="trainers" element={<TrainerList />} />
            <Route path="add-pokemon" element={<PokemonForm />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App