import { AppBar, Button, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/11.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userService";

export default function Header() {
    const isLoggedIn = localStorage.getItem("access_token") !== null;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("login");
    }

    return (
        <>
            <header>
                <div className="pokedex-navbar">
                    <AppBar position="static">
                        <Toolbar>
                            <div className="image-container">
                                <img src={pokedexLogo} alt="Pokedex Logo" height={350} />
                            </div>
                        </Toolbar>
                        <Toolbar>
                            <Button color="inherit" href="/">Inicio</Button>
                            {isLoggedIn && (
                                <>
                                    <Button color="inherit" href="/trainers">Entrenadores</Button>
                                    <Button color="inherit" href="/add-pokemon">Agregar pokemons</Button>
                                    <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
                                </>
                            )}
                            {!isLoggedIn && (
                                <>
                                    <Button color="inherit" href="/Login">Iniciar sesión</Button>
                                </>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
            </header>
        </>
    );
}