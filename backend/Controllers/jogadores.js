import { db } from "../db.js";

function validarJogador(data) {
  const { nome, idade, posicao, time, nacionalidade } = data;
  return nome && idade && posicao && time && nacionalidade;
}

export const getJogadores = (_, res) => {
  const q = "SELECT * FROM jogadores";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const insertJogador = (req, res) => {
  if (!validarJogador(req.body)) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const q = "INSERT INTO jogadores (nome, idade, posicao, time, nacionalidade) VALUES (?, ?, ?, ?, ?)";
  const values = [req.body.nome, req.body.idade, req.body.posicao, req.body.time, req.body.nacionalidade];

  db.query(q, values, (err, _) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Jogador adicionado" });
  });
};

export const updateJogador = (req, res) => {
  if (!validarJogador(req.body)) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const q = "UPDATE jogadores SET nome = ?, idade = ?, posicao = ?, time = ?, nacionalidade = ? WHERE idjogadores = ?";
  const values = [req.body.nome, req.body.idade, req.body.posicao, req.body.time, req.body.nacionalidade, req.params.id];

  db.query(q, values, (err, _) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Jogador atualizado" });
  });
};

export const deleteJogador = (req, res) => {
  const q = "DELETE FROM jogadores WHERE idjogadores = ?";
  db.query(q, [req.params.id], (err, _) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Jogador deletado" });
  });
};
