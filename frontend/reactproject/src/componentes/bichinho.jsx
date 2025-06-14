import "../css/bichinho.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ADICIONADO useNavigate
import { getBichinho, feedBichinho } from "./api";
import api from "./api";
import quackitoLovely from "../images/quackito_lovely.gif";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Bichinho() {
  const { id: petId } = useParams();
  const navigate = useNavigate(); // DEFINIDO navigate
  const [pet, setPet] = useState(null);
  const [metas, setMetas] = useState([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false); // ESTADO ADICIONADO
  const { width, height } = useWindowSize();

  useEffect(() => {
    (async () => {
      const data = await getBichinho(petId);
      setPet(data);
    })();
  }, [petId]);

  useEffect(() => {
    if (!pet) return;
    api.get(`/metas/list/${pet.iduser}`).then(r => setMetas(r.data));
  }, [pet]);

  const handleCheck = (idMeta, checked) => {
    if (!checked || !pet.iduser) return;

    const endpoints = {
      1: "completePaginas",
      2: "completePost",
      3: "completeCarne",
      5: "completeLeitura",
    };

    api.put(`/metas/${endpoints[idMeta]}/${pet.iduser}`)
      .then(() =>
        setMetas(prev =>
          prev.map(m =>
            m.idmeta === idMeta ? { ...m, status: 1 } : m
          )
        )
      );
  };

  const handleFeed = async (food) => {
    try {
      const data = await feedBichinho(petId, food);
      const levelUp = data.nivel > pet.nivel;

      if (levelUp) {
        setNewLevel(data.nivel);
        setShowLevelUp(true);

        if (data.nivel >= 3) {
          const res = await fetch(`http://localhost:3001/conquistas/getQuackito/${pet.iduser}`);
          const conqData = await res.json();

          if (conqData.length > 0 && conqData[0].status === 0) {
            await fetch(`http://localhost:3001/conquistas/completeQuackito/${pet.iduser}`, {
              method: "PUT",
            });
            alert("Nova conquista! Quackito chegou ao nível 3! 🐥🏆");
          }
        }
      }

      setPet(prev => ({ ...prev, ...data }));

      if (food === "carne") {
        const res = await fetch(`http://localhost:3001/metas/getCarne/${pet.iduser}`);
        const metaData = await res.json();

        if (metaData.length > 0 && metaData[0].status === 0) {
          await fetch(`http://localhost:3001/metas/completeCarne/${pet.iduser}`, {
            method: "PUT",
          });
          alert("Meta de alimentação com carne concluída! +15 pontos 🎉");
          window.location.reload();
        }
      }
    } catch (err) {
      alert("Você não tem pontos suficientes!");
    }
  };

  if (!pet) return <p>Carregando...</p>;

  const getGifByNivel = (nivel) => {
    if (nivel >= 15) return "/gifs/patinho15.gif";
    return `/gifs/patinho${nivel > 1 ? nivel : 1}.gif`;
  };

  return (
    <div className="body">
      <div className="bichinho-left">

        {showLevelUp && (
          <div className="modal">
            <Confetti width={width} height={height} gravity={0.15} />
            <div className="modal-content">
              <div className="modal-card">
                <h1>🎉 Parabéns! 🎉</h1>
                <img src={quackitoLovely} alt="Quackito" className="quackito-lovely" />
                <div className="text-level"> Você chegou ao nível {newLevel}!</div>
                <button onClick={() => setShowLevelUp(false)}>Fechar</button>
              </div>
            </div>
          </div>
        )}

        <div className="bichinho-title">
          <h1>Seu Quackito Virtual</h1>
          <button onClick={() => setIsEditModal(true)} className="button-metas">!</button>
        </div>


        <img
          src={getGifByNivel(pet.nivel)}
          alt="Bichinho"
          style={{ width: "200px" }}
        />

        <div className="bichinho-status">
          <p>Nível: {pet.nivel}</p>
          <p>Pontos: {pet.level_points} / 50</p>
          <p>Pontuação disponível: {pet.pontuacao}</p>
        </div>

        <div className="feed-bichinho">
          <h1>Escolha a comida:</h1>
          <div className="buttons">
            <button onClick={() => handleFeed("doce")} className="bichinho-button">Doce 🍩 (+5)</button>
            <button onClick={() => handleFeed("ração")} className="bichinho-button">Ração 🐾 (+10)</button>
            <button onClick={() => handleFeed("fruta")} className="bichinho-button">Fruta 🍎 (+15)</button>
            <button onClick={() => handleFeed("carne")} className="bichinho-button">Carne 🍖 (+25)</button>
          </div>
        </div>
      </div>

      {isEditModal && (
        <div className="modal">
          <div className="meta">
            <div className="meta-card">
              <div className="meta-title">Metas</div>
              {metas.length === 0 && <span>Sem metas para hoje.</span>}

              {metas.map(meta => (
                <div key={meta.idmeta} className="meta-text">
                  <span className={meta.status === 1 ? "meta-concluida" : ""}>
                    {meta.nome}
                  </span>
                </div>
              ))}
              <div className="meta-card-bottom">
                <button onClick={() => setIsEditModal(false)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
