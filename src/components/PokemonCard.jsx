import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import "./PokemonCard.css";

export default function PokemonCard({ pokemon }) {
    return (
        <Card className="Carta">
            <CardMedia className="Imagen"
                component="img"
                height={200}
                image={pokemon.image}
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