import db from '../db.js';


// para a página de perfil do user
export const getuserInfo = (req, res) => {
    const q = `SELECT u.username,
      (SELECT IFNULL(SUM(pages), 0) FROM leituras WHERE iduser = u.idusers) AS pages_read,
      (SELECT COUNT(*) FROM user_metas WHERE iduser = u.idusers AND \`status\` = 1) AS metas_completed,
      (SELECT COUNT(*) FROM user_conq WHERE iduser = u.idusers AND \`status\` = 1) AS conquistas_completed,
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