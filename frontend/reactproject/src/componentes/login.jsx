import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        if (res.ok && data.token) {
            localStorage.setItem("token", data.token);
            // Decodificar o token para pegar o id
            const decoded = jwtDecode(data.token);
            localStorage.setItem("userId", decoded.id);
            setMessage("Login bem-sucedido!");
            navigate("/home");
            // redirecionar ou atualizar estado de autenticação
        } else {
            setMessage(data.message || "Falha no login");
        }
    };

    return (
        <div className="login-body">
            <form onSubmit={handleSubmit}>
                <div className="login-title">Login</div>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit" className="login-button">Entrar</button>
                {message && <div className="message-erro">{message}</div>}
                <div className="login-text"> <Link to="/cadastro">Não tem uma conta? Faça cadastro</Link></div>
            </form>
        </div>

    );
}
