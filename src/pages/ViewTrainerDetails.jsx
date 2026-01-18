import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainer } from "../services/trainerService";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import "./ViewTrainerDetails.css";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function TrainerDetails() {
    const { id } = useParams();
    const [trainer, setTrainer] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getTrainer(id);
                setTrainer(data);
            } catch (err) {
                console.error(err);
                alert("No se pudo cargar el entrenador");
            }
        })();
    }, [id]);

    if (!trainer) return <p>Cargando...</p>;

    return (
        <div className="Presentacion">
            <Card sx={{ display: "flex", maxWidth: 700, margin: "20px auto", padding: 2 }}>
                {/* Imagen a la izquierda */}
                <CardMedia
                    component="img"
                    sx={{ width: 350, height: 500, borderRadius: 2 }}
                    image={`${API_MEDIA_URL}/${trainer.picture}`}
                    alt={trainer.name}
                />

                {/* Detalles a la derecha */}
                <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: 3 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography variant="h2" className="TituloNombre">{pokemon.name}</Typography>
                        <Typography variant="h2" className="TituloNombre">{pokemon.last_name}</Typography>
                        <Typography variant="body1" className="CuerpoInfo">: {trainer.level}</Typography>
                        <Typography variant="body1" className="CuerpoInfo">Peso: {trainer.birth}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </div>
    );
}
