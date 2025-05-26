import db from '../db.js';

// MUDAR
export const getLeituras = (req, res) => {
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

export const createLeitura = (req, res) => {
    const q = `SELECT u.username `;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json(data);
    });
}

export const updateLeitura = (req, res) => {
    const q = `SELECT u.username WHERE id = ?`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json(data);
    });
}