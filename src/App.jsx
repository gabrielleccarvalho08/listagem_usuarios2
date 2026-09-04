import { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";
import "./style.css";

const filtrarUsuarioPorTermo = (termo) => (usuario) => {
    const termoLower = termo.toLowerCase();

    return (
        usuario.name.toLowerCase().includes(termoLower) ||
        usuario.username.toLowerCase().includes(termoLower) ||
        usuario.email.toLowerCase().includes(termoLower)
    );
};

function App() {
    const url = "https://jsonplaceholder.typicode.com";

    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [busca, setBusca] = useState("");

    const usuariosFiltrados = usuarios.filter(
        filtrarUsuarioPorTermo(busca)
    );

    async function buscarUsuarios() {
        try {
            const response = await axios.get(`${url}/users`);

            const data = response.data;
            setUsuarios(data);
        } catch (error) {
            console.log("Erro ao buscar usuários: ", error);

            setErro(
                `Não foi possível carregar os usuários. Código: ${error.message}`
            );

            setUsuarios([]);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarUsuarios();
    }, []);

    return (
        <div className="app">
            <HeaderComponent />

            <main className="container">
                <div className="search-area">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Filtrar usuário..."
                        onChange={(evento) => {
                            setBusca(evento.target.value);
                        }}
                    />

                    <p className="contador">
                        Usuários encontrados: {usuariosFiltrados.length}
                    </p>
                </div>

                {carregando && <LoadingComponent />}

                {erro && (
                    <p className="erro">
                        {erro}
                    </p>
                )}

                {!carregando && !erro && (
                    <UserListComponent usuarios={usuariosFiltrados} />
                )}
            </main>
        </div>
    );
}

export default App;