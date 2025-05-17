import express from 'express';
const router = express.Router();

let bichinho = {
  pontos: 0,
  nivel: 1,
  pontuacao: 50
};

router.get('/', (req, res) => {
  res.json(bichinho);
});

router.post('/feed', (req, res) => {
  const { food } = req.body;

  const foods = {
    'ração': { custo: 10, pontos: 10 },
    'fruta': { custo: 15, pontos: 15 },
    'carne': { custo: 25, pontos: 25 },
    'doce': { custo: 5,  pontos: 5  }
  };

  const selected = foods[food];

  if (!selected) {
    return res.status(400).json({ error: 'Comida inválida' });
  }

  if (bichinho.pontuacao >= selected.custo) {
    bichinho.pontuacao -= selected.custo;
    bichinho.pontos += selected.pontos;

    while (bichinho.pontos >= 50) {
        bichinho.pontos -= 50;
        bichinho.nivel += 1;
    }
  }

  res.json(bichinho);
});

export default router;
