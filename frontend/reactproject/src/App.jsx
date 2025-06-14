import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Bookmon from "./componentes/bookmon.jsx";
import Cadastro from "./componentes/cadastro.jsx";
import Login from "./componentes/login.jsx";
import PrivateRoute from "./componentes/PrivateRoute.jsx";
import Home from "./componentes/home.jsx";
import User from "./componentes/user.jsx";
import Bichinho from "./componentes/bichinho.jsx";
import Feed from "./componentes/feed.jsx";
import ErrorPage from "./componentes/error.jsx";
import Leituras from "./componentes/leituras.jsx";
import Cadastro_leitura from "./componentes/cadastro_leitura.jsx";
import Metas from "./componentes/metas.jsx";

function App() {
  return (

    <Router>
      <Routes>
        {/* públicas */}
        <Route path="/" element={<Bookmon/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/error" element={<ErrorPage/>} />
        <Route path="*" element={<Navigate to ="/error"/>} />
        
        {/* privadas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/bichinho/:id"
          element={
            <PrivateRoute>
              <Bichinho />
            </PrivateRoute>
          }
        />
        <Route
          path="/feed/:id"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="/leituras/:id"
          element={
            <PrivateRoute>
              <Leituras />
            </PrivateRoute>
          }
        />
        <Route
          path="/adicionar/:id"
          element={
            <PrivateRoute>
              <Cadastro_leitura />
            </PrivateRoute>
          }
        />
        <Route
          path="/metas/:id"
          element={
            <PrivateRoute>
              <Metas />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    
  );
}

export default App;
