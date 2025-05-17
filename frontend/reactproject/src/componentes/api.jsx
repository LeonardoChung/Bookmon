const API_URL = 'http://localhost:3001/api/bichinho';

export const getBichinho = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const feedBichinho = async (food) => {
  const res = await fetch(`http://localhost:3001/api/bichinho/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ food })
  });
  return res.json();
};
