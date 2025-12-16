import { Box, Button, TextField, Typography } from "@mui/material";
import "./PokemonForm.css";
export default function PokemonForm() {
    return (
        <>
        <Typography className="titulo">
            Formulario Pokemon
        </Typography>
        <Box component="form" sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <TextField label="Nombre" name="name" variant="outlined"/>
            <TextField label="Tipo" name="type" variant="outlined"/>
            <TextField label="Peso" name="weight" variant="outlined" type="number"/>
            <TextField label="Altura" name="height" variant="outlined" type="number"/>
            <TextField label="Entrenador" name="trainer" variant="outlined"/>
            <input type="file" name="picture" accept="Image/*" className="ImagenPokemon" required/>
            <Button type="submit" variant="contained">Guardar</Button>
        </Box>
        </>
    )
}