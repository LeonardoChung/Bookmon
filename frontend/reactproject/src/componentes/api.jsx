export const getBichinho = async (id) => {
  const res = await fetch(`http://localhost:3001/api/bichinho/${id}`);
  return res.json();
};

export const feedBichinho = async (id, food) => {
  const foods = {
    'ração': { custo: 10, pontosGanhos: 10 },
    'fruta': { custo: 15, pontosGanhos: 15 },
    'carne': { custo: 25, pontosGanhos: 25 },
    'doce':  { custo: 5,  pontosGanhos: 5  }
  };

  const res = await fetch(`http://localhost:3001/api/bichinho/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(foods[food])
  });

  if (!res.ok) throw new Error('Erro ao alimentar');
  return res.json();
};
