import { Grid } from '@mui/material'
import PokemonCard from './PokemonCard'
import "./PokemonList.css";
import { useEffect, useState } from 'react';
import { fetchPokemons } from '../services/pokemonService';

export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        fetchPokemons()
        .then((data) => setPokemons(data))
        .catch((error) => {
            console.error('Error obteniendo pokemons:', error);
            alert("Error obteniendo pokemons, regresa más tarde")
        });
    }, []); 

    return (
        <Grid container spacing={2}>
            {pokemons.map(
                (pokemon) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
        </Grid>
    )
}