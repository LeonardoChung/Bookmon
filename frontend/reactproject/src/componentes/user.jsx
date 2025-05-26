import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/user.css";
import exampleUser from "../images/example-user.png";

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
            <div className="user-body">
                <div className="left">
                    <img src={exampleUser} alt="User" className="exampleUser-perfil-img" />
                    <div className="user-infos">
                        <div className="infos">User: <div className="inf">{userInfo.username}</div></div> 
                        <div className="infos">Páginas lidas: <div className="inf">{userInfo.pages_read}</div></div>
                        <div className="infos">Metas cumpridas: <div className="inf">{userInfo.metas_completed}</div></div>
                        <div className="infos">Nível: <div className="inf">{userInfo.level}</div></div>
                    </div>
                    
                </div>

                <div className="medium">
                    <div className="title">Posts:</div>
                    <ul className="posts">
                        {posts.map(post => (
                            <li className="li-posts" key={post.idposts}>{post.content}</li>
                        ))}
                    </ul>
                </div>

                <div className="right">
                    <div className="title">Conquistas:</div>
                    <ul>
                        {conquistas.map(conq => (
                            <li  cclkey={conq.idconquistas}>{conq.name} {conq.description}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
    
}

export default User;