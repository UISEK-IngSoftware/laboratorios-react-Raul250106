import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import "./PokemonCard.css";
import { useNavigate } from "react-router-dom";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL

export default function PokemonCard({ pokemon, onDelete }) {
    const pokemonImageURL = `${API_MEDIA_URL}/${pokemon.picture}`;

    const navigate = useNavigate();

    const handleEdit = async () => {
        const id = pokemon._id ?? pokemon.id;
        navigate(`/edit-pokemon/${id}/`)
    }

    const handleView = async () => {
        const id = pokemon._id ?? pokemon.id;
        navigate(`/view-details/${id}/`)
    }

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
                <Button className="Botoneli" size="small" onClick={() => onDelete && onDelete(pokemon)}>Eliminar</Button>
                <Button className="Botoninfo" size="small" onClick={handleView}>Más información</Button>
                <Button className="Botonedit" size="small" onClick={handleEdit}>Editar</Button>
            </CardActions>
        </Card>
    );
}