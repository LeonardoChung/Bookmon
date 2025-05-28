import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      <h1 className="title">Leituras</h1>

      <div className="btn-adicionar">
        <button onClick={() => navigate(`/adicionar/${id}`)} className="btn-list">
          Adicionar Leitura
        </button>
      </div>

      <ul className="list">
        {data.map((item) => (
          <li key={item.idleituras} className="li-list">
            Nome: {item.book}
            <br />
            Páginas: {item.pages}
            <br />
            <button onClick={() => handleEdit(item)} className="list-btn">
              Editar
            </button>
          </li>
        ))}
      </ul>

      {isEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Leitura</h2>
            <label>Nome:</label>
            <input
              type="text"
              name="book"
              value={editedLivro.book}
              onChange={handleInputChange}
            />
            <label>Páginas:</label>
            <input
              type="text"
              name="pages"
              value={editedLivro.pages}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveEdit} className="list-btn">
              Salvar
            </button>
            <button onClick={() => setIsEditModal(false)} className="list-btn">
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Leituras;
