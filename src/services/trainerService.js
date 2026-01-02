import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

/** OBTIENE LOS POKEMONS DESDE LA API Y RETORNA DATA DE POKEMONS */
export async function fetchTrainer() {
    const response = await axios.get(`${API_BASE_URL}/entrenadores/`);
    return response.data;
}