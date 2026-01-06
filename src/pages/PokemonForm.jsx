import { Box, Button, TextField, Typography } from "@mui/material";
import "./PokemonForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPokemon } from "../services/pokemonService";


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
        if (name === "picture"){
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
            await createPokemon (pokemonData);
            alert("!Pokemon agregado con exito!");
            navigate("/");
        } catch (error) {
            console.error("Error al agregar pokemon", error);
            alert("Hubo un error al guardar el pokemon. Por favor, intenta de nuevo");
            return;
        }
    }

    return (
        <>
        <Typography className="titulo">
            Pokemon
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <TextField label="Nombre" name="name" variant="outlined" onChange={handleChange}/>
            <TextField label="Tipo" name="type" variant="outlined" onChange={handleChange}/>
            <TextField label="Peso" name="weight" variant="outlined" type="number" onChange={handleChange}/>
            <TextField label="Altura" name="height" variant="outlined" type="number" onChange={handleChange}/>
            <TextField label="Entrenador" name="trainer" variant="outlined" onChange={handleChange}/>
            <input type="file" name="picture" accept="Image/*" className="ImagenPokemon" required onChange={handleChange}/>
            
            <Button type="submit" variant="contained">Guardar</Button>
        </Box>
        </>
    )
}