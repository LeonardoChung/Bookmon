import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quackitoSend from "../images/quackito_send.gif";
import "../css/leitura-iu.css";

const Cadastro_leitura = () => {

  const navigate = useNavigate();
  const [newLivro, setNewLivro] = useState({ book: "", pages: "" });
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

        // Verifica status da meta de leitura
        fetch(`http://localhost:3001/metas/getLeitura/${id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0 && data[0].status === 0) {
              // Se meta ainda não concluída, atualiza
              fetch(`http://localhost:3001/metas/completeLeitura/${id}`, {
                method: "PUT",
              })
                .then(() => {
                  alert("Meta de leitura concluída! +25 pontos 🎉");
                })
                .catch((err) => {
                  console.error("Erro ao completar meta de leitura:", err);
                });
            }
          })
          .catch((err) => {
            console.error("Erro ao verificar meta de leitura:", err);
          });

        navigate(`/leituras/${id}`);
      })
      .catch(error => console.error("Erro ao adicionar leitura:", error));
  }

  return (

    <div className="adicionar-leitura-body">
      <div className="adicionar-leitura-content">
        <div className="adicionar-leitura-card">
          <div className="card-left">
            <div className="adicionar-leitura-title">Adicionar Leitura</div>
            <input
              type="text"
              name="book"
              value={newLivro.book}
              onChange={handleNewLivroChange}
              placeholder="Nome do livro"
            />
            <input
              type="text"
              name="pages"
              value={newLivro.pages}
              onChange={handleNewLivroChange}
              placeholder="Número de páginas"
            />
            <div>
              <button onClick={handleSaveNewLivro} className="adicionar-leitura-btn">Adicionar</button>
              <button onClick={() => navigate(`/leituras/${id}`)} className="adicionar-leitura-btn">Voltar</button>
            </div>
          </div>
          <div className="card-right">
            <img src={quackitoSend} alt="Quackito" className="quackito-send" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro_leitura;