import { Grid } from '@mui/material'
import PokemonCard from '../components/PokemonCard'
import "./PokemonList.css";
import { useEffect, useState } from 'react';
import { fetchPokemons, deletePokemon } from '../services/pokemonService';

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

    const handleDelete = async (pokemon) => {
        const id = pokemon.id ?? pokemon.id;
        const previous = pokemons;
        setPokemons(prev => prev.filter(p => (p._id ?? p.id) !== id));
        try {
            await deletePokemon(id);
        } catch (err) {
            setPokemons(previous);
            alert("Error al eliminar pokemon. Intente nuevamente.");
        }
    };

    return (
        <Grid container spacing={2}>
            {pokemons.map(
                (pokemon) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <PokemonCard pokemon={pokemon} onDelete={handleDelete} />
                    </Grid>
                ))}
        </Grid>
    )
}