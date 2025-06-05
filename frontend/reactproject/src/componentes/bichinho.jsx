import "../css/bichinho.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBichinho, feedBichinho } from "./api";
import api from "./api";

export default function Bichinho() {
  const { id: petId } = useParams();
  const [pet,   setPet]   = useState(null);
  const [metas, setMetas] = useState([]);
  
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
      setPet(prev => ({ ...prev, ...data }));
  
      if (food === "carne") {
        const res      = await fetch(`http://localhost:3001/metas/getCarne/${pet.iduser}`);
        const metaData = await res.json();

        if (metaData.length > 0 && metaData[0].status === 0) {
          await fetch(`http://localhost:3001/metas/completeCarne/${pet.iduser}`, {
            method: "PUT",
          });
          alert("Meta de alimentação com carne concluída! +15 pontos 🎉");
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
      <h1>Seu Quackito Virtual</h1>

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
          <button onClick={() => handleFeed("ração")}>Ração 🐾 (+10)</button>
          <button onClick={() => handleFeed("fruta")}>Fruta 🍎 (+15)</button>
          <button onClick={() => handleFeed("carne")}>Carne 🍖 (+25)</button>
          <button onClick={() => handleFeed("doce")}>Doce 🍩 (+5)</button>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {metas.length === 0 && <span>Sem metas para hoje.</span>}

        {metas.map(meta => (
            <div key={meta.idmeta}>
                <span
                style={{
                    textDecoration: meta.status === 1 ? "line-through" : "none",
                    color: meta.status === 1 ? "#888" : "#000",
                    fontSize: "16px"
                }}
                >
                {meta.nome}
                </span>
            </div>
            ))}

      </div>
    </div>
  );
}
