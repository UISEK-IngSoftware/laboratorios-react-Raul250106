import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import "./TrainerCard.css";
import { useNavigate } from "react-router-dom";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL

export default function TrainerCard({ Trainer, onDelete }) {
    const TrainerImageURL = `${API_MEDIA_URL}/${Trainer.picture}`;

    const navigate = useNavigate();

    const handleEdit = async () => {
        const id = Trainer._id ?? Trainer.id;
        navigate(`/edit-trainer/${id}/`)
    }

    const handleView = async () => {
        const id = Trainer._id ?? Trainer.id;
        navigate(`/view-details/${id}/`)
    }

    return (
        <Card className="Carta">
            <CardMedia className="Imagen"
                component="img"
                height={490}
                image={TrainerImageURL}
                alt={Trainer.name}
            />
            <CardContent className="content">
                <Typography className="titulo" variant="body1" component="div">
                    {Trainer.name}
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