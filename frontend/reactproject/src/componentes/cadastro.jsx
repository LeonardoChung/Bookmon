import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import "../css/login.css";

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
            navigate("/home");
        } else {
            setMessage(data.message || "Erro ao cadastrar");
        }
    };

    return (
        <div className="login-body">
            <form onSubmit={handleSubmit}>
                <div className="login-title">Cadastro</div>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit" className="login-button" >Cadastrar</button>
                {message && <p>{message}</p>}

                <div className="login-text"> <Link to="/login">Já tem uma conta? Faça login</Link></div>
            </form>
        </div>
    );
}
