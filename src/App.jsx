import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { Container, Grid } from '@mui/material'
import PokemonList from './components/PokemonList'
import './App.css'
import PokemonForm from './components/PokemonForm'


function App() {
  return (
    <>
      <Header />
      <Container>
        <BrowserRouter>
          {/* RUTAS */}
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="add-pokemon" element={<PokemonForm />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App