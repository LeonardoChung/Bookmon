import db from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcryptjs';
import { jwtSecret, jwtExpiresIn } from '../config.js';


// para a página de perfil do user
export const getuserInfo = (req, res) => {
    const q = `SELECT u.username,
       (SELECT IFNULL(SUM(pages), 0) FROM leituras WHERE iduser = u.idusers) AS pages_read,
       (SELECT COUNT(*) FROM user_metas WHERE iduser = u.idusers AND \`status\` = 1) AS metas_completed,
       (SELECT \`level\` FROM bicho WHERE iduser = u.idusers LIMIT 1) AS \`level\`
		FROM users u
        WHERE u.idusers = ?
        LIMIT 1`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json(data);
    });
}

// métodos para postagem do user
export const createPost = (req, res) => {
    const q = "INSERT INTO posts (iduser, datetime, content) VALUES (?, ?, ?)";
    
    const now = new Date();
    const datetime = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');

    db.query(q, [req.params.id, datetime, req.body.content], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json({ message: "Post realizado com sucesso" });
    });
}

export const getUserPosts = (req, res) => {
    const q = "SELECT * FROM posts WHERE iduser = ? ORDER BY idposts DESC"; // sort by datetime??
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
}

// conquistas
export const getConquistas = (req, res) => {
    const q = `SELECT conq.idconquistas, conq.\`name\`, conq.\`description\`
	FROM conquistas conq 
    JOIN users u 
    JOIN user_conq ON (user_conq.iduser = u.idusers AND user_conq.idconquista = conq.idconquistas)
    WHERE u.idusers = ? AND user_conq.\`status\` = 1`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
    
}
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
   
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
      res.json({ token });
    }
  );
}