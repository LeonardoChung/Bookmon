import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Entrar</button>
            {message && <p>{message}</p>}
            <p>Não tem uma conta? Faça cadastro</p>
        </form>
    );
}
