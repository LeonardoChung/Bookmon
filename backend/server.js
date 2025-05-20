import express from 'express';
import cors from 'cors';
import bichinhoRoutes from './routes/bichinho.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bichinho', bichinhoRoutes);
app.use('/user', userRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});