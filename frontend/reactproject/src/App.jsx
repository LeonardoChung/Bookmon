import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaJogadores from "./pages/ListaJogadores";
import FormularioJogador from "./pages/FormularioJogador";
import DetalhesJogador from "./pages/DetalhesJogador";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Cadastro de Jogadores de Futebol</h1>

        <Routes>
          <Route path="/" element={<ListaJogadores />} />
          <Route path="/form" element={<FormularioJogador />} />
          <Route path="/form/:id" element={<FormularioJogador />} />
          <Route path="/detalhes/:id" element={<DetalhesJogador />} />
        </Routes>

        <footer>
          <p>Leonardo Min Woo Chung</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
