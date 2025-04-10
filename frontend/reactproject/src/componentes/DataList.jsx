
import React, { useEffect, useState } from "react";
import "./../App.css";

const DataList = ({ clicked, onEdit, onAdd, onDelete, refresh }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:8800")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [refresh]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="corpo">
      <h2>Listagem de Usuários</h2>
      <button onClick={onAdd} className="add-btn">Adicionar Usuário</button>
      <ul className="list">
        {currentItems.map((item) => (
          <li key={item.idusuarios} className="list-li">
            Nome: {item.nome} <br />
            Idade: {item.idade} <br />
            CPF: {item.cpf} <br />
            <button onClick={() => clicked(item)} className="list-btn">Ver Detalhes</button>
            <button onClick={() => onEdit(item)} className="list-btn">Editar</button>
            <button onClick={() => onDelete(item.idusuarios)} className="list-btn">Excluir</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} disabled={currentPage === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataList;
