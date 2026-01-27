import { Box, Button, TextField, Typography } from "@mui/material";
import "./TrainerForm.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTrainer, editTrainer, getTrainer } from "../services/trainerService";
import Spinner from '../components/Spinner';

export default function TrainerForm() {
    const [trainerData, setTrainerData] = useState({
        name: "",
        last_name: "",
        level: "",
        birth: "",
        picture: null
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const handleChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === "picture") {
            setTrainerData({
                ...trainerData,
                picture: files[0]
            });
        } else {
            setTrainerData({
                ...trainerData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await editTrainer(id, trainerData);
                alert("Entrenador actualizado con éxito!");
            } else {
                await createTrainer(trainerData);
                alert("¡Entrenador agregado con éxito!");
            }
            navigate("/trainers");
        } catch (err) {
            console.error(err);
            alert("Hubo un error al guardar el entrenador. Por favor, intenta de nuevo");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isEdit) return;
        setLoading(true);
        (async () => {
            try {
                const data = await getTrainer(id);
                setTrainerData({
                    name: data.name,
                    last_name: data.last_name,
                    level: data.level,
                    birth: data.birth,
                    picture: data.picture
                });
            } catch (err) {
                console.error("Error al editar entrenador", err);
                alert("No se puede obtener los datos del entrenador para editar");
            } finally {
                setLoading(false);
            }
        })();
    }, [id, isEdit]);

    const handleReturn = () => {
        navigate("/trainers");
    };

    if (loading) {
        return (
            <Spinner />
        );
    }

    return (
        <>
            <Typography className="tituloForm">
                ENTRENADORES
            </Typography>

            <div className="FormularioContainer">
                <Box
                    className="Formulario"
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2, margin: 0.5 }}
                >
                    <TextField
                        className="Campos"
                        label="Nombre"
                        name="name"
                        variant="outlined"
                        value={trainerData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        className="Campos"
                        label="Apellido"
                        name="last_name"
                        variant="outlined"
                        value={trainerData.last_name}
                        onChange={handleChange}
                    />

                    <TextField
                        className="Campos"
                        label="Nivel"
                        name="level"
                        variant="outlined"
                        value={trainerData.level}
                        type="number"
                        onChange={handleChange}
                    />

                    <TextField
                        className="Campos"
                        label="Nacimiento"
                        name="birth"
                        variant="outlined"
                        type="date"
                        value={trainerData.birth}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <input
                        type="file"
                        name="picture"
                        accept="image/*"
                        className="ImagenEntrenador"
                        required={!isEdit}
                        onChange={handleChange}
                    />

                    {/* BOTONES DENTRO DEL FORM */}
                    <Box className="botones">
                        <Button type="submit" variant="contained" className="guardar">
                            Guardar
                        </Button>

                        <Button
                            type="button"
                            variant="contained"
                            onClick={handleReturn}
                            className="canc"
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </div>
        </>
    );
}