import React from "react";
import { useNavigate } from "react-router-dom";
import quackitoThumb from "../images/quackito_thumb.gif";
import "../css/bookmon.css";

export default function Bookmon() {
    const navigate = useNavigate();

    return (
        <div className="bookmon-body">
            <div className="bookmon-left">
                <h1>Bem-vindo ao Bookmon!</h1>
                <div className="bookmon-text">Já pensou em transformar sua leitura em uma aventura divertida? No Bookmon, você adota o Quackito, um pet virtual que cresce e evolui conforme você lê! Quanto mais você mergulha nos livros, mais forte e feliz seu Quackito se torna. Leia, cuide, evolua, e torne a leitura um hábito mágico!</div>
                <div className="bookmon-buttons">
                    <button
                        onClick={() => navigate("/cadastro")}
                    >
                        Adquira seu Quackito!
                    </button>
                </div>
            
            </div>
            <div className="bookmon-right">
                <img src={quackitoThumb} alt="quackitoThumb" className="quackitoThumb" />
                
            </div>
        </div>
    );
}
