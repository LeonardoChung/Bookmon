import quackitoErro from "../images/quackito_erro.gif";
import { Link, useNavigate  } from "react-router-dom";
import { useRef, useState } from "react";
import "../css/error.css";

export default function ErrorPage() {

    return (
        <div className="error-body">
            <img src={quackitoErro} alt="quackito-erro" className="quackito-erro" />
            <h1>Ops! Parece que não encontramos nada por aqui</h1>

            <div className="error-text"><Link to="/">Voltar para a página inicial</Link></div>
        </div>
    );
}
