import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Ops! Parece que não encontramos nada por aqui</h1>

            <p>voltar para a página inicial</p>
            <button
                    style={{ padding: "10px 20px" }}
                    onClick={() => navigate("/")}
                >
                    Bookmon
                </button>
        </div>
    );
}
