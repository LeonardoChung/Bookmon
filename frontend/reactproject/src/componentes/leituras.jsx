import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Leituras() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/leituras/getLeituras/${id}`)
      .then((response) => response.json())
      .then((dados) => setData(dados))
      .catch((erro) => console.error("Erro ao buscar leituras:", erro));
  }, [id]);

  return (
    <div>
      <h1 className="title">Leituras</h1>

      <div className="btn-adicionar">
        <button onClick={() => navigate("/adicionar")} className="btn-list">
          Adicionar Leitura
        </button>
      </div>

      <ul className="list">
        {data.map((item) => (
          <li key={item.id} className="li-list">
            Nome: {item.book}
            <br />
            Páginas: {item.pages}
            <br />
            <button
              onClick={() => navigate(`/editar/${item.id}`)}
              className="btn-list"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      {/* 
        create -> `http://localhost:3001/leituras/createLeitura/${id}`
        update -> `http://localhost:3001/leituras/${id}`
        get -> `http://localhost:3001/leituras/getLeituras/${id}`
      */}
    </div>
  );
}

export default Leituras;
