import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/feed.css";


function Feed() {
    const { id } = useParams();

    const [newPost, setNewPost] = useState({ content: "" });
    const [addError, setAddError] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);

    function handleNewPostChange(e) {
        const { name, value } = e.target;
        setNewPost((prev) => ({ ...prev, [name]: value }));
    }

    function handleSaveNewPost() {
        const { content } = newPost;
        if (!content) {
            setAddError(true);
            return;
        }
        setAddError(false);

        fetch(`http://localhost:3001/user/createPost/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
        })
            .then(response => response.json())
            .then(() => {
                console.log("Novo post adicionado.");

                // Verifica status da meta de leitura
                fetch(`http://localhost:3001/metas/getPost/${id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.length > 0 && data[0].status === 0) {
                            // Se meta ainda não concluída, atualiza
                            fetch(`http://localhost:3001/metas/completePost/${id}`, {
                                method: "PUT",
                            })
                                .then(() => {
                                    alert("Meta de post concluída! +25 pontos 🎉");
                                })
                                .catch((err) => {
                                    console.error("Erro ao completar meta de post:", err);
                                });
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao verificar meta de leitura:", err);
                    });

                fetch(`http://localhost:3001/conquistas/getPosts/${id}`)
                    .then(res => res.json())
                    .then((conqData) => {
                        if (conqData.length > 0 && Number(conqData[0].status) === 0) {
                            // Se a conquista ainda não foi completada, atualiza
                            fetch(`http://localhost:3001/conquistas/posts/${id}`, {
                                method: "PUT",
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data.message?.includes("Conquista")) {
                                        alert("🏆 Conquista de 5 posts desbloqueada!");
                                    } else {
                                        console.log("Conquista não atualizada:", data.message);
                                    }
                                })
                                .catch((err) => console.error("Erro ao completar conquista de posts:", err));
                        }
                    })
                    .catch((err) => console.error("Erro ao verificar conquista de posts:", err));

                setAddSuccess(true);
                setNewPost({ content: "" });
                setTimeout(() => {
                    setAddSuccess(false);
                    window.location.reload();
                }, 2500);
            })
            .catch(error => console.error("Erro ao adicionar novo post:", error));
    }

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // recuperar todos posts
        const fetchPosts = async () => {
            try {
                const res = await fetch(`http://localhost:3001/feed`);
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError("Erro ao buscar feed");
            }
        };

        fetchPosts();
    });

    if (error) return <p>{error}</p>;
    if (!posts) return <p>Carregando...</p>;


    return (
        <div>
            <div className="body-feed">
                <div className="feed-left">
                    <input
                        type="text"
                        name="content"
                        placeholder="Compartilhe suas leituras..."
                        value={newPost.content}
                        onChange={handleNewPostChange}
                    />
                    <button className="feed-button" onClick={handleSaveNewPost}>Publicar</button>
                </div>

                <div className="feed-right">

                    <div className="feed-title">Feed:</div>
                    <ul>
                        {posts.map(post => (
                            <li key={post.idposts}>{post.username}: {post.content}</li>
                        ))}
                    </ul>

                </div>
            </div>

        </div>
    )



}

export default Feed;