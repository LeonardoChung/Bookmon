import db from '../db.js';

// Conquista 50 paginas (conquista 1)
export const getConquistaPaginas = (req, res) => {
  const q = 'SELECT \`status\` FROM user_conq WHERE iduser = ? AND idconquista = 1;';
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


    if (total >= 50) {
      const update = `UPDATE user_conq SET status = 1 WHERE iduser = ? AND idconquista = 1 AND status = 0`;

      db.query(update, [iduser], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: " Conquista alcançada!" });
      });
    }
  });
};

// Nível 3 do Quackito (conquista 2)
export const getConquistaQuackito = (req, res) => {
  const q = `SELECT \`status\` FROM user_conq WHERE iduser = ? AND idconquista = 2;`;
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const completeConquistaQuackito = (req, res) => {
  const update = `UPDATE user_conq SET status = 1 WHERE iduser = ? AND idconquista = 2`;

  db.query(update, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: " Conquista alcançada!" });
  });

};

// 10 livros (conquista 3)
export const getConquistaLivros = (req, res) => {
  const q = `SELECT \`status\` FROM user_conq WHERE iduser = ? AND idconquista = 3;`;
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const completeConquistaLivros = (req, res) => {
  const iduser = req.params.id;
  const q = "SELECT COUNT(*) AS total FROM leituras WHERE iduser = ?";
  db.query(q, [iduser], (err, result) => {
    if (err) return res.status(500).json(err);
    const total = result[0].total;


    if (total >= 10) {
      const update = "UPDATE user_conq SET status = 1 WHERE iduser = ? AND idconquista = 3 AND status = 0";

      db.query(update, [iduser], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: " Conquista alcançada!" });
      });
    }
  });
};


// posts (conquista 5)
export const getConquistaPosts = (req, res) => {
  const q = `SELECT \`status\` FROM user_conq WHERE iduser = ? AND idconquista = 5;`;
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const completeConquistaPosts = (req, res) => {
  const iduser = req.params.id;
  const q = "SELECT COUNT(*) AS total FROM posts WHERE iduser = ?";
  db.query(q, [iduser], (err, result) => {
    if (err) return res.status(500).json(err);
    const total = result[0].total;

    if (total < 5) {
      return res.status(200).json({ message: "Ainda não atingiu 5 posts." });
    }

    if (total == 5) {
      const update = "UPDATE user_conq SET status = 1 WHERE iduser = ? AND idconquista = 5 AND status = 0";

      db.query(update, [iduser], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: " Conquista alcançada!" });
      });
    }
  });
};