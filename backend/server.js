import express from 'express';
import cors from 'cors';
import bichinhoRoutes from './routes/bichinho.js';
import userRoutes from './routes/users.js';
import feedRoutes from './routes/feed.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/api/bichinho', bichinhoRoutes);
app.use('/feed', feedRoutes);
app.use('/user', userRoutes);


app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});