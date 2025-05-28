import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

const Cadastro_leitura = () => {

    const navigate = useNavigate();
    const [newLivro, setNewLivro] = useState({ book: "", pages: ""});
    const [data, setData] = useState([]);
    const { id } = useParams();
    

    function handleNewLivroChange(event) {
        const { name, value } = event.target;
        setNewLivro((prev) => ({ ...prev, [name]: value }));
    }

    function handleSaveNewLivro() {

        const camposVazios = Object.entries(newLivro).filter(([_, valor]) => valor.trim() === "");

        if (camposVazios.length > 0) {
          alert("Por favor, preencha todos os campos antes de adicionar a leitura.");
          return;
        }

        fetch(`http://localhost:3001/leituras/createLeitura/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLivro),
        })
          .then(response => response.json())
          .then(() => {
            alert("Nova leitura adicionada!");
            navigate(`/leituras/${id}`);
            })
          .catch(error => console.error("Erro ao adicionar leitura:", error));
    }

    return(

        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Nova Leitura</h2>
            <label> Livro: </label>
            <input
              type="text"
              name="book"
              value={newLivro.book}
              onChange={handleNewLivroChange}
            />
            <label> Páginas: </label>
            <input
              type="text"
              name="pages"
              value={newLivro.pages}
              onChange={handleNewLivroChange}
            />
            <button onClick={handleSaveNewLivro} className="list-btn">Adicionar</button>
            <button onClick={() => navigate("/")} className="list-btn">Voltar</button>
          </div>
        </div>
    )
}   

export default Cadastro_leitura;