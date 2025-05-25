import db from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcryptjs';
import { jwtSecret, jwtExpiresIn } from '../config.js';

// cadastro de um usuário
export function register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'É preciso username e password' });
    }

    db.query(
        'SELECT idusers FROM users WHERE username = ?',
        [username],
        (err, rows) => {
            if (err) return res.status(500).json({ message: 'Erro no servidor' });
            if (rows.length > 0) {
                return res.status(409).json({ message: 'Username já cadastrado' });
            }

            db.query(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, password],
                (insertErr, result) => {
                    if (insertErr) return res.status(500).json({ message: 'Erro no servidor' });
                    res.status(201).json({
                        message: 'Usuário criado com sucesso',
                        userId: result.insertId
                    });
                }
            );
        }
    );
}

// login
export function login(req, res) {
    const { username, password } = req.body;

    db.query(
        'SELECT idusers, username, password FROM users WHERE username = ?',
        [username],
        (err, rows) => {
            if (err) return res.status(500).json({ message: 'Erro no servidor' });
            if (rows.length === 0) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            const user = rows[0];

            if (password !== user.password) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            const payload = { id: user.idusers, username: user.username };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
            res.json({ token });
        }
    );
}