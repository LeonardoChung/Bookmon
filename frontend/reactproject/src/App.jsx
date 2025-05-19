import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./componentes/home.jsx";
import User from "./componentes/user.jsx";
import Bichinho from "./componentes/bichinho.jsx";
import Feed from "./componentes/feed.jsx";

function App() {
  return (

    <Router>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/bichinho" element={<Bichinho/>} />
        <Route path="/feed" element={<Feed/>} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
