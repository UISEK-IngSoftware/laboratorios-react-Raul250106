import { Box, Button, TextField, Typography } from "@mui/material";
import "./PokemonForm.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPokemon, editPokemon, getPokemon } from "../services/pokemonService";


export default function PokemonForm() {
    const [pokemonData, setPokemonData] = useState({
        name: "",
        type: "",
        weight: "",
        height: "",
        trainer: "",
        picture: null
    })

    const navigate = useNavigate();

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === "picture") {
            setPokemonData({
                ...pokemonData,
                picture: files[0]
            });
        } else {
            setPokemonData({
                ...pokemonData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await editPokemon(id, pokemonData);
                alert("¡Pokemon actualizado con exito!");
            } else {
                await createPokemon(pokemonData);
                alert("!Pokemon agregado con exito!");
            }
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Hubo un error al guardar el pokemon. Por favor, intenta de nuevo");
        }
    }

    const { id } = useParams();
    const isEdit = Boolean(id);
    useEffect(() => {
        if (!isEdit) return;
        (async () => {
            try {
                const data = await getPokemon(id);
                setPokemonData({
                    name: data.name,
                    type: data.type,
                    weight: data.weight,
                    height: data.height,
                    trainer: data.trainer,
                    picture: data.picture
                });
            } catch (err) {
                console.error("Error al editar pokemon", err);
                alert("No se puede obtener los datos del pokemon para editar");
            }
        })();
    }, [id]);

    const handleReturn = async () => {
        navigate(`/`)
    }

    return (
        <>
            <Typography className="titulo">
                Pokemon
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, margin: 0.5}}>
                <TextField label="Nombre" name="name" variant="outlined" value={pokemonData.name} onChange={handleChange} />
                <TextField label="Tipo" name="type" variant="outlined" value={pokemonData.type} onChange={handleChange} />
                <TextField label="Peso" name="weight" variant="outlined" value={pokemonData.weight} type="number" onChange={handleChange} />
                <TextField label="Altura" name="height" variant="outlined" type="number" value={pokemonData.height} onChange={handleChange} />
                <TextField label="Entrenador" name="trainer" variant="outlined" value={pokemonData.trainer} onChange={handleChange} />
                <input type="file" name="picture" accept="Image/*" className="ImagenPokemon" required onChange={handleChange} />
            </Box>
            <Box className="botones">
                <Button type="submit" variant="contained" className="guardar">Guardar</Button>
                <Button type="submit" variant="contained" onClick={handleReturn} className="canc">Cancelar</Button>
            </Box>
        </>
    )
}