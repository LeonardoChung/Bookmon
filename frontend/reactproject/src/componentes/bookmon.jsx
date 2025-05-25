import React from "react";
import { useNavigate } from "react-router-dom";

export default function Bookmon() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Bem-vindo ao Bookmon!</h1>
            <p>Faça login ou cadastro para continuar</p>
            <div style={{ marginTop: "30px" }}>
                <button
                    style={{ marginRight: "15px", padding: "10px 20px" }}
                    onClick={() => navigate("/cadastro")}
                >
                    Cadastrar
                </button>
                <button
                    style={{ padding: "10px 20px" }}
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
