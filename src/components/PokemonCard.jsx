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
                height={490}
                image={pokemonImageURL}
                alt={pokemon.name}
            />
            <CardContent className="content">
                <Typography className="titulo" variant="body1" component="div">
                    {pokemon.name}
                </Typography>
                <CardActions className="modelo-b">
                    <Button className="Botoneli" size="small" onClick={() => onDelete && onDelete(pokemon)}>
                        <span className="material-symbols-outlined">delete</span>
                    </Button>
                    <Button className="Botoninfo" size="small" onClick={handleView}>
                        <span className="material-symbols-outlined">visibility</span>
                    </Button>
                    <Button className="Botonedit" size="small" onClick={handleEdit}>
                        <span className="material-symbols-outlined">edit</span>
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}