import { Grid } from '@mui/material'
import TrainerCard from './TrainerCard'
import "./TrainerList.css";
import { useEffect, useState } from 'react';
import { fetchTrainer } from '../services/trainerService';

export default function TrainerList() {
    const [trainer, setTrainer] = useState([]);
    useEffect(() => {
        fetchTrainer()
        .then((data) => setTrainer(data))
        .catch((error) => {
            console.error('Error obteniendo entrenadores:', error);
            alert("Error obteniendo entrenadores, regresa más tarde")
        });
    }, []); 

    return (
        <Grid container spacing={2}>
            {trainer.map(
                (Trainer) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TrainerCard Trainer={Trainer} />
                    </Grid>
                ))}
        </Grid>
    )
}