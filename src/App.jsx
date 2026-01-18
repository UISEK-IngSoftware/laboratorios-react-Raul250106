import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { Container, Grid } from '@mui/material'
import PokemonList from './pages/PokemonList'
import PokemonForm from './pages/PokemonForm'
import TrainerList from './pages/TrainerList'
import PokemonDetails from './pages/ViewPokemonDetails'
import Login from './pages/Login'
import TrainerForm from './pages/TrainerForm'
import TrainerDetails from './pages/ViewTrainerDetails'
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
            <Route path="edit-pokemon/:id" element={<PokemonForm />} />
            <Route path="view-details/:id" element={<PokemonDetails />} />
            <Route path="view-trainer-details/:id" element={<TrainerDetails />} />
            <Route path="add-trainer" element={<TrainerForm />} />
            <Route path="edit-trainer/:id" element={<TrainerForm />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App