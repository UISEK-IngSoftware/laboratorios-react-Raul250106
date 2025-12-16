import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import "./PokemonCard.css";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL

export default function PokemonCard({ pokemon }) {
    const pokemonImageURL = `${API_MEDIA_URL}/${pokemon.picture}`;

    return (
        <Card className="Carta">
            <CardMedia className="Imagen"
                component="img"
                height={500}
                image={pokemonImageURL}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography className="titulo" variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <Typography className="cuerpo" variant="body2">
                    Type: {pokemon.type}
                </Typography>
            </CardContent>
            <CardActions className="modelo-b">
                <Button className="Boton" size="small">Más información</Button>
            </CardActions>
        </Card>
    );
}