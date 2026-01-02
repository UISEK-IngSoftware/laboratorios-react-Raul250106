import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import "./TrainerCard.css";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL

export default function TrainerCard({ Trainer }) {
    const TrainerImageURL = `${API_MEDIA_URL}/${Trainer.picture}`;

    return (
        <Card className="Carta">
            <CardMedia className="Imagen"
                component="img"
                height={500}
                image={TrainerImageURL}
                alt={Trainer.name}
            />
            <CardContent>
                <Typography className="titulo" variant="h5" component="div">
                    {Trainer.name}
                </Typography>
                <Typography className="cuerpo" variant="body2">
                    Type: {Trainer.level}
                </Typography>
            </CardContent>
            <CardActions className="modelo-b">
                <Button className="Boton" size="small">Más información</Button>
            </CardActions>
        </Card>
    );
}