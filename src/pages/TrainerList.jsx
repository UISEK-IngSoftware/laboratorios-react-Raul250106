import { Grid } from '@mui/material'
import TrainerCard from '../components/TrainerCard'
import "./TrainerList.css";
import { useEffect, useState } from 'react';
import { deleteTrainer, fetchTrainer } from '../services/trainerService';

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

        const handleDelete = async (trainer) => {
            const id = trainer._id ?? trainer.id;
            const previous = trainer;
            setTrainer(prev => prev.filter(p => (p._id ?? p.id) !== id));
            try {
                await deleteTrainer(id);
            } catch (err) {
                setTrainer(previous);
                alert("Error al eliminar entrenador. Intente nuevamente.");
            }
        };

    return (
        <Grid container spacing={2}>
            {trainer.map(
                (Trainer) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <TrainerCard Trainer={Trainer} onDelete={handleDelete}/>
                    </Grid>
                ))}
        </Grid>
    )
}