import quackitoErro from "../images/quackito_erro.gif";
import { Link  } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/error.css";

export default function ErrorPage() {
    const [redirectPath, setRedirectPath] = useState("/");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setRedirectPath("/home");
        }
    }, []);

    return (
        <div className="error-body">
            <img src={quackitoErro} alt="quackito-erro" className="quackito-erro" />
            <h1>Ops! Parece que não encontramos nada por aqui</h1>

            <div className="error-text"><Link to={redirectPath}>Voltar para a página inicial</Link></div>
        </div>
    );
}
