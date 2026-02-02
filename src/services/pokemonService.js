import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

/** OBTIENE LOS POKEMONS DESDE LA API Y RETORNA DATA DE POKEMONS */
export async function fetchPokemons() {
    const response = await axios.get(`${API_BASE_URL}/pokemons/`);
    return response.data;
}

/** CONFIGURAR INTERCEPTOR PARA AGREGAR TOKEN SOLO PARA POST, PUT, DELETE */
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token && ['post', 'put', 'delete'].includes(config.method.toLowerCase())) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/** CONVERTIR UN ARCHIVO A BASE 64 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result ya incluye el encabezado, lo usamos completo
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function createPokemon (pokemonData) {
    let pictureBase64 = "";
    if (pokemonData.picture) {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    }
    
    const payload = {
        ...pokemonData,
        picture: pictureBase64,
    }

    const response = await axios.post(`${API_BASE_URL}/pokemons/`, payload)
    return response.data;
}

export async function getPokemon (id) {
    const response = await axios.get (`${API_BASE_URL}/pokemons/${id}/`);
    return response.data
}

export async function editPokemon (id, pokemonData) {
    let pictureBase64 = "";
    if (pokemonData.picture && typeof pokemonData.picture !== "string") {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    } else if (pokemonData.picture) {
        pictureBase64 = pokemonData.picture;
    }

    const payload = {
        ...pokemonData,
        picture: pictureBase64,
    }

    const response = await axios.put(`${API_BASE_URL}/pokemons/${id}/`, payload);
    return response.data
}

export async function deletePokemon (id) {
    const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}/`);
    return response.data
}