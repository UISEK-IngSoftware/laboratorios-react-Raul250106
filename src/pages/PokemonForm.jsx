import { Box, Button, TextField, Typography } from "@mui/material";
import "./PokemonForm.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPokemon, editPokemon, getPokemon } from "../services/pokemonService";
import Spinner from "../components/Spinner";

export default function PokemonForm() {
  const [pokemonData, setPokemonData] = useState({
    name: "",
    type: "",
    weight: "",
    height: "",
    trainer: "",
    picture: null
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

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
    setLoading(true);
    try {
      if (isEdit) {
        await editPokemon(id, pokemonData);
        alert("¡Pokemon actualizado con exito!");
      } else {
        await createPokemon(pokemonData);
        alert("¡Pokemon agregado con exito!");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al guardar el pokemon. Por favor, intenta de nuevo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);

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
      } finally {
        setLoading (false);
      };
    })();
  }, [id, isEdit]);

  const handleReturn = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <>
      <Typography className="tituloForm">
        POKEMON
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
            value={pokemonData.name}
            onChange={handleChange}
          />

          <TextField
            className="Campos"
            label="Tipo"
            name="type"
            variant="outlined"
            value={pokemonData.type}
            onChange={handleChange}
          />

          <TextField
            className="Campos"
            label="Peso"
            name="weight"
            variant="outlined"
            value={pokemonData.weight}
            type="number"
            onChange={handleChange}
          />

          <TextField
            className="Campos"
            label="Altura"
            name="height"
            variant="outlined"
            type="number"
            value={pokemonData.height}
            onChange={handleChange}
          />

          <TextField
            className="Campos"
            label="Entrenador"
            name="trainer"
            variant="outlined"
            value={pokemonData.trainer}
            onChange={handleChange}
          />

          <input
            type="file"
            name="picture"
            accept="image/*"
            className="ImagenPokemon"
            required={!isEdit}
            onChange={handleChange}
          />

          {/* BOTONES DENTRO DEL FORM */}
          <Box className="botones">
            <Button type="submit" variant="contained" className="guardar" disabled={loading}>
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