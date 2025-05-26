import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Usuário cadastrado com sucesso!");
            navigate("/login");
        } else {
            setMessage(data.message || "Erro ao cadastrar");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro</h2>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Cadastrar</button>
            {message && <p>{message}</p>}

            <p>Já tem uma conta? Faça login</p>
        </form>
    );
}
