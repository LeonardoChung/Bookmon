import db from '../db.js';

// Conquista 1 50 paginas
export const getConquistaPaginas = (req, res) => {
    const q ='SELECT idconquistas, name, description FROM conquistas;';
    db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data); 
});
};

export const completeConquistaPaginas = (req, res) => {
    const iduser = req.params.id;
    const q = `SELECT IFNULL(SUM(pages), 0) AS total FROM leituras WHERE iduser = ?`;
    db.query(q, [iduser], (err, result) => {
    if (err) return res.status(500).json(err);
    const total = result[0].total;

    // and status = 0
    if (total >= 50) {
    const update = `UPDATE user_conq SET status = 1 WHERE iduser = ? AND idconquista = 1;`;
      db.query(update, [iduser], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: " Conquista alcançada!" });
      });
    }
  });
};