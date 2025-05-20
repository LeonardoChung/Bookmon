import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./header.jsx";

function User(){
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [conquistas, setConquistas] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // pegar informações relacionadas usuário para o perfil
        const fetchUserInfo = async () => {
            try {
                const res = await fetch(`http://localhost:3001/user/${id}`, {method: "GET"});
                const data = await res.json();
                setUserInfo(data[0]);
            } catch (err) {
                setError("Erro ao buscar dados do usuário");
            }
        };

        // recuperar posts do usuário
        const fetchPosts = async () => {
            try {
                const res = await fetch(`http://localhost:3001/user/posts/${id}`);
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError("Erro ao buscar posts do usuário");
            }
        };

        // recuperar conquistas do usuário
        const fetchConquistas = async () => {
            try {
                const res = await fetch(`http://localhost:3001/user/conquistas/${id}`);
                const data = await res.json();
                setConquistas(data);
            } catch (err) {
                setError("Erro ao buscar conquistas do usuário");
            }
        };

        fetchUserInfo();
        fetchPosts();
        fetchConquistas();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!userInfo) return <p>Carregando...</p>;

    return(
        <div>
            <Header/>

            <div>
                <p>username: {userInfo.username}</p>
                <p>páginas lidas: {userInfo.pages_read}</p>
                <p>metas cumpridas: {userInfo.metas_completed}</p>
                <p>nível: {userInfo.level}</p>

                <p>posts:</p>
                <ul>
                    {posts.map(post => (
                        <li key={post.idposts}>{post.content}</li>
                    ))}
                </ul>

                <p>conquistas: </p>
                <ul>
                    {conquistas.map(conq => (
                        <li key={conq.idconquistas}>{conq.name} {conq.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
    
}

export default User;