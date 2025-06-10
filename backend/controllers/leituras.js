import db from '../db.js';

export const getLeituras = (req, res) => {
  const q = "SELECT idleituras, book, pages FROM leituras WHERE iduser = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const createLeitura = (req, res) => {
    const { book, pages } = req.body;
    const iduser = req.params.id;

    const q = "INSERT INTO leituras (iduser, book, pages) VALUES (?, ?, ?)";
    db.query(q, [iduser, book, pages], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Leitura adicionada com sucesso!" });
    });
};

export const updateLeitura = (req, res) => {
    const { book, pages } = req.body;
    const id = req.params.id;

    const q = "UPDATE leituras SET book = ?, pages = ? WHERE idleituras = ?";
    db.query(q, [book, pages, id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Leitura atualizada com sucesso!" });
    });
};


