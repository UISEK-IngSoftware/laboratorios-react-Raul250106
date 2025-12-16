import { AppBar, Button, Container, Toolbar } from "@mui/material";
import pokedexLogo from "../assets/11.png";
import "./Header.css";

export default function Header() {
    return (
        <Container>
            <header>
                <div className="pokedex-navbar">
                    <AppBar position="static">
                        <Toolbar>
                            <div className="image-container">
                                <img src={pokedexLogo} alt="Pokedex Logo" height={350} />
                            </div>
                        </Toolbar>
                        <Toolbar>
                            <Container>
                                <Button color="inherit" href="/">Inicio</Button>
                                <Button color="inherit" href="/add-pokemon">Agregar pokemons</Button>
                            </Container>
                        </Toolbar>
                    </AppBar>
                </div>
            </header>
        </Container>
    );
}