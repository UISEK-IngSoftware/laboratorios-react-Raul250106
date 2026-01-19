import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../services/pokemonService";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import "./ViewPokemonDetails.css";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getPokemon(id);
                setPokemon(data);
            } catch (err) {
                console.error(err);
                alert("No se pudo cargar el Pokémon");
            }
        })();
    }, [id]);

    if (!pokemon) return <p>Cargando...</p>;

    return (
        <div className="Presentacion">
            <Card sx={{ display: "flex", maxWidth: 700, margin: "20px auto", padding: 2 }}>
                {/* Imagen a la izquierda */}
                <CardMedia
                    component="img"
                    sx={{ width: 350, height: 500, borderRadius: 2 }}
                    image={`${API_MEDIA_URL}/${pokemon.picture}`}
                    alt={pokemon.name}
                />

                {/* Detalles a la derecha */}
                <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: 3 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography variant="h2" className="TituloNombre">Detalles</Typography>
                        <Typography variant="body1" className="CuerpoInfo">Nombre: {pokemon.name}</Typography>
                        <Typography variant="body1" className="CuerpoInfo">Tipo: {pokemon.type}</Typography>
                        <Typography variant="body1" className="CuerpoInfo">Peso: {pokemon.weight}</Typography>
                        <Typography variant="body1" className="CuerpoInfo">Altura: {pokemon.height}</Typography>
                        <Typography variant="body1" className="CuerpoInfo">Entrenador: {pokemon.trainer}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </div>
    );
}


