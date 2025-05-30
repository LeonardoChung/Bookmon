import db from '../db.js';

export const getMetaLeitura = (req, res) => {
    const q = `SELECT um.\`status\` FROM user_metas um WHERE iduser = ? AND idmeta = 5;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const completeMetaLeitura = (req, res) => {
    const q = `UPDATE user_metas SET \`status\` = 1 WHERE iduser = ? and idmeta = 5;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};