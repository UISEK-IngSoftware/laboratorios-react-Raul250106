import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

/** OBTIENE LOS POKEMONS DESDE LA API Y RETORNA DATA DE POKEMONS */
export async function fetchTrainer() {
    const response = await axios.get(`${API_BASE_URL}/entrenadores/`);
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

export async function createTrainer (trainerData) {
    let pictureBase64 = "";
    if (trainerData.picture) {
        pictureBase64 = await fileToBase64(trainerData.picture);
    }
    
    const payload = {
        ...trainerData,
        picture: pictureBase64,
    }

    const response = await axios.post(`${API_BASE_URL}/entrenadores/`, payload)
    return response.data;
}

export async function getTrainer (id) {
    const response = await axios.get (`${API_BASE_URL}/entrenadores/${id}/`);
    return response.data
}

export async function editTrainer (id, trainerData) {
    let pictureBase64 = "";
    if (trainerData.picture && typeof trainerData.picture !== "string") {
        pictureBase64 = await fileToBase64(trainerData.picture);
    } else if (trainerData.picture) {
        pictureBase64 = trainerData.picture;
    }

    const payload = {
        ...trainerData,
        picture: pictureBase64,
    }

    const response = await axios.put(`${API_BASE_URL}/entrenadores/${id}/`, payload);
    return response.data
}

export async function deleteTrainer (id) {
    const response = await axios.delete(`${API_BASE_URL}/entrenadores/${id}/`);
    return response.data
}