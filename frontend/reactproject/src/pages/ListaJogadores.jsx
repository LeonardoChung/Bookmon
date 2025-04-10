import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListaJogadores = () => {
  const [jogadores, setJogadores] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8800")
      .then((res) => res.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          const ordenados = dados.sort((a, b) => a.idjogadores - b.idjogadores);
          setJogadores(ordenados);
        } else {
          console.error("Resposta inesperada da API:", dados);
        }
      });
      
  }, []);

  const excluirJogador = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este jogador?");
    if (!confirmar) return;
  
    try {
      const res = await fetch(`http://localhost:8800/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Jogador excluído com sucesso!");
        setJogadores((prev) => prev.filter((j) => j.idjogadores !== id));
      } else {
        alert("Erro ao excluir o jogador.");
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  };
  

  const totalPaginas = Math.ceil(jogadores.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const jogadoresPagina = jogadores.slice(indiceInicial, indiceInicial + itensPorPagina);

  return (
    <div className="corpo">
      <h2>Jogadores de Futebol</h2>
      <button onClick={() => navigate("/form")} className="add-btn">Adicionar Jogador</button>
      <ul className="list">
        {jogadoresPagina.map((jogador) => (
          <li key={jogador.idjogadores} className="list-li">
            <p><strong>Nome:</strong> {jogador.nome}</p>
            <p><strong>Idade:</strong> {jogador.idade}</p>
            <p><strong>Posição:</strong> {jogador.posicao}</p>
            <p><strong>Time:</strong> {jogador.time}</p>
            <p><strong>Nacionalidade:</strong> {jogador.nacionalidade}</p>
            <button onClick={() => navigate(`/detalhes/${jogador.idjogadores}`)} className="list-btn">Ver Detalhes</button>
            <button onClick={() => navigate(`/form/${jogador.idjogadores}`)} className="list-btn">Editar</button>
            <button onClick={() => excluirJogador(jogador.idjogadores)} className="list-btn">Excluir</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaAtual(i + 1)}
            className="list-btn"
            disabled={paginaAtual === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListaJogadores;
