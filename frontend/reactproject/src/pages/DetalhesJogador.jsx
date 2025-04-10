import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetalhesJogador = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jogador, setJogador] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8800")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((j) => j.idjogadores == id);
        if (encontrado) setJogador(encontrado);
      });
  }, [id]);

  if (!jogador) return <p className="corpo">Carregando...</p>;

  return (
    <div className="corpo">
      <h2>Detalhes do Jogador</h2>
      <p><strong>Nome:</strong> {jogador.nome}</p>
      <p><strong>Idade:</strong> {jogador.idade}</p>
      <p><strong>Posição:</strong> {jogador.posicao}</p>
      <p><strong>Time:</strong> {jogador.time}</p>
      <p><strong>Nacionalidade:</strong> {jogador.nacionalidade}</p>
      <button onClick={() => navigate("/")} className="list-btn">Voltar</button>
    </div>
  );
};

export default DetalhesJogador;
