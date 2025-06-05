import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api.jsx"; 

export default function Metas() {
  const { id }   = useParams();       // /metas/:id
  const [metas, setMetas] = useState([]);

  // carrega a lista na montagem
  useEffect(() => {
    api.get(`/metas/list/${id}`).then(res => setMetas(res.data));
  }, [id]);

  // marca como concluída
  const handleCheck = (idMeta, checked) => {
    if (!checked) return;     
    const endpoints = {
      1: "completePaginas",
      2: "completePost",
      3: "completeCarne",
      5: "completeLeitura",
    };
    api.put(`/metas/${endpoints[idMeta]}/${id}`)
       .then(() =>
         setMetas(prev =>
           prev.map(m => m.idmeta === idMeta ? { ...m, status: 1 } : m)
         )
       );
  };

  return (
    <div className="flex flex-col gap-3">
      {metas.map(meta => (
        <label key={meta.idmeta} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!meta.status}
            onChange={e => handleCheck(meta.idmeta, e.target.checked)}
          />
          {meta.nome}
        </label>
      ))}
    </div>
  );
}
