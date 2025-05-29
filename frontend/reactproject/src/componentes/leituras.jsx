import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/leitura.css";

function Leituras() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditModal, setIsEditModal] = useState(false);
  const [editedLivro, setEditedLivro] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/leituras/getLeituras/${id}`)
      .then((response) => response.json())
      .then((dados) => {setData(dados);})
      .catch((erro) => console.error("Erro ao buscar leituras:", erro));
  }, [id]);

  function handleEdit(item) {
    setEditedLivro({...item});
    setIsEditModal(true);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditedLivro((prev) => ({ ...prev, [name]: value }));
  }

  function handleSaveEdit() {
    console.log(editedLivro);
    console.log("EDITANDO:", {
  id: editedLivro.idleituras,
  book: editedLivro.book,
  pages: editedLivro.pages
});
    fetch(`http://localhost:3001/leituras/${editedLivro.idleituras}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      book: editedLivro.book,
      pages: editedLivro.pages
    }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`Leitura ${editedLivro.book} atualizada.`);
        alert(`Leitura ${editedLivro.idleituras} atualizada.`);
        setIsEditModal(false);
        setData((prevData) =>
          prevData.map((livro) =>
            livro.idleituras === editedLivro.idleituras ? editedLivro : livro
          )
        );
      })
      .catch((error) => console.error("Erro ao atualizar:", error));
  }

  return (
    <div className="body-leitura">
      <div className="top-leitura">
        <div className="leitura-title">Leituras</div>
        <div className="btn-adicionar">
        <button onClick={() => navigate(`/adicionar/${id}`)} className="button-adicionar">
          +
        </button>
        </div>
      </div>

      <ul className="leitura-list">
        {data.map((item) => (
          <li key={item.idleituras} className="li-list">
            <div className="info-list">
                <div className="list-text">Nome:</div> {item.book}
            </div>
            <div className="info-list">
                <div className="list-text">Páginas:</div> {item.pages}
            </div>
            <button onClick={() => handleEdit(item)} className="list-btn">
              Editar
            </button>
          </li>
        ))}
      </ul>

      {isEditModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-card">
              <div className="card-title">Editar Leitura</div>
              <input
                type="text"
                name="book"
                value={editedLivro.book}
                onChange={handleInputChange}
                placeholder="Nome do livro"
              />
              <input
                type="text"
                name="pages"
                value={editedLivro.pages}
                onChange={handleInputChange}
                placeholder="Número de páginas"
              />
              <div className="card-bottom">
                <button onClick={handleSaveEdit} className="card-btn">
                  Salvar
                </button>
                <button onClick={() => setIsEditModal(false)} className="card-btn">
                  Cancelar
                </button>                
              </div>
            </div>  
          </div>
        </div>
      )}
    </div>
  );
}

export default Leituras;
