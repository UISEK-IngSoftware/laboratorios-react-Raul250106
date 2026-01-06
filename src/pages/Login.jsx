import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";

export default function Login() {
    const [loginData, setLoginData] = useState({ username: "", password: ""})
    const navigate = useNavigate();

    // e significa EVENT (EVENTO)
    const handleChange = async (e) => {
        console.log("cambio")
        setLoginData({
            ...loginData, // Con los tres puntos no se sobreescribe, y evita que se borre lo anterior
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logica de autenticación
        console.log("llamada a api");
        
        try {
            const response = await login(loginData.username, loginData.password)
            localStorage.setItem("access_token", response.access_token);
            alert("Inicio de sesion exitoso");
            navigate("/"); 

        } catch (error) {
            console.error("Error en login: ", error);
            alert("Error al iniciar sesión, verificar las credenciales.");
            return;
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Inicio de sesión
                </Typography>
                <TextField variant="outlined"
                    label = "Usuario"
                    name = "username"
                    value = {loginData.username}
                    onChange = {handleChange}
                    required
                />
                <TextField variant="outlined"
                    label = "Contraseña"
                    name = "password"
                    type = "password"
                    value = {loginData.password}
                    onChange = {handleChange}
                    required
                />
                <Button type="submit" variant="contained">Iniciar sesión</Button>
            </Box>
        </>
    )
}