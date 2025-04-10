import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormularioJogador = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jogador, setJogador] = useState({
    nome: "", idade: "", posicao: "", time: "", nacionalidade: ""
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8800`)
        .then(res => res.json())
        .then(data => {
          const encontrado = data.find(j => j.idjogadores == id);
          if (encontrado) setJogador(encontrado);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJogador((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:8800/${id}` : `http://localhost:8800`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jogador),
      });
    
      if (res.ok) {
        alert(id ? "Jogador atualizado com sucesso!" : "Jogador cadastrado com sucesso!");
        navigate("/");
      } else {
        const erro = await res.json();
        alert("Erro: " + (erro.message || "Não foi possível salvar o jogador."));
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
    
    navigate("/");
  };

  return (
    <div className="corpo">
      <h2>{id ? "Editar Jogador" : "Cadastrar Novo Jogador"}</h2>
      <form onSubmit={handleSubmit} className="modal-content">
        <input name="nome" placeholder="Nome" value={jogador.nome} onChange={handleChange} />
        <input name="idade" placeholder="Idade" value={jogador.idade} onChange={handleChange} />
        <input name="posicao" placeholder="Posição" value={jogador.posicao} onChange={handleChange} />
        <input name="time" placeholder="Time" value={jogador.time} onChange={handleChange} />
        <input name="nacionalidade" placeholder="Nacionalidade" value={jogador.nacionalidade} onChange={handleChange} />
        <button type="submit" className="list-btn">{id ? "Salvar Alterações" : "Cadastrar"}</button>
        <button type="button" className="list-btn" onClick={() => navigate("/")}>Cancelar</button>
      </form>
    </div>
  );
};

export default FormularioJogador;
