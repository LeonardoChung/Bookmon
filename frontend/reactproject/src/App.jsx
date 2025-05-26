import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookmon from "./componentes/bookmon.jsx";
import Cadastro from "./componentes/cadastro.jsx";
import Login from "./componentes/login.jsx";
import PrivateRoute from "./componentes/PrivateRoute.jsx";
import Home from "./componentes/home.jsx";
import User from "./componentes/user.jsx";
import Bichinho from "./componentes/bichinho.jsx";
import Feed from "./componentes/feed.jsx";
import ErrorPage from "./componentes/error.jsx";

function App() {
  return (

    <Router>
      <Routes>
        {/* públicas */}
        <Route path="/" element={<Bookmon/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/error" element={<ErrorPage/>} />
        
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
      </Routes>
    </Router>
    
  );
}

export default App;
