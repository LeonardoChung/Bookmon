import db from '../db.js';

// meta de páginas
export const getMetaPaginas = (req, res) => {
    const q = `SELECT um.\`status\` FROM user_metas um WHERE iduser = ? AND idmeta = 1;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const completeMetaPaginas = (req, res) => {
    const q = `UPDATE user_metas um
                JOIN bicho b ON um.iduser = b.iduser
                SET um.status = 1, b.points = b.points + 30
                WHERE um.iduser = ? AND um.idmeta = 1;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

// meta de post
export const getMetaPost = (req, res) => {
    const q = `SELECT um.\`status\` FROM user_metas um WHERE iduser = ? AND idmeta = 2;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const completeMetaPost = (req, res) => {
    const q = `UPDATE user_metas um
                JOIN bicho b ON um.iduser = b.iduser
                SET um.status = 1, b.points = b.points + 20
                WHERE um.iduser = ? AND um.idmeta = 2;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

// meta de carne
export const getMetaCarne = (req, res) => {
    const q = `SELECT um.\`status\` FROM user_metas um WHERE iduser = ? AND idmeta = 3;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const completeMetaCarne = (req, res) => {
    const q = `UPDATE user_metas um
                JOIN bicho b ON um.iduser = b.iduser
                SET um.status = 1, b.points = b.points + 15
                WHERE um.iduser = ? AND um.idmeta = 3;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

// meta de leitura
export const getMetaLeitura = (req, res) => {
    const q = `SELECT um.\`status\` FROM user_metas um WHERE iduser = ? AND idmeta = 5;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const completeMetaLeitura = (req, res) => {
    const q = `UPDATE user_metas um
                JOIN bicho b ON um.iduser = b.iduser
                SET um.status = 1, b.points = b.points + 25
                WHERE um.iduser = ? AND um.idmeta = 5;`;
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const listMetas = (req, res) => {
  const q = `
    SELECT m.idmetas AS idmeta,
           m.description AS nome,
           um.status
      FROM user_metas um
      JOIN metas m ON m.idmetas = um.idmeta    
     WHERE um.iduser = ?;
  `;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};
