import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/leitura.css";

function Leituras() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [isEditModal, setIsEditModal] = useState(false);
  const [editedLivro, setEditedLivro] = useState({});
  const [paginaAnterior, setPaginaAnterior] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/leituras/getLeituras/${id}`)
      .then((response) => response.json())
      .then((dados) => { setData(dados); })
      .catch((erro) => console.error("Erro ao buscar leituras:", erro));

  }, [id]);

  function handleEdit(item) {
    setEditedLivro({ ...item });
    setPaginaAnterior(Number(item.pages));
    setIsEditModal(true);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditedLivro((prev) => ({ ...prev, [name]: value }));
  }

  function handleSaveEdit() {
    const novasPaginas = Number(editedLivro.pages);
    const diferenca = novasPaginas - paginaAnterior;

    console.log(editedLivro);
    console.log("EDITANDO:", {
      id: editedLivro.idleituras,
      book: editedLivro.book,
      pages: editedLivro.pages,
      diferenca: diferenca
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

        if (diferenca >= 10) {
          fetch(`http://localhost:3001/metas/getPaginas/${id}`)
            .then((res) => res.json())
            .then((metaData) => {
              if (metaData.length > 0 && metaData[0].status === 0) {
                fetch(`http://localhost:3001/metas/completePaginas/${id}`, {
                  method: "PUT",
                })
                  .then(() => {
                    alert("Meta de leitura concluída! +25 pontos 🎉");
                  })
                  .catch((err) =>
                    console.error("Erro ao completar meta de leitura:", err)
                  );
              }
            });
        }

        fetch(`http://localhost:3001/conquistas/getPaginas/${id}`)
          .then((res) => res.json())
          .then((metaData) => {
            if (metaData.length > 0 && metaData[0].status === 0) {
              // Verifica e ativa conquista de 50 páginas
              fetch(`http://localhost:3001/conquistas/completePaginas/${id}`, { method: "PUT", })
                .then((res) => res.json())
                .then((result) => {
                  if (result.message.includes("Conquista")) {
                    alert(result.message);
                  }
                })
                .catch((err) => console.error("Erro ao verificar conquista:", err));
            }
          })
          .catch((error) => console.error("Erro ao atualizar:", error));
      });

      
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
